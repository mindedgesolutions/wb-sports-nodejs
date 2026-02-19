import {
  AuthDTO,
  CheckDeptDTO,
  CheckPasswordDTO,
  RegisterDTO,
} from '@/auth/interfaces/auth.interface';
import { Department } from '@/generated/prisma/enums';
import {
  BadRequestException,
  NotFoundException,
} from '@/globals/core/error.core';
import {
  comparePassword,
  hashPassword,
} from '@/globals/helpers/password.helper';
import { prisma } from '@/prisma';

class AuthService {
  private async checkEmail(username: string): Promise<boolean> {
    const checkEmail = await prisma.users.findFirst({
      where: { email: username },
    });

    return !!checkEmail;
  }

  // -----------------------------

  private async checkPassword({ username, password }: CheckPasswordDTO) {
    const user = await prisma.users.findFirst({
      where: { email: username },
    });

    const isPasswordValid = await comparePassword(password, user!.password);

    return isPasswordValid;
  }

  // -----------------------------

  private async checkDept({ username, department }: CheckDeptDTO) {
    const checkDept = await prisma.users.findFirst({
      where: { email: username, department: department as Department },
    });

    return !!checkDept;
  }

  // -----------------------------

  public async register(requestBody: RegisterDTO) {
    const { name, email, mobile, password, department } = requestBody;

    const checkEmail = await this.checkEmail(email);

    if (checkEmail) throw new BadRequestException('Email already exists');

    const hashed = await hashPassword(password);

    const newUser = await prisma.users.create({
      data: {
        name: name.trim(),
        email: email.trim(),
        mobile: mobile?.trim(),
        password: hashed,
        department: department as Department,
      },
    });

    // create session (purpose: refresh token will keep refreshing the access token until session is valid. once invalid, refresh token will no longer work and user will logout)

    // sign access token & refresh token

    // return new user & tokens

    return newUser;
  }

  // -----------------------------

  public async login(requestBody: AuthDTO): Promise<any> {
    const { username, password, department } = requestBody;

    const checkEmail = await this.checkEmail(username);

    if (!checkEmail) throw new NotFoundException('Email not found');

    const isPasswordValid = await this.checkPassword({ username, password });

    if (!isPasswordValid) throw new BadRequestException('Invalid password');

    const isDeptValid = await this.checkDept({ username, department });

    if (!isDeptValid)
      throw new BadRequestException('Department does not match');
  }

  // -----------------------------

  public async refreshToken() {}
}

export const authService: AuthService = new AuthService();

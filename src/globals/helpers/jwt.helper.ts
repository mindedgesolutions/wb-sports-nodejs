import jsonwebtoken from 'jsonwebtoken';

type User = {
  id: string;
  name: string;
  email: string;
  role: string;
};

export function generateJwt(user: User): string {
  const tokenData = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
  };
  const accessToken = jsonwebtoken.sign(tokenData, process.env.JWT_SECRET!, {
    expiresIn: '1d',
    algorithm: 'HS256',
  });

  return accessToken;
}

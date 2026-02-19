export interface AuthDTO {
  username: string;
  password: string;
  department: string;
}

export interface CheckPasswordDTO {
  username: string;
  password: string;
}

export interface CheckDeptDTO {
  username: string;
  department: string;
}

export interface RegisterDTO {
  name: string;
  email: string;
  mobile: string;
  password: string;
  department: string;
}

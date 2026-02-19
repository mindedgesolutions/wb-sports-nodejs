interface UserPayload {
  id: string;
  name: string;
  email: string;
  department: string;
  profileImg?: string;
}

declare namespace Express {
  export interface Request {
    currentUser: UserPayload;
  }
  export interface Response {
    currentUser: UserPayload;
  }
}

interface IUser {
  id: number;
  name: string;
  email: string;
  password: string;
  department: string;
  profileImg?: string;
}

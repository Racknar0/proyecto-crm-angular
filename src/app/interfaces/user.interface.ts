export interface User {
  id: string;
  firstName: string;
  email: string;
  lastName: string;
  password: string;
  role: string;
  token?: string;
}

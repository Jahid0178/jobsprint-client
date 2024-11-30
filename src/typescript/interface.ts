import { JwtPayload } from "jwt-decode";

export interface IJwtPayload extends JwtPayload {
  role: string;
}

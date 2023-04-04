import User from "./User";

export interface RootState {
  [x: string]: any;
  user: User;
}

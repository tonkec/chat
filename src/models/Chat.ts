import Message from "./Message";
import User from "./User";

export default interface Chat {
  [x: string]: any;
  id: number;
  users: User[];
  messages: Message[];
}

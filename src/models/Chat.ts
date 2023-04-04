import Message from "./Message";
import User from "./User";

export default interface Chat {
    users: User[]
    messages: Message[]
}
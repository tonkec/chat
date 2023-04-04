export default interface Message {
  chatId?: number;
  fromUserId?: number;
  type?: string;
  message?: string;
  seen?: boolean;
}

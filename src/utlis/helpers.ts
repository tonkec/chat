import User from "../models/User";

export const userStatus = (user: User) => {
  return user.status === "online" ? "online" : "offline";
};

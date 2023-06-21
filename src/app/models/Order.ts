import {User} from "./User";

export interface Order {
  id: number;
  userID: User;
  orderAddress: string;
  details: string;
  status: string;
}

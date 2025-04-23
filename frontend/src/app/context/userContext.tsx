import { createContext } from "react";

export interface UserInterface {
  name: string;
}
type ContextType = {
  user: UserInterface | null;
  setUser: (user: UserInterface | null) => void;
};
export const UserContext = createContext<ContextType>({
  user: null,
  setUser: () => {},
});

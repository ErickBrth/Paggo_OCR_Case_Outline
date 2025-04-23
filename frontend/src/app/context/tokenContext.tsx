import { createContext } from "react";

export interface TokenInterface {
  token: string;
}
type ContextType = {
  token: TokenInterface | null;
  setToken: (token: TokenInterface | null) => void;
};
export const TokenContext = createContext<ContextType>({
  token: null,
  setToken: () => {},
});

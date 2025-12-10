import { createContext, useContext } from "react";

export const ThemeContext1 = createContext();

export function useTheme() {
  return useContext(ThemeContext1);
}

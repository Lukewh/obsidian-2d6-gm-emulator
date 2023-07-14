import { YES_NO, roll } from "./common";

export const yesNo = (_modifier: number): YES_NO => {
  let rolled = roll(_modifier);

  if (rolled < 10) {
    return YES_NO.DEFINITELY_NOT;
  }
  if (rolled >= 10 && rolled < 50) {
    return YES_NO.NO;
  }
  if (rolled >= 50 && rolled < 90) {
    return YES_NO.YES;
  }

  return YES_NO.DEFINITELY_YES;
};

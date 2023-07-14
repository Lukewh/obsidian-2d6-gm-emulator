export enum LIKELIHOOD {
  IMPOSSIBLE = "1. Impossible",
  VERY_UNLIKELY = "2. Very unlikely",
  UNLIKELY = "3. Unlikely",
  FIFTY_FIFTY = "4. Fifty/Fifty",
  LIKELY = "5. Likely",
  VERY_LIKELY = "6. Very likely",
  A_SURE_THING = "7. A sure thing",
}

export enum YES_NO {
  DEFINITELY_NOT = "Definitely not",
  NO = "No",
  YES = "Yes",
  DEFINITELY_YES = "Definitely yes",
}

export enum ENCOUNTER {
  NONE = "None - Nothing happens",
  REQUEST = "Request - You are requested to do something. A side quest or deliver an item or information",
  INCONSEQUENTIAL = "Inconsequential - Something happens that doesn't effect your goal",
  INFORMATIVE = "Informative - You learn a piece of information that helps you achieve your goal",
  DISRUPTIVE = "Disruptive - Something happens that delays or disrupts you in some way",
  DECEPTIVE = "Deceptive - You are deceived through false information, or to temporarily travel a different path",
  DEFENSIVE = "Defensive - You happen upon a defensive situation. Perhaps someone is being guarded towards you, or the enemy has erected a blockade",
  AGGRESSIVE = "Aggressive - Someone doesn't like the cut of your jib, or an altercation starts",
}

export type ReturnString = YES_NO | ENCOUNTER;

export const roll = (mod = 0): number => {
  const modifier = typeof mod === "number" ? mod : 0;
  let rolled = Math.floor(Math.random() * 100);
  rolled += modifier;
  if (rolled < 0) {
    rolled = 0;
  }
  if (rolled > 99) {
    rolled = 99;
  }
  return rolled;
};

export const question = (
  likelihood = LIKELIHOOD.FIFTY_FIFTY,
  fn: (mod: number) => ReturnString
): ReturnString => {
  switch (likelihood) {
    case LIKELIHOOD.IMPOSSIBLE:
      return fn(-40);
    case LIKELIHOOD.VERY_UNLIKELY:
      return fn(-20);
    case LIKELIHOOD.UNLIKELY:
      return fn(-10);
    case LIKELIHOOD.LIKELY:
      return fn(10);
    case LIKELIHOOD.VERY_LIKELY:
      return fn(20);
    case LIKELIHOOD.A_SURE_THING:
      return fn(40);
    default:
      return fn(0);
  }
};

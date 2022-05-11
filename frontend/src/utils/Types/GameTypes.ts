export type Time = "30" | "60" | "90" | "120";

export type Language = "random" | "javascript" | "java";

export type PlayerAmount = "2" | "3" | "4" | "5";

export type SoloSettings = {
  language: Language;
  time: Time;
};

export type MultiplayerSettings = {
  language: Language;
  time: Time;
  playerAmount: PlayerAmount;
};

export type Match = {
  players: Player[];
};

export type Player = {
  playerName: string;
  playerAvatar: string;
  playerStats: PlayerStats;
};

export type PlayerStats = {
  CPM: number;
  Accuracy: number;
  Errors: number;
};

import {ICodeBlock} from "../models/CodeBlock";

export type UserProfile = {
  username: string;
  profilePicture: string;
  avgStats: ProfileStats;
  matchHistory: MatchHistoryItem[];
}

export type ProfileStats = {
  avgCPM: number,
  avgAccuracy: number,
  avgErrors: number,
  victories: number,
}

export type MatchHistoryItem = {
  users: MatchHistoryUser[],
  codeBlock: ICodeBlock,
  date: string,
}

export type MatchHistoryUser = {
  userId: string,
  username: string;
  profilePicture: string;
  stats: MatchHistoryUserStats;
}

export type MatchHistoryUserStats = {
  avgCPM: number,
  avgAccuracy: number,
  avgErrors: number,
}
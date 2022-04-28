import React from "react";

export type TimeLimit = "30" | "60" | "90" | "120"

export type Language = "Random" | "Javascript"

export type PlayerAmount = "2" | "3" | "4" | "5"

export type SoloSettings = {
    language: Language,
    timeLimit: TimeLimit
}

export type MultiplayerSettings = {
    language: Language,
    timeLimit: TimeLimit,
    playerAmount: PlayerAmount
}

export type Player = {
    playerName: string;
    playerAvatar: string;
    playerStats?: PlayerStats;
}

export type PlayerStats = {
    CPM: number;
    Accuracy: number;
    Errors: number;
}
import React from "react";

export type TimeLimit = "30" | "60" | "90" | "120"

export type Language = "Random" | "Javascript"

export type SoloSettings = {
    language: Language,
    timeLimit: TimeLimit
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
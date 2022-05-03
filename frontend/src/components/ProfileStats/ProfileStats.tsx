import React from "react";
import styles from "./ProfileStats.module.css";
import ScoreDisplayItem from "../ScoreDisplay";

type Props = {
  averageCPM: number;
  averageAccuracy: number;
  averageErrors: number;
  victories: number;
};

function ProfileStats({
  averageCPM,
  averageAccuracy,
  averageErrors,
  victories,
}: Props) {
  return (
    <div className={styles.MainContainer}>
      <ScoreDisplayItem
        score={averageCPM}
        label="Average"
        nextLineLabel="CPM"
      />
      <ScoreDisplayItem
        score={averageAccuracy}
        label="Average"
        nextLineLabel="Accuracy"
      />
      <ScoreDisplayItem
        score={averageErrors}
        label="Average"
        nextLineLabel="Errors"
      />
      <ScoreDisplayItem score={victories} label="Victories" />
    </div>
  );
}

export default ProfileStats;

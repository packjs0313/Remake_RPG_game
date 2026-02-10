import { useState } from "react";
import { player as initialPlayer, playerStats as initialPlayerStats } from "../data/mockData";

export default function usePlayerState() {
  const [playerState, setPlayerState] = useState({
    ...initialPlayer,
    ...initialPlayerStats,
  });

  const increaseStat = (key) => {
    setPlayerState((prev) => {
      if (prev.statPoints <= 0) return prev;

      const next = { ...prev, statPoints: prev.statPoints - 1 };
      if (key === "hp") {
        next.maxHp = prev.maxHp + 1;
        next.hp = Math.min(prev.hp + 1, next.maxHp);
      } else if (key === "mp") {
        next.maxMp = prev.maxMp + 1;
        next.mp = Math.min(prev.mp + 1, next.maxMp);
      } else if (key === "atk") {
        next.atk = prev.atk + 1;
      } else if (key === "skillStat") {
        next.skillStat = prev.skillStat + 1;
      }
      return next;
    });
  };

  return { playerState, increaseStat, setPlayerState };
}

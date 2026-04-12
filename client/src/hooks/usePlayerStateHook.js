import { useState } from "react";
import {
  player as initialPlayer, // initialPlayer : 플레이어 기본 정보
  playerStats as initialPlayerStats, // initialPlayerStats : 플레이어 전투 스탯
} from "../data/mockData";
import { applyHpChange } from "../utils/attack_and_heal"; // applyHpChange : hp 변화 적용 공용 함수

export default function usePlayerState() {
  const [playerState, setPlayerState] = useState({
    ...initialPlayer, // initialPlayer : 이름, 레벨, 골드, 이미지 같은 기본값
    ...initialPlayerStats, // initialPlayerStats : hp, mp, atk 같은 전투 스탯
  }); // playerState : 기본 정보 + 전투 스탯 합친 현재 플레이어 상태

  const increaseStat = (key) => {
    setPlayerState((prev) => {
      if (prev.statPoints <= 0) return prev;

      const next = { ...prev, statPoints: prev.statPoints - 1 }; // next : 포인트 1 차감한 다음 상태

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
  }; // key : 어떤 스탯 올릴지 구분하는 값

  const takePlayerDamage = (damage) => {
    applyHpChange(setPlayerState, damage);
  }; // damage : 플레이어 hp에서 깎을 값

  return {
    playerState, // playerState : 현재 플레이어 상태
    increaseStat, // increaseStat : 스탯 증가 함수
    setPlayerState, // setPlayerState : 상태 직접 수정용 setter
    takePlayerDamage, // takePlayerDamage : 플레이어 체력 깎는 함수
  };
}

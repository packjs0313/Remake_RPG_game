import { useState } from "react";
import { enemy as initialEnemy } from "../data/mockData"; // initialEnemy : 적 초기 데이터
import { applyHpChange } from "../utils/attack_and_heal"; // applyHpChange : hp 변화 적용 공용 함수

export default function useEnemyState() {
  const [enemyState, setEnemyState] = useState({
    ...initialEnemy,
  }); // enemyState : 현재 적 상태

  const takeEnemyDamage = (damage) => {
    applyHpChange(setEnemyState, damage);
  }; // damage : 적 hp에서 깎을 값

  return {
    enemyState, // enemyState : 현재 적 데이터
    setEnemyState, // setEnemyState : 적 상태 직접 수정용 setter
    takeEnemyDamage, // takeEnemyDamage : 적 체력 깎는 함수
  };
}

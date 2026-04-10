// getNextHpState : hp 변화 적용한 다음 상태 반환
export function getNextHpState(
  targetState, // targetState : 플레이어나 적 현재 상태
  hpChange, // hpChange : 양수면 공격, 음수면 회복
) {
  return {
    ...targetState,
    hp: Math.max(0, Math.min(targetState.maxHp, targetState.hp - hpChange)),
  };
}

// applyHpChange : React state setter에 바로 hp 변화 적용
export function applyHpChange(
  setTargetState, // setTargetState : setPlayerState 또는 setEnemyState
  hpChange, // hpChange : 양수면 공격, 음수면 회복
) {
  setTargetState((prev) => getNextHpState(prev, hpChange));
}

// createDamageLog : 공격 로그 문자열 생성
export function createDamageLog(
  attackerName, // attackerName : 공격한 대상 이름
  targetName, // targetName : 맞은 대상 이름
  damage, // damage : 적용된 데미지
) {
  return `${attackerName}이(가) ${targetName}에게 ${damage} 데미지를 줬다.`;
}

// prependCombatLog : 최신 로그를 맨 앞에 추가
export function prependCombatLog(
  prevLogs, // prevLogs : 이전 로그 배열
  nextLog, // nextLog : 새로 추가할 로그 문자열
) {
  return [nextLog, ...prevLogs];
}

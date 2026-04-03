// 배포 경로 맞추려고 vite가 주는 base 경로 씀
const BASE = import.meta.env.BASE_URL;

// 플레이어 기본 정보
export const player = {
  id: 1,
  name: "닉네임",
  level: 1,
  xp: 40,
  maxXp: 100,
  gold: 1020,
  img: `${BASE}player.png`,
};

// 플레이어 전투 스탯
export const playerStats = {
  hp: 100,
  maxHp: 100,
  mp: 100,
  maxMp: 100,
  atk: 10,
  skillStat: 5,
  statPoints: 3,
};

// 지금 화면에 띄우는 적 샘플 데이터
export const enemy = {
  name: "슬라임",
  Ename: "slime",
  level: 1,
  hp: 30,
  maxHp: 30,
  img: `${BASE}enemy.png`,
};

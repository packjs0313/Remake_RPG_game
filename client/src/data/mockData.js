const BASE = import.meta.env.BASE_URL;

export const player = {
  id: 1,
  name: "닉네임",
  level: 1,
  xp : 40,
  maxXp : 100,
  gold : 1020,
  img: `${BASE}player.png`,
};
export const playerStats = {
  hp: 100,
  maxHp: 100,
  mp: 100,
  maxMp: 100,
  atk: 10,
  skillStat: 5,
  statPoints: 3,
};


export const enemy = {
  name: "슬라임",
  Ename: "slime",
  level: 1,
  hp: 30,
  maxHp: 30,
  img: `${BASE}enemy.png`,
};

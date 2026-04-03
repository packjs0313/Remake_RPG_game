// 스킬 원본 데이터
// 여기 있는 걸 스킬창에서 그대로 씀
//
// id: 내부 식별용
// name: 화면에 보여줄 이름
// mp: 소모 mp
// desc: 설명
// price: 가격
// formulaCalc: 스킬스탯 받아서 값 계산
// formulaText: 계산식 설명용 문자열
export const skills = [
  {
    id: "fireball",
    name: "파이어볼",
    mp: 10,
    desc: "작은 불덩이를 소환하는 기본 마법.",
    price: 100,
    formulaCalc: (stats) => stats.skillStat * 10 + 30,
    formulaText: "스킬스탯 * 10 + 30",
  },
  {
    id: "iceshot",
    name: "아이스샷",
    mp: 20,
    desc: "작은 고드름을 소환하는 기본 마법.",
    price: 300,
    formulaCalc: (stats) => stats.skillStat * 8 + 25,
    formulaText: "스킬스탯 * 8 + 25",
  },
  {
    id: "heal",
    name: "힐",
    mp: 50,
    desc: "체력을 회복한다.",
    price: 300,
    formulaCalc: (stats) => stats.skillStat * 6 + 40,
    formulaText: "스킬스탯 * 6 + 40",
  },
  {
    id: "explosion",
    name: "익스플로전",
    mp: 50,
    desc: "강한 폭발 마법으로 큰 데미지를 준다.",
    price: 300,
    formulaCalc: (stats) => stats.skillStat * 14 + 60,
    formulaText: "스킬스탯 * 14 + 60",
  },
  {
    id: "thunder",
    name: "썬더 스트라이크",
    mp: 50,
    desc: "번개를 내려 적을 강하게 공격한다.",
    price: 300,
    formulaCalc: (stats) => stats.skillStat * 11 + 45,
    formulaText: "스킬스탯 * 11 + 45",
  },
  {
    id: "strongpunch",
    name: "강펀치",
    mp: 50,
    desc: "주먹에 모든 힘을 담아 강한 공격을 한다.",
    price: 300,
    formulaCalc: (stats) => stats.skillStat * 12 + 20,
    formulaText: "스킬스탯 * 12 + 20",
  },
];

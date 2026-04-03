// 유저별 스킬 상태 초기값
//
// ownedSkillIds:
// 산 스킬 목록
//
// equippedSkillIds:
// 장착 슬롯 4칸
// 아직 실제 장착 기능은 안 붙음
export const initialSkillsByUserId = {
  1: {
    userId: 1,
    ownedSkillIds: [],
    equippedSkillIds: [null, null, null, null],
  },
};

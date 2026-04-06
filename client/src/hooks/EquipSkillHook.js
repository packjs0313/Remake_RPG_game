import { useState } from "react";
import { skills } from "../data/skillData";
import { initialSkillsByUserId as canUseSkill } from "../data/useSkillsData";

// 이건 스킬 장착 기능 만들려고 파둔 파일
// 아직 완성 안 됐고 실제로도 안 쓰는 중
export default function equipSkill(equipSkillId) {
  const [anySkills, setAnySkills] = useState(skills);
  const [canUseSkills, setCanUseSkill] = useState(canUseSkill);

  
  // 나중에 장착 로직 붙일 때 쓸 값
  return { equipSkillId, anySkills, setAnySkills, canUseSkills, setCanUseSkill };
}

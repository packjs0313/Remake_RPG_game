import { useState } from "react";
import { skills } from "../data/skillData";
import { initialSkillsByUserId as canUseSkill } from "../data/useSkillsData";

export default function useBuySkill(playerState, setPlayerState) {
  const [anySkills, setAnySkills] = useState(skills);
  const [canUseSkills, setCanUseSkill] = useState(canUseSkill);

  const userId = playerState.id;
  const userSkills = canUseSkills[userId];

  // key는 skillId로 사용
  const buySkill = (key) => {
    const skillId = key;
    const targetSkill = anySkills.find((s) => s.id === skillId);
    if (!targetSkill) return;
    if (canUseSkills[userId].ownedSkillIds.includes(skillId)) return;
    if (playerState.gold < targetSkill.price) return;

    // 골드 차감
    setPlayerState((prev) => {
      return {
        ...prev,
        gold: prev.gold - targetSkill.price,
      };
    });

    // 보유 스킬 추가 (현재 userId 기준)
    setCanUseSkill((prev) => {
      const current = prev[userId];
      return {
        ...prev,
        [userId]: {
          ...current,
          ownedSkillIds: [...current.ownedSkillIds, skillId],
        },
      };
    });
  };

  return {
    buySkill,
    userSkills,
    anySkills,
    setAnySkills,
    canUseSkills,
    setCanUseSkill,
  };
}

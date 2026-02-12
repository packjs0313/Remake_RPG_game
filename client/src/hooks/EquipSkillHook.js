import { useState } from "react";
import { skills } from "../data/skillData";
import { initialSkillsByUserId as canUseSkill } from "../data/useSkillsData";

export default function equipSkill(equipSkillId) {
    const [anySkills, setAnySkills] = useState(skills);
    const [canUseSkills, setCanUseSkill] = useState(canUseSkill);

    canUseSkills.ownedSkillIds
}


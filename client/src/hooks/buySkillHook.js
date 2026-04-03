import { useState } from "react";
import { skills } from "../data/skillData"; // skills : 스킬 원본 데이터 전체 목록
import { initialSkillsByUserId as canUseSkill } from "../data/useSkillsData"; // canUseSkill : 유저별 보유 스킬 초기 데이터

export default function useBuySkill(
  playerState, // playerState : 현재 플레이어 상태
  setPlayerState, // setPlayerState : 플레이어 상태 수정 함수
) {
  const [anySkills, setAnySkills] = useState(skills); // anySkills : 실제 상점에서 참고할 전체 스킬 목록
  const [canUseSkills, setCanUseSkill] = useState(canUseSkill); // canUseSkills : 유저별 보유/장착 스킬 상태

  const userId = playerState.id; // userId : 현재 플레이어 id
  const userSkills = canUseSkills[userId]; // userSkills : 현재 유저의 스킬 정보

  const buySkill = (key) => {
    const skillId = key; // skillId : 구매하려는 스킬 id
    const targetSkill = anySkills.find((s) => s.id === skillId); // targetSkill : 실제로 살 스킬 데이터

    if (!targetSkill) return;
    if (canUseSkills[userId].ownedSkillIds.includes(skillId)) return;
    if (playerState.gold < targetSkill.price) return;

    setPlayerState((prev) => {
      return {
        ...prev,
        gold: prev.gold - targetSkill.price,
      };
    });

    setCanUseSkill((prev) => {
      const current = prev[userId]; // current : 현재 유저의 기존 스킬 상태

      return {
        ...prev,
        [userId]: {
          ...current,
          ownedSkillIds: [...current.ownedSkillIds, skillId],
        },
      };
    });
  }; // key : 구매하려는 스킬 id

  return {
    buySkill, // buySkill : 스킬 구매 함수
    userSkills, // userSkills : 현재 유저 스킬 정보
    anySkills, // anySkills : 전체 스킬 목록
    setAnySkills, // setAnySkills : 전체 스킬 목록 수정 함수
    canUseSkills, // canUseSkills : 유저별 스킬 상태 전체
    setCanUseSkill, // setCanUseSkill : 유저별 스킬 상태 수정 함수
  };
}

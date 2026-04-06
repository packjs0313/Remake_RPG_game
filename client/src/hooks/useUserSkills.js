import { useState } from "react";
import { skills } from "../data/skillData"; // skills : 스킬 원본 데이터 전체 목록
import { initialSkillsByUserId as canUseSkill } from "../data/useSkillsData"; // canUseSkill : 유저별 보유 스킬 초기 데이터

export default function useUserSkills(
  playerState, // playerState : 현재 플레이어 상태
  setPlayerState, // setPlayerState : 플레이어 상태 수정 함수
) {
  const [anySkills, setAnySkills] = useState(skills); // anySkills : 실제 상점에서 참고할 전체 스킬 목록
  const [canUseSkills, setCanUseSkill] = useState(canUseSkill); // canUseSkills : 유저별 보유/장착 스킬 상태
  const [pendingEquipSkillId, setPendingEquipSkillId] = useState(null); // pendingEquipSkillId : 슬롯 선택 대기 중인 스킬 id

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

  const beginEquipSelection = (skillId) => {
    // skillId : 지금 유저가 장착하려고 고른 스킬 id

    // 아직 안 산 스킬이면 장착 선택 자체를 막음
    if (!userSkills.ownedSkillIds.includes(skillId)) return;

    // 어떤 스킬을 슬롯에 넣을지 임시 저장
    // 이 값이 있어야 메인 화면에서 "지금 슬롯 선택 중" 상태가 됨
    setPendingEquipSkillId(skillId);
  };

  const equipSkillToSlot = (slotIndex) => {
    // slotIndex : 몇 번째 슬롯에 넣을지
    // 0, 1, 2, 3 중 하나가 들어옴

    // 먼저 고른 스킬이 없으면 아무 것도 안 함
    if (pendingEquipSkillId == null) return;

    setCanUseSkill((prev) => {
      const current = prev[userId]; // current : 현재 유저의 스킬 상태
      const nextEquippedSkillIds = [...current.equippedSkillIds]; // nextEquippedSkillIds : 기존 장착 배열 복사본

      // 선택한 슬롯 자리에 지금 고른 스킬 id를 넣음
      nextEquippedSkillIds[slotIndex] = pendingEquipSkillId;

      return {
        ...prev,
        [userId]: {
          ...current,
          equippedSkillIds: nextEquippedSkillIds, // equippedSkillIds : 최종 장착 슬롯 상태
        },
      };
    });

    // 장착 끝났으니까 선택 모드 종료
    setPendingEquipSkillId(null);
  };

  const cancelEquipSelection = () => {
    setPendingEquipSkillId(null);
  };

  return {
    buySkill, // buySkill : 스킬 구매 함수
    userSkills, // userSkills : 현재 유저 스킬 정보
    anySkills, // anySkills : 전체 스킬 목록
    setAnySkills, // setAnySkills : 전체 스킬 목록 수정 함수
    canUseSkills, // canUseSkills : 유저별 스킬 상태 전체
    setCanUseSkill, // setCanUseSkill : 유저별 스킬 상태 수정 함수
    pendingEquipSkillId, // pendingEquipSkillId : 지금 장착 선택 중인 스킬 id
    beginEquipSelection, // beginEquipSelection : 장착 모드 시작 함수
    equipSkillToSlot, // equipSkillToSlot : 선택한 슬롯에 스킬 넣는 함수
    cancelEquipSelection, // cancelEquipSelection : 장착 모드 취소 함수
  };
}

import { useState } from "react";
import { skills } from "../data/skillData"; // skills : 전체 스킬 원본 데이터
import { initialSkillsByUserId as canUseSkill } from "../data/useSkillsData"; // canUseSkill : 유저별 스킬 초기 상태

export default function useUserSkills(
  playerState, // playerState : 현재 플레이어 상태
  setPlayerState // setPlayerState : 플레이어 상태 수정 함수
) {
  const [anySkills, setAnySkills] = useState(skills); // anySkills : 상점에서 참고할 전체 스킬 목록
  const [canUseSkills, setCanUseSkill] = useState(canUseSkill); // canUseSkills : 유저별 보유/장착 스킬 상태 전체
  const [pendingEquipSkillId, setPendingEquipSkillId] = useState(null); // pendingEquipSkillId : 슬롯 선택 대기 중인 스킬 id

  const userId = playerState.id; // userId : 현재 플레이어 id
  const userSkills = canUseSkills[userId]; // userSkills : 현재 유저의 스킬 상태

  const buySkill = (key) => {
    const skillId = key; // skillId : 구매하려는 스킬 id
    const targetSkill = anySkills.find((s) => s.id === skillId); // targetSkill : 실제로 살 스킬 데이터

    // 없는 스킬이면 중단
    if (!targetSkill) return;

    // 이미 산 스킬이면 중복 구매 막음
    if (canUseSkills[userId].ownedSkillIds.includes(skillId)) return;

    // 골드 부족하면 구매 막음
    if (playerState.gold < targetSkill.price) return;

    // 플레이어 골드 차감
    setPlayerState((prev) => {
      return {
        ...prev,
        gold: prev.gold - targetSkill.price,
      };
    });

    // ownedSkillIds에 새 스킬 id 추가
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
  }; // key : 구매 버튼에서 넘겨주는 스킬 id

  const beginEquipSelection = (skillId) => {
    // skillId : 스킬창에서 고른 장착 대상 스킬 id

    // 안 산 스킬이면 장착 모드 시작 안 함
    if (!userSkills.ownedSkillIds.includes(skillId)) return;

    // 어떤 스킬을 슬롯에 넣을지 먼저 기억해둠
    setPendingEquipSkillId(skillId);
  };

  const equipSkillToSlot = (slotIndex) => {
    // slotIndex : 클릭한 슬롯 번호
    if (pendingEquipSkillId == null) return;

    setCanUseSkill((prev) => {
      const current = prev[userId]; // current : 현재 유저의 기존 스킬 상태
      const nextEquippedSkillIds = [...current.equippedSkillIds]; // nextEquippedSkillIds : 장착 슬롯 배열 복사본

      // 선택한 슬롯 위치에 현재 고른 스킬 id 저장
      nextEquippedSkillIds[slotIndex] = pendingEquipSkillId;

      return {
        ...prev,
        [userId]: {
          ...current,
          equippedSkillIds: nextEquippedSkillIds, // equippedSkillIds : 장착 완료된 최종 슬롯 상태
        },
      };
    });

    // 장착 끝났으니까 선택 모드 종료
    setPendingEquipSkillId(null);
  };

  const cancelEquipSelection = () => {
    // 오버레이 클릭 시 슬롯 선택 모드만 취소
    setPendingEquipSkillId(null);
  };

  return {
    buySkill, // buySkill : 스킬 구매 함수
    userSkills, // userSkills : 현재 유저 스킬 정보
    anySkills, // anySkills : 전체 스킬 목록
    setAnySkills, // setAnySkills : 전체 스킬 목록 수정 함수
    canUseSkills, // canUseSkills : 유저별 스킬 상태 전체
    setCanUseSkill, // setCanUseSkill : 유저별 스킬 상태 수정 함수
    pendingEquipSkillId, // pendingEquipSkillId : 장착 선택 중인 스킬 id
    beginEquipSelection, // beginEquipSelection : 장착할 스킬 먼저 고르는 함수
    equipSkillToSlot, // equipSkillToSlot : 고른 슬롯에 스킬 넣는 함수
    cancelEquipSelection, // cancelEquipSelection : 장착 선택 취소 함수
  };
}

import { useState } from "react";
import CharacterPanel, { CharacterSprite } from "./components/CharacterPanel";
import BottomBar from "./components/BottomBar";
import { enemy } from "./data/mockData";
import StatsModal from "./components/StatsModal";
import SkillModal from "./components/SkillModal";
import usePlayerState from "./hooks/usePlayerStateHook";
import useUserSkills from "./hooks/useUserSkills";

export default function App() {
  const [isStatsOpen, setIsStatsOpen] = useState(false); // isStatsOpen : 스탯창 열림 여부
  const [isSkillsOpen, setIsSkillsOpen] = useState(false); // isSkillsOpen : 스킬창 열림 여부

  const {
    playerState, // playerState : 플레이어 현재 상태
    increaseStat, // increaseStat : 스탯 올리는 함수
    setPlayerState, // setPlayerState : 플레이어 상태 직접 수정하는 setter
  } = usePlayerState();

  const {
    buySkill, // buySkill : 스킬 구매 함수
    userSkills, // userSkills : 현재 유저 스킬 정보
    pendingEquipSkillId, // pendingEquipSkillId : 지금 슬롯 고르는 중인 스킬 id
    beginEquipSelection, // beginEquipSelection : 슬롯 선택 모드 시작
    equipSkillToSlot, // equipSkillToSlot : 슬롯에 스킬 장착
    cancelEquipSelection, // cancelEquipSelection : 장착 선택 취소
  } = useUserSkills(playerState, setPlayerState);

  const handleSelectSkill = (skillId) => {
    beginEquipSelection(skillId);
    setIsSkillsOpen(false);
  };

  return (
    <div className="app">
      {isStatsOpen ? (
        <StatsModal
          onCloseStats={() => setIsStatsOpen(false)}
          player={playerState}
          onIncrease={increaseStat}
        />
      ) : null}

      {isSkillsOpen ? (
        <SkillModal
          player={playerState}
          onCloseSkills={() => setIsSkillsOpen(false)}
          skillStat={playerState.skillStat}
          onBuy={buySkill}
          onSelectSkill={handleSelectSkill}
          ownedSkillIds={userSkills.ownedSkillIds}
        />
      ) : null}

      <div className="game-scene">
        {pendingEquipSkillId ? (
          <button
            type="button"
            className="equip-selection-overlay"
            aria-label="스킬 선택 취소"
            onClick={cancelEquipSelection}
          />
        ) : null}

        <div className="stage-label">STAGE 1</div>

        <div className="ememyBox characterBox">
          <CharacterPanel character={enemy} className="enemy-panel" />
          <CharacterSprite character={enemy} className="enemy-sprite" />
        </div>

        <div className="playerBox characterBox">
          <CharacterPanel character={playerState} className="player-panel" />
          <CharacterSprite character={playerState} className="player-sprite" />
        </div>

        <BottomBar
          onOpenStats={() => setIsStatsOpen(true)}
          onOpenSkills={() => setIsSkillsOpen(true)}
          equippedSkillIds={userSkills.equippedSkillIds}
          isEquipSelecting={Boolean(pendingEquipSkillId)}
          onSelectSlot={equipSkillToSlot}
        />
      </div>
    </div>
  );
}

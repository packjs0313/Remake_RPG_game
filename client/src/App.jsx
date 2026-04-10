import { useState } from "react";
import CharacterPanel, { CharacterSprite } from "./components/CharacterPanel";
import BottomBar from "./components/BottomBar";
import StatsModal from "./components/StatsModal";
import SkillModal from "./components/SkillModal";
import usePlayerState from "./hooks/usePlayerStateHook";
import useUserSkills from "./hooks/useUserSkills";
import useEnemyState from "./hooks/useEnemyStateHook";
import { createDamageLog, prependCombatLog } from "./utils/combatLogUtils";

export default function App() {
  const [isStatsOpen, setIsStatsOpen] = useState(false); // isStatsOpen : 스탯창 열림 여부
  const [isSkillsOpen, setIsSkillsOpen] = useState(false); // isSkillsOpen : 스킬창 열림 여부
  const [combatLogs, setCombatLogs] = useState([]); // combatLogs : 전투 로그 목록

  const {
    playerState, // playerState : 플레이어 현재 상태
    increaseStat, // increaseStat : 스탯 올리는 함수
    setPlayerState, // setPlayerState : 플레이어 상태 직접 수정하는 setter
  } = usePlayerState();

  const {
    enemyState, // enemyState : 현재 적 상태
    takeEnemyDamage, // takeEnemyDamage : 적 체력 깎는 함수
  } = useEnemyState();

  const {
    buySkill, // buySkill : 스킬 구매 함수
    userSkills, // userSkills : 현재 유저 스킬 정보
    pendingEquipSkillId, // pendingEquipSkillId : 지금 슬롯 선택 대기 중인 스킬 id
    beginEquipSelection, // beginEquipSelection : 장착할 스킬 먼저 고르는 함수
    equipSkillToSlot, // equipSkillToSlot : 고른 슬롯에 스킬 넣는 함수
    cancelEquipSelection, // cancelEquipSelection : 장착 선택 취소 함수
  } = useUserSkills(playerState, setPlayerState);

  const handleSelectSkill = (skillId) => {
    // skillId : 스킬창에서 유저가 고른 스킬 id
    // 여기서 바로 장착하는 게 아니라 슬롯 선택 모드만 켠다.
    beginEquipSelection(skillId);
    setIsSkillsOpen(false);
  };

  const handleEnemyClick = () => {
    // 슬롯 선택 중일 땐 적 공격 안 되게 막음
    if (pendingEquipSkillId) return;

    // 플레이어 공격력만큼 적 hp 차감
    takeEnemyDamage(playerState.atk);

    // 로그 문자열 생성
    const nextLog = createDamageLog(
      playerState.name,
      enemyState.name,
      playerState.atk,
    );

    // 최신 로그가 위로 오게 맨 앞에 추가
    setCombatLogs((prev) => prependCombatLog(prev, nextLog));
  };

  return (
    <div className="app">
      {/* 스탯창 : 열려 있을 때만 렌더링 */}
      {isStatsOpen ? (
        <StatsModal
          onCloseStats={() => setIsStatsOpen(false)}
          player={playerState}
          onIncrease={increaseStat}
        />
      ) : null}

      {/* 스킬창 : 열려 있을 때만 렌더링 */}
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
        {/* pendingEquipSkillId가 있으면 슬롯 선택 모드라서 흰 오버레이 띄움 */}
        {pendingEquipSkillId ? (
          <button
            type="button"
            className="equip-selection-overlay"
            aria-label="스킬 선택 취소"
            onClick={cancelEquipSelection}
          />
        ) : null}

        <div className="stage-label">STAGE 1</div>

        {/* enemyState : 현재 적 상태 */}
        <div className="ememyBox characterBox">
          <CharacterPanel character={enemyState} className="enemy-panel" />
          <CharacterSprite
            character={enemyState}
            className="enemy-sprite"
            onClick={handleEnemyClick}
          />
        </div>

        {/* playerState : 현재 플레이어 데이터 */}
        <div className="playerBox characterBox">
          <CharacterPanel character={playerState} className="player-panel" />
          <CharacterSprite character={playerState} className="player-sprite" />
        </div>

        {/* equippedSkillIds : 현재 슬롯에 들어간 스킬 목록
            isEquipSelecting : 슬롯 선택 모드 여부
            onSelectSlot : 슬롯 눌렀을 때 장착 처리
            combatLogs : 전투 로그 목록 */}
        <BottomBar
          onOpenStats={() => setIsStatsOpen(true)}
          onOpenSkills={() => setIsSkillsOpen(true)}
          equippedSkillIds={userSkills.equippedSkillIds}
          isEquipSelecting={Boolean(pendingEquipSkillId)}
          onSelectSlot={equipSkillToSlot}
          combatLogs={combatLogs}
        />
      </div>
    </div>
  );
}

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
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [isSkillsOpen, setIsSkillsOpen] = useState(false);
  const [combatLogs, setCombatLogs] = useState([]);

  const { playerState, increaseStat, setPlayerState } = usePlayerState();
  const { enemyState, takeEnemyDamage } = useEnemyState();

  const { buySkill, userSkills, pendingEquipSkillId, beginEquipSelection, equipSkillToSlot, cancelEquipSelection } = useUserSkills(
    playerState,
    setPlayerState
  );

  const handleSelectSkill = (skillId) => {
    beginEquipSelection(skillId);
    setIsSkillsOpen(false);
  };

  const handleEnemyClick = () => {
    if (pendingEquipSkillId) return;

    takeEnemyDamage(playerState.atk);

    const nextLog = createDamageLog(playerState.name, enemyState.name, playerState.atk);

    setCombatLogs((prev) => prependCombatLog(prev, nextLog));
  };

  return (
    <div className="app">
      {isStatsOpen ? <StatsModal onCloseStats={() => setIsStatsOpen(false)} player={playerState} onIncrease={increaseStat} /> : null}

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
          <button type="button" className="equip-selection-overlay" aria-label="스킬 선택 취소" onClick={cancelEquipSelection} />
        ) : null}

        <div className="stage-label">STAGE 1</div>

        <div className="enemyBox characterBox">
          <CharacterPanel character={enemyState} className="enemy-panel" />
          <CharacterSprite character={enemyState} className="enemy-sprite" onClick={handleEnemyClick} />
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
          combatLogs={combatLogs}
        />
      </div>
    </div>
  );
}

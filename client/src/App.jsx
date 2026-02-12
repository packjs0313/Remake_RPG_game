import { useState } from "react";
import CharacterPanel, { CharacterSprite } from "./components/CharacterPanel";
import BottomBar from "./components/BottomBar";
import { enemy } from "./data/mockData";
import StatsModal from "./components/StatsModal";
import SkillModal from "./components/SkillModal";
import usePlayerState from "./hooks/usePlayerStateHook";
import useBuySkill from "./hooks/buySkillHook";

export default function App() {
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [isSkillsOpen, setIsSkillsOpen] = useState(false);
  const { playerState, increaseStat, setPlayerState } = usePlayerState();
  const { buySkill, userSkills } = useBuySkill(playerState, setPlayerState);

  return (
    //팝업 오픈구역
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
          ownedSkillIds={userSkills.ownedSkillIds}
        />
      ) : null}

      {/* 게임 구역 */}
      <div className="game-scene">
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
        />
      </div>
    </div>
  );
}

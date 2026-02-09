import { useState } from "react";
import CharacterPanel, { CharacterSprite } from "./components/CharacterPanel";
import BottomBar from "./components/BottomBar";
import { player, enemy } from "./data/mockData";
import StatsModal from "./components/StatsModal";
import SkillModal from "./components/SkillModal";

export default function App() {
  const [isStatsOpen, setIsStatsOpen] = useState(false);
  const [isSkillsOpen, setIsSkillsOpen] = useState(false);

  return (
    <div className="app">
      {isStatsOpen ? <StatsModal onCloseStats={() => setIsStatsOpen(false)} /> : null}
      {isSkillsOpen ? <SkillModal onCloseSkills={() => setIsSkillsOpen(false)} /> : null}
      <div className="game-scene">
        <div className="stage-label">STAGE 1</div>

        <div className="ememyBox characterBox">
          <CharacterPanel character={enemy} className="enemy-panel" />
          <CharacterSprite character={enemy} className="enemy-sprite" />
        </div>

        <div className="playerBox characterBox">
          <CharacterPanel character={player} className="player-panel" />
          <CharacterSprite character={player} className="player-sprite" />
        </div>

        <BottomBar
          onOpenStats={() => setIsStatsOpen(true)}
          onOpenSkills={() => setIsSkillsOpen(true)}
        />
      </div>
    </div>
  );
}

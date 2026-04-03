import { useState } from "react";
import CharacterPanel, { CharacterSprite } from "./components/CharacterPanel";
import BottomBar from "./components/BottomBar";
import { enemy } from "./data/mockData";
import StatsModal from "./components/StatsModal";
import SkillModal from "./components/SkillModal";
import usePlayerState from "./hooks/usePlayerStateHook";
import useBuySkill from "./hooks/buySkillHook";

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
  } = useBuySkill(playerState, setPlayerState);

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
          ownedSkillIds={userSkills.ownedSkillIds}
        />
      ) : null}

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

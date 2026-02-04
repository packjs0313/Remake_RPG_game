import CharacterPanel, { CharacterSprite } from "./components/CharacterPanel";
import BottomBar from "./components/BottomBar";
import { player, enemy } from "./data/mockData";

export default function App() {
  return (
    <div className="app">
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

        <BottomBar />
      </div>
    </div>
  );
}

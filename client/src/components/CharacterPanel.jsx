export default function CharacterPanel({ character, className }) {
  const hpPercent = Math.max(0, Math.min(100, (character.hp / character.maxHp) * 100));
  const mpPercent = Math.max(0, Math.min(100, (character.mp / character.maxMp) * 100));

  return (
    <div className={`character-panel ${className || ""} ${character.Ename ||""}`}>
      {character.id != null ? <div className="profile"></div> : null}
      <div className="character-information">
              <div className="name"> 
        {character.name} 
        <span className="lv">LV.{character.level}</span>
        <span className="xp">{character.xp != null ? `[${character.xp}/${character.maxXp}]`: null}</span>
      </div>

      <div className="bar hp-bar">
        <span className="bar-label">HP</span>
        <div className="bar-track">
          <div className="bar-fill" style={{ width: `${hpPercent}%` }} />
        </div>
        <span className="bar-text">
          {character.hp}/{character.maxHp}
        </span>
      </div>

      {character.id != null ?
        <div className="bar mp-bar">
          <span className="bar-label">MP</span>
          <div className="bar-track">
            <div className="bar-fill" style={{ width: `${mpPercent}%` }} />
          </div>
          <span className="bar-text">
            {character.mp}/{character.maxMp}
          </span>
        </div> : null
      }
      </div>
    </div>
  );

}

export function CharacterSprite({ character, className }) {
  return (
    <div className={`character-sprite ${className || ""}`}>
      <img src={character.img} alt={character.name} />
    </div>
  );
}

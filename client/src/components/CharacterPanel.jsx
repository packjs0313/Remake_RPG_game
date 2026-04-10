export default function CharacterPanel({
  character, // character : 플레이어나 적 데이터 객체
  className, // className : App에서 내려주는 추가 클래스명
}) {
  const hpPercent = Math.max(
    0,
    Math.min(100, (character.hp / character.maxHp) * 100),
  ); // hpPercent : hp 바 길이 퍼센트

  const mpPercent = Math.max(
    0,
    Math.min(100, (character.mp / character.maxMp) * 100),
  ); // mpPercent : mp 바 길이 퍼센트

  return (
    <div
      className={`character-panel ${className || ""} ${character.Ename || ""}`}
    >
      {character.gold != null ? (
        <div className="gold">
          <img src="./coin.png" alt="골드" />
          {character.gold}G
        </div>
      ) : null}

      {character.id != null ? <div className="profile"></div> : null}

      <div className="character-information">
        <div className="name">
          {character.name}
          <span className="lv">LV.{character.level}</span>
          <span className="xp">
            {character.xp != null ? `[${character.xp}/${character.maxXp}]` : null}
          </span>
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

        {character.id != null ? (
          <div className="bar mp-bar">
            <span className="bar-label">MP</span>
            <div className="bar-track">
              <div className="bar-fill" style={{ width: `${mpPercent}%` }} />
            </div>
            <span className="bar-text">
              {character.mp}/{character.maxMp}
            </span>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function CharacterSprite({
  character, // character : 이미지에 쓸 캐릭터 데이터
  className, // className : App에서 내려주는 추가 클래스명
  onClick, // onClick : 캐릭터 클릭 이벤트 함수
}) {
  return (
    <div className={`character-sprite ${className || ""}`} onClick={onClick}>
      <img src={character.img} alt={character.name} />
    </div>
  );
}

import "../css/StatsModal.css";

export default function StatsModal({ onCloseStats, player, onIncrease }) {
  return (
    <div className="stats-overlay">
      <article className="stats-modal" role="dialog" aria-modal="true">
        <header className="stats-header">
          <h2>스탯</h2>
          <button className="stats-close" aria-label="닫기" onClick={onCloseStats}>
            X
          </button>
        </header>

        <div className="stats-grid">
          <div className="stats-row">
            <span className="label">HP</span>
            <span className="value">{player.maxHp}</span>
            <button className="add" onClick={() => onIncrease("hp")}>+</button>
          </div>
          <div className="stats-row">
            <span className="label">MP</span>
            <span className="value">{player.maxMp}</span>
            <button className="add" onClick={() => onIncrease("mp")}>+</button>
          </div>
          <div className="stats-row">
            <span className="label">공격력</span>
            <span className="value">{player.atk}</span>
            <button className="add" onClick={() => onIncrease("atk")}>+</button>
          </div>
          <div className="stats-row">
            <span className="label">스킬스탯</span>
            <span className="value">{player.skillStat}</span>
            <button className="add" onClick={() => onIncrease("skillStat")}>+</button>
          </div>
        </div>

        <footer className="stats-footer">남은 스킬포인트: {player.statPoints}</footer>
      </article>
    </div>
  );
}

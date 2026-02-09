import "../css/StatsModal.css";

export default function StatsModal({ onCloseStats }) {
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
            <span className="value">100</span>
            <button className="add">+</button>
          </div>
          <div className="stats-row">
            <span className="label">MP</span>
            <span className="value">100</span>
            <button className="add">+</button>
          </div>
          <div className="stats-row">
            <span className="label">공격력</span>
            <span className="value">10</span>
            <button className="add">+</button>
          </div>
          <div className="stats-row">
            <span className="label">스킬데미지</span>
            <span className="value">20</span>
            <button className="add">+</button>
          </div>
        </div>

        <footer className="stats-footer">남은 스킬포인트: 3</footer>
      </article>
    </div>
  );
}

export default function BottomBar() {
  return (
    <div className="bottom-bar">
      <div className="gold">소지금: 100</div>
      <div className="mobile-slider">
        <div className="action-buttons">
          <button>
            <img src="./skill.png" alt="스킬" />
            <span>스킬</span>
          </button>
          <button>
            <img src="./stats.png" alt="스탯" />
            <span>스탯</span>
          </button>
        </div>
        <div className="skill-list">
          <div className="skill-slot">스킬없음 (-MP)</div>
          <div className="skill-slot">스킬없음 (-MP)</div>
          <div className="skill-slot">스킬없음 (-MP)</div>
          <div className="skill-slot">스킬없음 (-MP)</div>
        </div>
      </div>
    </div>
  );
}

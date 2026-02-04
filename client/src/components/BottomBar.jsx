export default function BottomBar() {
  return (
    <div className="bottom-bar">
      <div className="gold">소지금: 100</div>
      <div className="action-buttons">
        <button>스탯</button>
        <button>스킬</button>
      </div>
      <div className="skill-list">
        <div className="skill-slot">스킬없음 (-MP)</div>
        <div className="skill-slot">스킬없음 (-MP)</div>
        <div className="skill-slot">스킬없음 (-MP)</div>
        <div className="skill-slot">스킬없음 (-MP)</div>
      </div>
    </div>
  );
}

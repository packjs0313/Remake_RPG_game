export default function SkillCard({
  name,
  mp,
  desc,
  price,
  damage,
  formula,
  isHeldSkill,
  onAction,
}) {
  return (
    <div className="skill-card">
      <div className="skill-title">
        <h3>{name}</h3>
        <span className="mp">{mp}</span>
      </div>
      <p className="desc">{desc}</p>
      <div className="price">{price}</div>
      <div className="damage">
        데미지: {damage}
        <span className="formula-help" aria-label="계산식 도움말">
          ?
          <span className="formula-tooltip">{formula}</span>
        </span>
      </div>
      <button className="buy" onClick={onAction}>
        {isHeldSkill ? "스킬 장착" : "스킬 구매"}
      </button>
    </div>
  );
}

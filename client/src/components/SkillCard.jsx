export default function SkillCard({
  name, // name : 스킬 이름
  mp, // mp : 화면에 보여줄 MP 문자열
  desc, // desc : 스킬 설명
  price, // price : 스킬 가격 문자열
  damage, // damage : 계산된 데미지
  formula, // formula : 계산식 설명
  isHeldSkill, // isHeldSkill : 이미 산 스킬인지 여부
  onAction, // onAction : 버튼 클릭 함수
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
          ?<span className="formula-tooltip">{formula}</span>
        </span>
      </div>

      <button className="buy" onClick={onAction}>
        {isHeldSkill ? "스킬 장착" : "스킬 구매"}
      </button>
    </div>
  );
}

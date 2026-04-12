import "../css/SkillModal.css";
import SkillCard from "./SkillCard";
import { skills } from "../data/skillData";

export default function SkillModal({
  onCloseSkills, // onCloseSkills : 닫기 버튼 함수
  skillStat = 0, // skillStat : 현재 플레이어 스킬스탯
  player, // player : 현재 플레이어 상태
  onBuy, // onBuy : 스킬 구매 함수
  onSelectSkill, // onSelectSkill : 장착할 스킬 선택 함수
  ownedSkillIds = [], // ownedSkillIds : 이미 산 스킬 id 목록
}) {
  const stats = { skillStat }; // stats : 계산식에 넘길 객체

  return (
    <div className="skills-overlay">
      <article className="skills-modal" role="dialog" aria-modal="true">
        <header className="skills-header">
          <h2>스킬</h2>
          <button className="skills-close" aria-label="닫기" onClick={onCloseSkills}>
            X
          </button>
        </header>

        <div className="skills-list">
          {skills.map((skill) => {
            const damage = skill.formulaCalc(stats); // damage : 계산식으로 나온 예상 데미지
            const isHeldSkill = ownedSkillIds.includes(skill.id); // isHeldSkill : 이미 산 스킬인지 여부

            return (
              <SkillCard
                key={skill.id}
                name={skill.name}
                mp={`${skill.mp} MP`}
                desc={skill.desc}
                price={`${skill.price}G`}
                damage={damage}
                formula={skill.formulaText}
                isHeldSkill={isHeldSkill}
                onAction={() => {
                  if (isHeldSkill) {
                    onSelectSkill(skill.id);
                    return;
                  }

                  onBuy(skill.id);
                }}
              />
            );
          })}
        </div>

        <footer className="skills-footer">
          <img src="./coin.png" alt="소지금" />
          {player.gold}G
        </footer>
      </article>
    </div>
  );
}

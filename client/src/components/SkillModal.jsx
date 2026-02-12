import "../css/SkillModal.css";
import SkillCard from "./SkillCard";
import { skills } from "../data/skillData";

export default function SkillModal({
  onCloseSkills,
  skillStat = 0,
  player,
  onBuy,
  ownedSkillIds = [],
}) {
  const stats = { skillStat };

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
            const damage = skill.formulaCalc(stats);
            const isHeldSkill = ownedSkillIds.includes(skill.id);

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
                  if (!isHeldSkill) onBuy(skill.id);
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

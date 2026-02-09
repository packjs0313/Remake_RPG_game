import "../css/SkillModal.css";
import SkillCard from "./SkillCard";
import { skills } from "../data/skillData";

export default function SkillModal({ onCloseSkills, skillStat = 0 }) {
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
            return (
              <SkillCard
                key={skill.id}
                name={skill.name}
                mp={`${skill.mp} MP`}
                desc={skill.desc}
                price={`${skill.price}G`}
                damage={damage}
                formula={skill.formulaText}
              />
            );
          })}
        </div>

        <footer className="skills-footer">소지금: 100G</footer>
      </article>
    </div>
  );
}

import { skills } from "../data/skillData";

const skillNameById = Object.fromEntries(
  skills.map((skill) => [skill.id, `${skill.name} (-${skill.mp}MP)`]),
);

export default function BottomBar({
  onOpenStats, // onOpenStats : 스탯창 여는 함수
  onOpenSkills, // onOpenSkills : 스킬창 여는 함수
  equippedSkillIds = [], // equippedSkillIds : 현재 슬롯에 장착된 스킬 id 목록
  isEquipSelecting = false, // isEquipSelecting : 슬롯 선택 모드 여부
  onSelectSlot, // onSelectSlot : 슬롯 클릭 함수
}) {
  return (
    <div className={`bottom-bar ${isEquipSelecting ? "is-equip-selecting" : ""}`}>
      <div className="mobile-slider">
        <div className="action-buttons">
          <button onClick={onOpenSkills}>
            <img src="./skill.png" alt="스킬" />
            <span>스킬</span>
          </button>
          <button onClick={onOpenStats}>
            <img src="./stats.png" alt="스탯" />
            <span>스탯</span>
          </button>
        </div>

        <div className="skill-list">
          {equippedSkillIds.map((skillId, index) => (
            <button
              key={index}
              type="button"
              className={`skill-slot ${isEquipSelecting ? "is-selectable" : ""}`}
              onClick={() => onSelectSlot?.(index)}
              disabled={!isEquipSelecting}
            >
              {skillId ? skillNameById[skillId] ?? "알 수 없는 스킬" : "스킬없음 (-MP)"}
            </button>
          ))}
        </div>
      </div>

      <div className="Combat-Log">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam,
          rerum veniam quod voluptatum deleniti laudantium quis ipsa aperiam non
          velit quasi esse aut error tempora odio quae nulla iusto? Vero tenetur
          eveniet maiores dolorum. Sint adipisci facilis quia, in illo
          consequatur aliquid culpa perspiciatis, fugit neque ab accusamus
          ratione itaque voluptates recusandae nemo amet, placeat est vitae rem
          qui? Assumenda ex veritatis iure nemo quis accusamus vero voluptate
          recusandae explicabo, magnam praesentium accusantium magni eveniet
          voluptas nulla, harum vitae amet! Beatae obcaecati repudiandae magnam
          ipsa autem at dignissimos fugit in nulla saepe. Exercitationem
          suscipit perspiciatis deserunt, cupiditate non accusantium eligendi.
        </p>
      </div>
    </div>
  );
}

import { skills } from "../data/skillData";

const skillNameById = Object.fromEntries(skills.map((skill) => [skill.id, `${skill.name} (-${skill.mp}MP)`]));

export default function BottomBar({
  onOpenStats, // onOpenStats : 스탯창 여는 함수
  onOpenSkills, // onOpenSkills : 스킬창 여는 함수
  equippedSkillIds = [], // equippedSkillIds : 현재 슬롯에 장착된 스킬 id 목록
  isEquipSelecting = false, // isEquipSelecting : 슬롯 선택 모드 여부
  onSelectSlot, // onSelectSlot : 슬롯 클릭 함수
  combatLogs = [], // combatLogs : 전투 로그 목록
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
              {skillId ? (skillNameById[skillId] ?? "알 수 없는 스킬") : "스킬없음 (-MP)"}
            </button>
          ))}
        </div>
      </div>

      <div className="Combat-Log">
        {combatLogs.length > 0 ? combatLogs.map((log, index) => <p key={`${log}-${index}`}>{log}</p>) : <p>전투 로그가 여기에 표시됨.</p>}
      </div>
    </div>
  );
}

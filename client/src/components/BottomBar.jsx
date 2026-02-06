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
        <div className="Combat-Log">
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam, rerum veniam quod voluptatum deleniti laudantium quis ipsa aperiam non velit quasi esse aut error tempora odio quae nulla iusto? Vero tenetur eveniet maiores dolorum. Sint adipisci facilis quia, in illo consequatur aliquid culpa perspiciatis, fugit neque ab accusamus ratione itaque voluptates recusandae nemo amet, placeat est vitae rem qui? Assumenda ex veritatis iure nemo quis accusamus vero voluptate recusandae explicabo, magnam praesentium accusantium magni eveniet voluptas nulla, harum vitae amet! Beatae obcaecati repudiandae magnam ipsa autem at dignissimos fugit in nulla saepe. Exercitationem suscipit perspiciatis deserunt, cupiditate non accusantium eligendi.</p>
        </div>
    </div>
  );
}

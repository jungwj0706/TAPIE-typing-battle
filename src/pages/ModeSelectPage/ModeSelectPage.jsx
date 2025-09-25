import React from "react";
import styles from "./ModeSelectPage.module.css";
import mainBg from "../../assets/common-bg.svg";
import { useNavigate, useLocation } from "react-router-dom";
import { CircleAlert } from "lucide-react";

const ModeSelectPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // NameInputPage에서 전달받은 playerName 가져오기
  const playerName = location.state?.playerName;

  // 디버깅용 로그
  console.log("ModeSelectPage에서 받은 playerName:", playerName);

  const handleWordBattleClick = () => {
    // playerName을 state로 전달
    navigate("/game/word", { state: { playerName } });
  };

  const handleLongTextBattleClick = () => {
    // playerName을 state로 전달
    navigate("/game/sentence", { state: { playerName } });
  };

  return (
    <div className={styles["mode-select-page"]}>
      <img src={mainBg} alt="Background" className={styles["common-bg"]} />
      <div className={styles["content-container"]}>
        <div className={styles.card} onClick={handleWordBattleClick}>
          <p className={styles.cardTitle}>낱말 대결</p>
          <p className={styles.cardDescription}>
            랜덤으로 나오는 전공 동아리의 이름을
            <br />
            상대방보다 빠르고 정확하게 적어봐요!
          </p>
          <div className={styles.cardFooter}>
            <CircleAlert size={16} />
            <span className={styles.warningText}>
              모든 동아리명은 알파벳이며, 특수문자가 포함된 곳도 있습니다
            </span>
          </div>
        </div>

        <div className={styles.card} onClick={handleLongTextBattleClick}>
          <p className={styles.cardTitle}>장문 대결</p>
          <p className={styles.cardDescription}>
            우리 학교 교가를
            <br />
            상대방보다 빠르고 정확하게 적어봐요!
          </p>
          <div className={styles.cardFooter}>
            <CircleAlert size={16} />
            <span className={styles.warningText}>
              선린인이라면 교가정도는 다 외웠겠죠??
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModeSelectPage;

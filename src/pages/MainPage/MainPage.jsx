import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MainPage.module.css";
import mainBg from "../../assets/main-bg.svg";
const MainPage = () => {
  const navigate = useNavigate();
  const handlePlayClick = () => {
    navigate("/name");
  };
  const handleRankClick = () => {
    navigate("/ranking");
  };
  return (
    <>
      <div className={styles["main-page"]}>
        <img src={mainBg} alt="Background" className={styles["main-bg"]} />
        <div className={`${styles["main-content"]} flex-center flex-column`}>
          <h1 className={styles["main-title"]}>Typing battle</h1>
          <div className={styles["main-buttons"]}>
            <button
              onClick={handlePlayClick}
              className={`${styles["main-button"]} ${styles.primary}`}
            >
              PLAY
            </button>
            <button
              onClick={handleRankClick}
              className={`${styles["main-button"]} ${styles.secondary}`}
            >
              RANK
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default MainPage;

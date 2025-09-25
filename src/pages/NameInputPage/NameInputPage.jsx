import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./NameInputPage.module.css";
import commonBg from "../../assets/common-bg.svg";

const NameInputPage = () => {
  const [playerName, setPlayerName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setPlayerName(e.target.value);
    setErrorMessage("");
  };

  const handleStartClick = () => {
    if (playerName.trim().length === 0) {
      setErrorMessage("이름을 입력해주세요.");
      return;
    }
    localStorage.setItem("currentPlayerName", playerName);
    // Supabase에 데이터를 저장하지 않고 바로 모드 선택 페이지로 이동함
    navigate("/select", { state: { playerName } });
  };

  return (
    <div className={styles["name-input-page"]}>
      <img src={commonBg} alt="Background" className={styles["common-bg"]} />
      <div className={styles["center-wrapper"]}>
        <p className={styles.title}>이름을 입력해주세요</p>
        <input
          type="text"
          className={styles["name-input"]}
          value={playerName}
          onChange={handleInputChange}
          placeholder="이름을 입력해주세요"
          maxLength="15"
        />
        <button className={styles["start-button"]} onClick={handleStartClick}>
          시작하기
        </button>
        <div className={styles["error-message"]}>{errorMessage}</div>
      </div>
    </div>
  );
};

export default NameInputPage;

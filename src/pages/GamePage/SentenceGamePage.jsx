import React, { useState, useEffect, useRef } from "react";
import styles from "./SentenceGamePage.module.css";
import mainBg from "../../assets/common-bg.svg";
import { useNavigate, useLocation } from "react-router-dom";
import sampleSentences from "../../data/sampleSentences.json";
import { supabase } from "../../services/supabaseClient";
import useTimer from "../../hooks/useTimer";

const SentenceGamePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const username =
    location.state?.playerName ||
    localStorage.getItem("currentPlayerName") ||
    "익명";
  const [sentences, setSentences] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [isCorrect, setIsCorrect] = useState(true);
  const [isGameEnded, setIsGameEnded] = useState(false);
  const inputRef = useRef(null);

  // 타자수와 시작 시간 상태
  const [correctChars, setCorrectChars] = useState(0);
  const [startTime, setStartTime] = useState(null);

  // useTimer 훅 사용해서 타이머 구현 (duration은 임의)
  const { start, stop } = useTimer({ duration: 9999 });

  useEffect(() => {
    setSentences(sampleSentences);
    inputRef.current.focus();
    setStartTime(Date.now());
    start();
  }, []);

  const saveRank = async (wpm, time) => {
    const { data, error } = await supabase.from("ranking").insert([
      {
        username: username || "익명",
        game_type: "장문",
        wpm: wpm || 0,
        total_time: time || 0,
      },
    ]);

    if (error) {
      console.error("Error saving rank:", error);
    } else {
      console.log("Rank saved successfully:", data);
    }
  };

  const handleInputChange = async (event) => {
    const value = event.target.value;
    setInputValue(value);

    // 입력값과 현재 문장 비교
    const currentSentence = sentences[currentIndex];
    if (currentSentence) {
      const isMatch = currentSentence.startsWith(value);
      setIsCorrect(isMatch);

      if (value === currentSentence) {
        setCorrectChars((prev) => prev + currentSentence.length);

        if (currentIndex === sentences.length - 1) {
          stop();
          const endTime = Date.now();
          const timeInSeconds = Math.round((endTime - startTime) / 1000);
          const totalTimeInMinutes = timeInSeconds / 60;
          const calculatedWpm =
            totalTimeInMinutes > 0 ? correctChars / totalTimeInMinutes : 0;

          await saveRank(calculatedWpm, timeInSeconds);

          navigate("/ranking");
        }

        setTimeout(() => {
          setInputValue("");
          setIsCorrect(true);
          if (currentIndex < sentences.length - 1) {
            setCurrentIndex((prevIndex) => prevIndex + 1);
          }
        }, 200);
      }
    }
  };

  const handleResetGame = () => {
    setIsGameEnded(false);
    setSentences(sampleSentences);
    setCurrentIndex(0);
    setInputValue("");
    setIsCorrect(true);
    setCorrectChars(0);
    inputRef.current.focus();
    setStartTime(Date.now());
    start();
  };

  const prevSentences = sentences.slice(
    Math.max(0, currentIndex - 3),
    currentIndex,
  );
  const nextSentences = sentences.slice(currentIndex + 1, currentIndex + 3);
  const targetSentence = sentences[currentIndex];

  const inputClass = `${styles.input} ${
    inputValue && !isCorrect ? styles.inputWrong : ""
  } ${inputValue === targetSentence && isCorrect ? styles.inputCorrect : ""}`;

  const bgStyle = {
    backgroundImage: `url(${mainBg})`,
  };

  if (isGameEnded) {
    return (
      <div className={styles.container} style={bgStyle}>
        <div className={styles.gameCard}>
          <div className={styles.gameContent}>
            <h1 className={styles.endMessage}>게임 종료!</h1>
            <p className={styles.wpmDisplay}>
              당신의 타수는{" "}
              {Math.round(correctChars / ((Date.now() - startTime) / 60000))}{" "}
              WPM 입니다.
            </p>
            <button onClick={handleResetGame} className={styles.endButton}>
              다시 시작하기
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container} style={bgStyle}>
      <button onClick={() => navigate("/")} className={styles.backButton}>
        <span className={styles.backButtonIcon}>&lt;</span>메뉴로 돌아가기
      </button>
      <div className={styles.sentenceDisplayContainer}>
        <div className={styles.prevSentences}>
          {prevSentences.map((sentence, index) => (
            <span key={index}>{sentence}</span>
          ))}
        </div>
      </div>
      <div className={styles.gameCard}>
        <div className={styles.gameContent}>
          <div className={styles.targetSentence}>{targetSentence}</div>
          <div className={styles.inputContainer}>
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              className={inputClass}
              autoFocus
            />
          </div>
        </div>
      </div>
      <div className={styles.sentenceDisplayContainer}>
        <div className={styles.nextSentences}>
          {nextSentences.map((sentence, index) => (
            <span key={index}>{sentence}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SentenceGamePage;

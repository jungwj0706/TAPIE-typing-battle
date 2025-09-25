import React, { useState, useEffect, useRef } from "react";
import styles from "./WordGamePage.module.css";
import mainBg from "../../assets/common-bg.svg";
import { useNavigate, useLocation } from "react-router-dom";
import sampleWords from "../../data/sampleWords.json";
import { supabase } from "../../services/supabaseClient";
import useTimer from "../../hooks/useTimer";

// 모든 단어를 섞는 함수
const shuffleArray = (array) => {
  let newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

const WordGamePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const username =
    location.state?.playerName ||
    localStorage.getItem("currentPlayerName") ||
    "익명";
  const [words, setWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [isCorrect, setIsCorrect] = useState(true);
  const [isGameEnded, setIsGameEnded] = useState(false);
  const inputRef = useRef(null);

  // 타자수와 시작 시간 상태
  const [correctChars, setCorrectChars] = useState(0);
  const [startTime, setStartTime] = useState(null);

  // useTimer 훅 사용해 타이머 구현 (duration은 임의)
  const { start, stop } = useTimer({ duration: 9999 });

  useEffect(() => {
    setWords(shuffleArray(sampleWords));
    inputRef.current.focus();
    setStartTime(Date.now());
    start();
  }, []); // 빈 의존성 배열로 변경 - 컴포넌트 마운트 시에만 실행

  const saveRank = async (wpm, time) => {
    console.log("저장할 데이터:", { username, wpm, time }); // 디버깅용

    const { data, error } = await supabase.from("ranking").insert([
      {
        username: username || "익명",
        game_type: "단어",
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

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    // 입력값과 현재 단어 비교
    const currentWord = words[currentIndex];
    if (currentWord) {
      const isMatch = currentWord.startsWith(value);
      setIsCorrect(isMatch);

      if (value === currentWord) {
        // 현재 단어의 길이를 correctChars에 추가
        const newCorrectChars = correctChars + currentWord.length;
        setCorrectChars(newCorrectChars);

        if (currentIndex === words.length - 1) {
          stop();
          const endTime = Date.now();
          const timeInSeconds = Math.round((endTime - startTime) / 1000);
          const totalTimeInMinutes = timeInSeconds / 60;

          // 수정된 WPM 계산 (총 타자 수 사용)
          const calculatedWpm =
            totalTimeInMinutes > 0
              ? Math.round(newCorrectChars / totalTimeInMinutes)
              : 0;

          // 디버깅을 위한 콘솔 로그 추가
          console.log("게임 종료 데이터:", {
            username: username,
            game_type: "단어",
            wpm: calculatedWpm,
            total_time: timeInSeconds,
            total_chars: newCorrectChars,
          });

          saveRank(calculatedWpm, timeInSeconds);
          setIsGameEnded(true);
        }

        setTimeout(() => {
          setInputValue("");
          setIsCorrect(true);
          if (currentIndex < words.length - 1) {
            setCurrentIndex((prevIndex) => prevIndex + 1);
          }
        }, 200);
      }
    }
  };

  const handleResetGame = () => {
    setIsGameEnded(false);
    setWords(shuffleArray(sampleWords));
    setCurrentIndex(0);
    setInputValue("");
    setIsCorrect(true);
    setCorrectChars(0);
    inputRef.current.focus();
    setStartTime(Date.now());
    start();
  };

  const bgStyle = {
    backgroundImage: `url(${mainBg})`,
  };

  if (isGameEnded) {
    const finalWpm = Math.round(
      correctChars / ((Date.now() - startTime) / 60000),
    );

    return (
      <div className={styles.container} style={bgStyle}>
        <div className={styles.gameCard}>
          <div className={styles.gameContent}>
            <h1 className={styles.endMessage}>게임 종료!</h1>
            <p className={styles.wpmDisplay}>
              당신의 타수는 {finalWpm} WPM 입니다.
            </p>
            <button onClick={handleResetGame} className={styles.endButton}>
              다시 시작하기
            </button>
          </div>
        </div>
      </div>
    );
  }

  const prevWords = words.slice(Math.max(0, currentIndex - 3), currentIndex);
  const nextWords = words.slice(currentIndex + 1, currentIndex + 3);
  const targetWord = words[currentIndex];

  const inputClass = `${styles.input} ${
    inputValue && !isCorrect ? styles.inputWrong : ""
  } ${inputValue === targetWord && isCorrect ? styles.inputCorrect : ""}`;

  return (
    <div className={styles.container} style={bgStyle}>
      <button onClick={() => navigate("/")} className={styles.backButton}>
        <span className={styles.backButtonIcon}>&lt;</span>메뉴로 돌아가기
      </button>
      <div className={styles.wordDisplayContainer}>
        <div className={styles.prevWords}>
          {prevWords.map((word, index) => (
            <span key={index}>{word}</span>
          ))}
        </div>
      </div>
      <div className={styles.gameCard}>
        <div className={styles.gameContent}>
          <div className={styles.targetWord}>{targetWord}</div>
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
      <div className={styles.wordDisplayContainer}>
        <div className={styles.nextWords}>
          {nextWords.map((word, index) => (
            <span key={index}>{word}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WordGamePage;

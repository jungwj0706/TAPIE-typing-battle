import React, { useState, useEffect, useRef } from "react";
import styles from "./WordGamePage.module.css";
import mainBg from "../../assets/common-bg.svg";
import { useNavigate, useLocation } from "react-router-dom";
import sampleWords from "../../data/sampleWords.json";
// import { createClient } from "@supabase/supabase-js";
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
  const username = location.state?.playerName || "익명";
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
  }, []);

  const saveRank = async (wpm) => {
    const { data, error } = await supabase.from("ranking").insert([
      {
        username: username,
        game_type: "단어",
        wpm: wpm,
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
        setCorrectChars((prev) => prev + currentWord.length);

        if (currentIndex === words.length - 1) {
          stop();
          setIsGameEnded(true);
          const endTime = Date.now();
          const totalTimeInMinutes = (endTime - startTime) / 60000;
          const calculatedWpm =
            totalTimeInMinutes > 0 ? correctChars / totalTimeInMinutes : 0;
          saveRank(calculatedWpm);
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

  const prevWords = words.slice(Math.max(0, currentIndex - 3), currentIndex);
  const nextWords = words.slice(currentIndex + 1, currentIndex + 3);
  const targetWord = words[currentIndex];

  const inputClass = `${styles.input} ${
    inputValue && !isCorrect ? styles.inputWrong : ""
  } ${inputValue === targetWord && isCorrect ? styles.inputCorrect : ""}`;

  const bgStyle = {
    backgroundImage: `url(${mainBg})`,
  };

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

import React, { useState, useEffect, useRef } from "react";
import styles from "./WordGamePage.module.css";
import mainBg from "../../assets/common-bg.svg";
import { useNavigate } from "react-router-dom";
import sampleWords from "../../data/sampleWords.json";

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
  const [words, setWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [isCorrect, setIsCorrect] = useState(true);
  const inputRef = useRef(null);

  useEffect(() => {
    setWords(shuffleArray(sampleWords));
    inputRef.current.focus();
  }, []);

  useEffect(() => {
    setCurrentIndex(0);
  }, [words]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    // 입력값과 현재 단어 비교
    const currentWord = words[currentIndex];
    if (currentWord) {
      const isMatch = currentWord.startsWith(value);
      setIsCorrect(isMatch);

      if (value === currentWord) {
        setTimeout(() => {
          setInputValue("");
          setIsCorrect(true);
          if (currentIndex < words.length - 1) {
            setCurrentIndex((prevIndex) => prevIndex + 1);
          } else {
            // 게임 끝나고 나서 로직 -> 아직 미정
          }
        }, 200);
      }
    }
  };

  const prevWords = words.slice(Math.max(0, currentIndex - 3), currentIndex);
  const nextWords = words.slice(currentIndex + 1, currentIndex + 3);
  const targetWord = words[currentIndex];

  const inputClass = `${styles.input} ${
    inputValue && !isCorrect ? styles.inputWrong : ""
  } ${inputValue && isCorrect && inputValue === targetWord ? styles.inputCorrect : ""}`;

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

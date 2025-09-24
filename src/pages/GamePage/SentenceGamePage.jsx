import React, { useState, useEffect, useRef } from "react";
import styles from "./SentenceGamePage.module.css";
import mainBg from "../../assets/common-bg.svg";
import { useNavigate } from "react-router-dom";
import sampleSentences from "../../data/sampleSentences.json";

const SentenceGamePage = () => {
  const navigate = useNavigate();
  const [sentences, setSentences] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [isCorrect, setIsCorrect] = useState(true);
  const inputRef = useRef(null);

  useEffect(() => {
    // 문장을 JSON 파일 순서대로 초기화함
    setSentences(sampleSentences);
    inputRef.current.focus();
  }, []);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);

    // 입력값과 현재 문장 비교
    const currentSentence = sentences[currentIndex];
    if (currentSentence) {
      const isMatch = currentSentence.startsWith(value);
      setIsCorrect(isMatch);

      if (value === currentSentence) {
        setTimeout(() => {
          setInputValue("");
          setIsCorrect(true);
          if (currentIndex < sentences.length - 1) {
            setCurrentIndex((prevIndex) => prevIndex + 1);
          } else {
            // 게임 끝나고 나서 로직 -> 아직 미정
          }
        }, 200);
      }
    }
  };

  const prevSentences = sentences.slice(
    Math.max(0, currentIndex - 3),
    currentIndex,
  );
  const nextSentences = sentences.slice(currentIndex + 1, currentIndex + 3);
  const targetSentence = sentences[currentIndex];

  const inputClass = `${styles.input} ${
    inputValue && !isCorrect
      ? styles.inputWrong
      : inputValue === targetSentence
        ? styles.inputCorrect
        : styles.inputNeutral
  }`;

  const bgStyle = {
    backgroundImage: `url(${mainBg})`,
  };

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

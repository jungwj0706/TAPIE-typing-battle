import { useState } from "react";

export default function useTyping(mode, texts) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [input, setInput] = useState("");
  const [correctCount, setCorrectCount] = useState(0);
  const [wrongCount, setWrongCount] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const currentText = texts[currentIndex] ?? "";

  const handleChange = (value) => {
    setInput(value);

    if (mode === "word" && value.endsWith(" ")) {
      checkAnswer(value.trim());
    }
  };

  const handleSubmit = () => {
    if (mode === "sentence") {
      checkAnswer(input.trim());
    }
  };

  const checkAnswer = (answer) => {
    if (answer === currentText) {
      setCorrectCount((c) => c + 1);
    } else {
      setWrongCount((w) => w + 1);
    }

    setInput("");
    if (currentIndex + 1 < texts.length) {
      setCurrentIndex((i) => i + 1);
    } else {
      setIsFinished(true);
    }
  };

  const result = {
    score: correctCount * 10 - wrongCount * 5,
    correct: correctCount,
    wrong: wrongCount,
  };

  return {
    currentText,
    input,
    handleChange,
    handleSubmit,
    isFinished,
    result,
  };
}

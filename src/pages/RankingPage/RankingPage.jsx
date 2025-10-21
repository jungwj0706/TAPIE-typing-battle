import React, { useState, useEffect } from "react";
import styles from "./RankingPage.module.css";
import mainBg from "../../assets/common-bg.svg";
import { useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const RankingPage = () => {
  const navigate = useNavigate();
  const [rankings, setRankings] = useState([]);
  const [gameMode, setGameMode] = useState("단어"); // '단어' 또는 '장문'
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchRankings(gameMode);
  }, [gameMode]);

  const fetchRankings = async (mode) => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("ranking")
      .select("*")
      .eq("game_type", mode)
      .order("wpm", { ascending: false })
      .limit(10);

    if (error) {
      console.error("Error fetching rankings:", error);
      setRankings([]);
    } else {
      setRankings(data || []);
    }
    setIsLoading(false);
  };

  const handleModeChange = (mode) => {
    setGameMode(mode);
  };

  const bgStyle = {
    backgroundImage: `url(${mainBg})`,
  };

  return (
    <div className={styles.container} style={bgStyle}>
      <button onClick={() => navigate("/")} className={styles.backButton}>
        <span className={styles.backButtonIcon}>&lt;</span>메뉴로 돌아가기
      </button>
      <div className={styles.gameCard}>
        <h1 className={styles.title}>RANK</h1>
        <div className={styles.modeTabs}>
          <button
            className={`${styles.tab} ${gameMode === "단어" ? styles.activeTab : ""}`}
            onClick={() => handleModeChange("단어")}
          >
            낱말 대결
          </button>
          <button
            className={`${styles.tab} ${gameMode === "장문" ? styles.activeTab : ""}`}
            onClick={() => handleModeChange("장문")}
          >
            장문 대결
          </button>
        </div>
        {isLoading ? (
          <p>랭킹을 불러오는 중입니다...</p>
        ) : (
          <table className={styles.rankingTable}>
            <thead>
              <tr>
                <th>순위</th>
                <th>이름</th>
                <th>타수(WPM)</th>
                <th>걸린 시간</th>
              </tr>
            </thead>
            <tbody>
              {rankings.length > 0 ? (
                rankings.map((rank, index) => (
                  <tr key={rank.id}>
                    <td>{index + 1}</td>
                    <td>{rank.username || "익명"}</td> {/* fallback 추가 */}
                    <td>{Math.round(rank.wpm || 0)}</td> {/* fallback 추가 */}
                    <td>
                      {rank.total_time ? `${rank.total_time}초` : "N/A"}
                    </td>{" "}
                    {/* null 체크 추가 */}
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">아직 랭킹 기록이 없습니다.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default RankingPage;

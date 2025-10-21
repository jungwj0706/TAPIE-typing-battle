# TAPIE Typing Battle

2025 선린제 동아리마당 **TAPIE 체험 부스**에서 방문객들이 **타자게임**을 즐길 수 있는 웹 서비스입니다.<br />
축제가 끝난 후에도 서비스를 계속 운영할 예정이니 언제든 자유롭게 플레이해 보세요! (모바일은 지원되지 않습니다. 컴퓨터로 플레이하는 것을 권장드립니다.)<br />
*링크: https://tapie-typing-battle.pages.dev/*

> 해당 저장소는 2025년 09월 26일 15:00(동아리마당 마감 이후)에 공개 저장소로 전환되었습니다. <br />
> 상품 증정 대상이 되는 타자 대결 랭킹은 2025년 09월 26일 12:00에 최종 집계되었으며, 그 이후의 기록은 상품 증정에 반영되지 않습니다.

> **업데이트 (2025.10.21)**  
> Supabase의 익명 키 만료로 인해 **랭킹 저장 및 조회 기능이 현재 비활성화**되었습니다.  
> 게임 플레이는 정상적으로 가능합니다.

---

## Tech Stack
### Frontend
- React
- React Router
- Vite

### Backend
- Supabase 

### Deployment
- Cloudflare pages

---

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/jungwj0706/TAPIE-typing-battle.git
   ```
2. Navigate to the project directory:
   ```bash
   cd TAPIE-typing-battle
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

---

## Environment Variables
To run this project, you need to set the following environment variables:
- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anonymous key

Create a `.env` file in the root directory and add the variables:
```env
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

---

## Project Structure
```
TAPIE-typing-battle/
  ├───.env.example
  ├───.gitignore
  ├───eslint.config.js
  ├───index.html
  ├───package-lock.json
  ├───package.json
  ├───README.md
  ├───vite.config.js
  ├───public/
  │   ├───favicon.png
  │   └───vite.svg 
  └───src/
      ├───App.css
      ├───App.jsx
      ├───index.css
      ├───index.jsx
      ├───main.jsx
      ├───assets/
      │   ├───common-bg.svg
      │   └───main-bg.svg
      ├───components/
      │   └───ui/
      │       ├───Button/
      │       │   ├───Button.css
      │       │   └───Button.jsx
      │       ├───Input/
      │       │   ├───Input.css
      │       │   └───Input.jsx
      │       └───Modal/
      │           ├───Modal.css
      │           └───Modal.jsx
      ├───context/
      │   ├───UserContext.jsx       # Manages user information globally (유저 정보를 전역적으로 관리)
      │   └───useUser.js            # Custom hook for accessing UserContext (UserContext를 쉽게 사용하기 위한 커스텀 훅)
      ├───data/
      │   ├───sampleSentences.json  # Sentence data: Sunrin Internet High School anthem (문장 데이터: 선린인터넷고 교가)
      │   └───sampleWords.json      # Word data: Sunrin Internet High School clubs (단어 데이터: 선린인터넷고 전공동아리들)
      ├───hooks/
      │   ├───useTimer.js           # Custom hook for the game timer feature (게임 타이머 기능 커스텀 훅)
      │   └───useTyping.js          # Handles typing logic and accuracy/speed calculation (타자 입력 처리 및 정확도/속도 계산 로직 커스텀 훅)
      ├───pages/
      │   ├───GamePage/
      │   │   ├───SentenceGamePage.jsx
      │   │   ├───SentenceGamePage.module.css
      │   │   ├───WordGamePage.jsx
      │   │   └───WordGamePage.module.css
      │   ├───MainPage/
      │   │   ├───MainPage.jsx
      │   │   └───MainPage.module.css
      │   ├───ModeSelectPage/
      │   │   ├───ModeSelectPage.jsx
      │   │   └───ModeSelectPage.module.css
      │   ├───NameInputPage/
      │   │   ├───NameInputPage.jsx
      │   │   └───NameInputPage.module.css
      │   └───RankingPage/
      │       ├───RankingPage.jsx
      │       └───RankingPage.module.css
      ├───services/
      │   ├───rankingService.js     # Logic for fetching and saving ranking data (랭킹 데이터 조회/저장 관련 서비스 로직)
      │   └───supabaseClient.js     # Supabase client initialization and configuration (Supabase 클라이언트 초기화 및 설정)
      ├───styles/
      │   ├───globals.css
      │   └───variables.css
      └───utils/
          └───random.js             # Utility functions for selecting random items from arrays (배열에서 랜덤 항목을 가져오는 등 유틸리티 함수)
```

---

## Development Commands
- Start the development server:
  ```bash
  npm run dev
  ```
- Build for production:
  ```bash
  npm run build
  ```
- Preview production build:
  ```bash
  npm run preview
  ```
- Run lint checks:
  ```bash
  npm run lint
  ```

---

## Contributing
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

---

개발자: [정우진](https://github.com/jungwj0706) <br />
디자이너: 조예서

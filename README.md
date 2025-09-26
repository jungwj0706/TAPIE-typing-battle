# TAPIE Typing Battle

2025 선린제 동아리마당 **TAPIE 체험 부스**에서 방문객들이 **타자게임**을 즐길 수 있는 웹 서비스입니다.<br />
축제가 끝난 후에도 서비스를 계속 운영할 예정이니 언제든 자유롭게 플레이해 보세요!

> 해당 저장소는 2025년 09월 26일 15:00(동아리마당 마감 이후)에 공개 저장소로 전환되었습니다. <br />
> 상품 증정 대상이 되는 타자 대결 랭킹은 2025년 09월 26일 12:00에 최종 집계되었으며, 그 이후의 기록은 상품 증정에 반영되지 않습니다.

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
      │   ├───GameHUD.jsx
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
      ├───constants/
      │   └───gameConstants.js
      ├───context/
      │   ├───UserContext.jsx
      │   └───useUser.js
      ├───data/
      │   ├───sampleSentences.json
      │   └───sampleWords.json
      ├───hooks/
      │   ├───useFetchWords.js
      │   ├───useTimer.js
      │   └───useTyping.js
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
      │   ├───rankingService.js
      │   └───supabaseClient.js
      ├───styles/
      │   ├───globals.css
      │   └───variables.css
      └───utils/
          ├───formatters.js
          └───random.js
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

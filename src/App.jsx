import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

//Page(s)
import Landing from "./Pages/Landing";
import TelegramUserAuth from "./Pages/TelegramUserAuth";
import DailyVerse from "./Pages/DailyVerse";
import PrayerWall from "./Pages/PrayerWall";
import AppPage from "./Pages/AppPages/AppPage";
import HomePage from "./Pages/AppPages/HomePage";
import FaithPage from "./Pages/AppPages/FaithPage";
import TaskPage from "./Pages/AppPages/TaskPage";
import LeaderBoard from "./Pages/AppPages/LeaderBoard";
import FriendsPage from "./Pages/AppPages/FriendsPage";
import GamesPage from "./Pages/AppPages/InAppPages/GamesPage";
import PrayerWallPage from "./Pages/AppPages/InAppPages/PrayerWallPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/page-2" element={<TelegramUserAuth />} />
          <Route path="/page-3" element={<DailyVerse />} />
          <Route path="/page-4" element={<PrayerWall />} />
          <Route path="/app" element={<AppPage />}>
            <Route path="/app/page-1" element={<HomePage />} />
            <Route path="/app/page-2" element={<FaithPage />}>
              <Route index element={<Navigate to="/app/page-2/games" />} />
              <Route path="/app/page-2/games" element={<GamesPage />} />
              <Route
                path="/app/page-2/prayer-wall"
                element={<PrayerWallPage />}
              />
            </Route>
            <Route path="/app/page-3" element={<TaskPage />} />
            <Route path="/app/page-4" element={<LeaderBoard />} />
            <Route path="/app/page-5" element={<FriendsPage />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;

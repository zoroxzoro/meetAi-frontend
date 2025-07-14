import { Routes, Route, useLocation } from "react-router-dom";
import RegisterPage from "./custom/Register";
import LoginPage from "./custom/Sing";
import HomePage from "./Pages/Home";
import Layout from "./components/ui/Layout";
import MeetingsPage from "./custom/MeetingsPage";
import AgentsPage from "./Pages/Agents";

function App() {
  const location = useLocation();
  const hideLayoutRoutes = ["/login", "/signup"];
  const isLayoutHidden = hideLayoutRoutes.includes(location.pathname);

  return (
    <>
      {isLayoutHidden ? (
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<RegisterPage />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<MeetingsPage />} />
            <Route path="meetings" element={<MeetingsPage />} />
            <Route path="agents" element={<AgentsPage />} />
          </Route>
        </Routes>
      )}
    </>
  );
}

export default App;

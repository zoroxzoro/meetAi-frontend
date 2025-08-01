import { Routes, Route, useLocation } from "react-router-dom";
import { lazy } from "react";
import MeetingRoom from "./custom/MeetingRoom";
const RegisterPage = lazy(() => import("./custom/Register"));
const LoginPage = lazy(() => import("./custom/Sing"));
const HomePage = lazy(() => import("./Pages/Home"));
const Layout = lazy(() => import("./components/ui/Layout"));
const MeetingsPage = lazy(() => import("./custom/MeetingsPage"));
const AgentsPage = lazy(() => import("./Pages/Agents"));

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
          <Route path="meeting/:meetingId" element={<MeetingRoom />} />
        </Routes>
      )}
    </>
  );
}

export default App;

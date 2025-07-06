import {
  useUser
} from "@clerk/clerk-react";
import { Home } from "lucide-react";
import { Route, Routes, useLocation } from "react-router-dom";
import RegisterPage from "./custom/Register";
import LoginPage from "./custom/Sing";
import HomePage from "./Pages/Home";
import Layout from "./components/ui/Layout";
import AppLayout from "./components/ui/Layout";
import MeetingsPage from "./custom/MeetingsPage";

function App() {
  const location = useLocation();
  const hideLayoutRoutes = ["/login", "/signup"];
  const isLayoutHidden = hideLayoutRoutes.includes(location.pathname);

  return (

    <>
      {isLayoutHidden ? (
        <Routes>
          <Route path="/login" element={<LoginPage />} />

        </Routes>
      ) : (
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/meetings" element={<MeetingsPage />} />

          </Routes>
        </Layout>
      )}
    </>
  );
}

export default App;

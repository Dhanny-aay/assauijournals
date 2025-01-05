import { Routes, Route, useLocation } from "react-router-dom";

import { useEffect } from "react";
import Home from "./pages/home";
import LoginPage from "./pages/adminLogin";
import { AuthProvider } from "./contexts/authContext";

import { ProtectedRoute } from "./utils/protectedRoute";
import DashboardLayout from "./pages/adminDashboard";
import { JournalsProvider } from "./contexts/journalsContext";
import { EditorsProvider } from "./contexts/editorsContext";
import { GeneralProvider } from "./contexts/generalContext";
import EditorsPage from "./pages/editorsPage";
import JournalPage from "./pages/journalsPage";

function App() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <GeneralProvider>
      <EditorsProvider>
        <JournalsProvider>
          <AuthProvider>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/editors" element={<EditorsPage />} />
              <Route path="/journals" element={<JournalPage />} />
              <Route path="/admin-login" element={<LoginPage />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardLayout />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </AuthProvider>
        </JournalsProvider>
      </EditorsProvider>
    </GeneralProvider>
  );
}

export default App;

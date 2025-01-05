import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import Skeleton from "react-loading-skeleton";
import { useAuth } from "../contexts/authContext";
import EditorsManagement from "../comps/editorsManagement";
import JournalsManagement from "../comps/journalsManagement ";
import GeneralSettings from "../comps/generalSettings";

const DashboardLayout = () => {
  const { logout } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("editors");
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      enqueueSnackbar("Logged out successfully", { variant: "success" });
      navigate("/admin-login");
    } catch (error) {
      enqueueSnackbar("Error logging out", { variant: "error" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900 font-Archivo">
            Admin Dashboard
          </h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white text-sm font-Ubuntu px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="bg-white rounded-lg shadow mb-6">
          <div className="border-b ">
            <nav className="flex">
              <button
                onClick={() => setActiveTab("editors")}
                className={`px-6 py-3 text-sm font-Ubuntu font-medium ${
                  activeTab === "editors"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Editors
              </button>
              <button
                onClick={() => setActiveTab("journals")}
                className={`px-6 py-3 text-sm font-Ubuntu font-medium ${
                  activeTab === "journals"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Journals
              </button>
              <button
                onClick={() => setActiveTab("general")}
                className={`px-6 py-3 text-sm font-Ubuntu font-medium ${
                  activeTab === "general"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                General
              </button>
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow p-6">
          {loading ? (
            <div className="space-y-4">
              <Skeleton height={40} />
              <Skeleton count={5} />
            </div>
          ) : (
            <div>
              {activeTab === "editors" ? (
                <EditorsManagement />
              ) : activeTab === "journals" ? (
                <JournalsManagement />
              ) : (
                <GeneralSettings />
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;

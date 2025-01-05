// generalContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { getFirestore, doc, getDoc } from "firebase/firestore";

const GeneralContext = createContext();

export const GeneralProvider = ({ children }) => {
  const [generalInfo, setGeneralInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const db = getFirestore();
  const settingsRef = doc(db, "settings", "general");

  const fetchGeneralInfo = async () => {
    try {
      const docSnap = await getDoc(settingsRef);
      if (docSnap.exists()) {
        setGeneralInfo(docSnap.data());
      } else {
        setError("General settings not found");
      }
    } catch (err) {
      setError("Failed to fetch general information");
      console.error("Error fetching general info:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGeneralInfo();
  }, []);

  return (
    <GeneralContext.Provider
      value={{
        generalInfo,
        loading,
        error,
        refreshGeneralInfo: fetchGeneralInfo,
      }}
    >
      {children}
    </GeneralContext.Provider>
  );
};

export const useGeneral = () => {
  const context = useContext(GeneralContext);
  if (!context) {
    throw new Error("useGeneral must be used within a GeneralProvider");
  }
  return context;
};

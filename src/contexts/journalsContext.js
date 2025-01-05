// journalsContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const JournalsContext = createContext();

export const JournalsProvider = ({ children }) => {
  const [journals, setJournals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const db = getFirestore();
  const journalsRef = collection(db, "journals");

  const fetchJournals = async () => {
    try {
      const querySnapshot = await getDocs(journalsRef);
      const journalsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setJournals(journalsData);
      setError(null);
    } catch (err) {
      setError("Failed to fetch journals");
      console.error("Error fetching journals:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJournals();
  }, []);

  return (
    <JournalsContext.Provider
      value={{ journals, loading, error, refreshJournals: fetchJournals }}
    >
      {children}
    </JournalsContext.Provider>
  );
};

export const useJournals = () => {
  const context = useContext(JournalsContext);
  if (!context) {
    throw new Error("useJournals must be used within a JournalsProvider");
  }
  return context;
};

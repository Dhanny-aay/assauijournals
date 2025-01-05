// editorsContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import { getFirestore, collection, getDocs } from "firebase/firestore";

const EditorsContext = createContext();

export const EditorsProvider = ({ children }) => {
  const [editors, setEditors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const db = getFirestore();
  const editorsRef = collection(db, "editors");

  const fetchEditors = async () => {
    try {
      const querySnapshot = await getDocs(editorsRef);
      const editorsData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setEditors(editorsData);
      setError(null);
    } catch (err) {
      setError("Failed to fetch editors");
      console.error("Error fetching editors:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEditors();
  }, []);

  return (
    <EditorsContext.Provider
      value={{ editors, loading, error, refreshEditors: fetchEditors }}
    >
      {children}
    </EditorsContext.Provider>
  );
};

export const useEditors = () => {
  const context = useContext(EditorsContext);
  if (!context) {
    throw new Error("useEditors must be used within an EditorsProvider");
  }
  return context;
};

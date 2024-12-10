import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { lightTheme, darkTheme } from "../styles/globalStyles";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [headerFontSize, setHeaderFontSize] = useState(22); // Başlık fontu
  const [bodyFontSize, setBodyFontSize] = useState(14); // Genel yazı fontu

  useEffect(() => {
    const loadSettings = async () => {
      const savedTheme = await AsyncStorage.getItem("theme");
      const savedHeaderFontSize = await AsyncStorage.getItem("headerFontSize");
      const savedBodyFontSize = await AsyncStorage.getItem("bodyFontSize");

      setIsDarkMode(savedTheme === "dark");
      if (savedHeaderFontSize) setHeaderFontSize(parseInt(savedHeaderFontSize, 10));
      if (savedBodyFontSize) setBodyFontSize(parseInt(savedBodyFontSize, 10));
    };
    loadSettings();
  }, []);

  const toggleTheme = async () => {
    const newTheme = !isDarkMode ? "dark" : "light";
    setIsDarkMode(!isDarkMode);
    await AsyncStorage.setItem("theme", newTheme);
  };

  const updateHeaderFontSize = async (size) => {
    setHeaderFontSize(size);
    await AsyncStorage.setItem("headerFontSize", size.toString());
  };

  const updateBodyFontSize = async (size) => {
    setBodyFontSize(size);
    await AsyncStorage.setItem("bodyFontSize", size.toString());
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider
      value={{
        theme,
        isDarkMode,
        headerFontSize,
        bodyFontSize,
        toggleTheme,
        updateHeaderFontSize,
        updateBodyFontSize,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);

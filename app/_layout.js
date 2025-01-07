import React from "react";
import { View, StyleSheet } from "react-native";
import { Slot } from "expo-router"; // Slot'u import ediyoruz
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import { useTheme, ThemeProvider } from "./utils/themeContext";
import { HomeScrollProvider } from "./utils/homeScrollContext";

export default function Layout() {
  return (
    <ThemeProvider>
      <HomeScrollProvider>
        <ThemedLayout />
      </HomeScrollProvider>
    </ThemeProvider>
  );
}

function ThemedLayout() {
  const { theme } = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header />
      </View>

      <View style={styles.content}>
        <Slot />
      </View>

      <View style={styles.navbar}>
        <Navbar />
      </View>
    </View>
  );
}

// Dinamik temaya göre stil oluşturma fonksiyonu
const createStyles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundLight,
    },
    header: {
      height: 60,
      backgroundColor: theme.backgroundLight,
      zIndex: 1,
    },
    content: {
      flex: 1,
      backgroundColor: theme.backgroundContent || theme.backgroundLight,
    },
    navbar: {
      height: 60,
      backgroundColor: theme.backgroundLight,
      zIndex: 1,
    },
  });

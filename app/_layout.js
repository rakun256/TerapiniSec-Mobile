import React, { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { Slot, useRouter } from "expo-router";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import { useTheme, ThemeProvider } from "./utils/themeContext";
import { HomeScrollProvider } from "./utils/homeScrollContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem("userToken");
      setIsAuthenticated(!!token); // State güncellemesi yapılır

      if (!token) {
        router.replace("/login"); // State güncellemesinden sonra yönlendirme yapılır
      }
    };

    checkAuth();
  }, []);

  const styles = createStyles(theme);

  if (isAuthenticated === null) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.accentDark} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Slot her zaman render ediliyor, Header ve Navbar görünürlüğü kontrol ediliyor */}
      <View style={styles.header}>{isAuthenticated && <Header />}</View>
      <View style={styles.content}>
        <Slot />
      </View>
      <View style={styles.navbar}>{isAuthenticated && <Navbar />}</View>
    </View>
  );
}

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
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.backgroundLight,
    },
  });

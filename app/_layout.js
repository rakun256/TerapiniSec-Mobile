import React, { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { Slot, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import LoginScreen from "./login/index";
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
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await AsyncStorage.getItem("userToken");
      setIsAuthenticated(!!token);
    };

    checkAuth();
  }, []);

  const styles = createStyles(theme);

  // Yükleme ekranı (isAuthenticated durumu henüz belli değil)
  if (isAuthenticated === null) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={theme.accentDark} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header ve Navbar sadece giriş yapmış kullanıcılar için görünür */}
      {isAuthenticated && (
        <>
          <View style={styles.header}>
            <Header />
          </View>
          <View style={styles.navbar}>
            <Navbar />
          </View>
        </>
      )}

      {/* Slot her zaman render ediliyor */}
      <View style={styles.content}>
        {isAuthenticated ? <Slot /> : <LoginScreen />}
      </View>
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
      backgroundColor: theme.accentLight,
    },
    content: {
      flex: 1,
      backgroundColor: theme.backgroundContent || theme.backgroundLight,
    },
    navbar: {
      height: 60,
      backgroundColor: theme.accentDark,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.backgroundLight,
    },
  });

import React, { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { Slot, useRouter } from "expo-router"; // Router eklendi
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
      // AsyncStorage'dan token kontrolü yapılıyor
      const token = await AsyncStorage.getItem("userToken");
      setIsAuthenticated(!!token);

      if (!token) {
        router.replace("/login"); // Giriş yapılmamışsa login ekranına yönlendir
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    // Uygulama yüklenirken bekleme göstergesi
    return (
      <View style={[styles.loadingContainer, { backgroundColor: theme.backgroundLight }]}>
        <ActivityIndicator size="large" color={theme.accentDark} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {isAuthenticated && (
        <>
          <View style={styles.header}>
            <Header />
          </View>

          <View style={styles.content}>
            <Slot />
          </View>

          <View style={styles.navbar}>
            <Navbar />
          </View>
        </>
      )}
    </View>
  );
}

// Stil tanımları
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
    },
  });

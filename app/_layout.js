import React, { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator, Text } from "react-native";
import { Slot, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import { ThemeProvider, useTheme } from "./utils/themeContext";
import { HomeScrollProvider } from "./utils/homeScrollContext";

export default function RootLayout() {
  return (
    <ThemeProvider>
      <HomeScrollProvider>
        <AuthenticatedLayout />
      </HomeScrollProvider>
    </ThemeProvider>
  );
}

function AuthenticatedLayout() {
  const router = useRouter();
  const { theme } = useTheme();

  const [isAuthenticated, setIsAuthenticated] = useState(null); 
  const [isLoading, setIsLoading] = useState(true);             
  const [isLayoutMounted, setIsLayoutMounted] = useState(false); 

  useEffect(() => {
    setIsLayoutMounted(true);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        setIsAuthenticated(!!token);
      } catch (error) {
        console.warn("Token okunurken hata oluştu:", error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    if (isLayoutMounted && !isLoading && isAuthenticated === false) {
      router.replace("/login");
    }
  }, [isLayoutMounted, isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <View style={styles(theme).centered}>
        <ActivityIndicator size="large" color={theme.accentDark} />
        <Text style={{ marginTop: 8, color: theme.textDark }}>
          Yükleniyor...
        </Text>
      </View>
    );
  }

  if (isAuthenticated === false) {
    return (
      <View style={styles(theme).centered}>
        <ActivityIndicator size="large" color={theme.accentDark} />
        <Text style={{ marginTop: 8, color: theme.textDark }}>
          Yönlendiriliyor...
        </Text>
      </View>
    );
  }

  return (
    <View style={styles(theme).container}>
      <View style={styles(theme).header}>
        <Header />
      </View>

      <View style={styles(theme).content}>
        <Slot />
      </View>

      <View style={styles(theme).navbar}>
        <Navbar />
      </View>
    </View>
  );
}

const styles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundLight,
    },
    centered: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.backgroundLight,
    },
    header: {
      height: 60,
      backgroundColor: theme.accentLight,
      justifyContent: "center",
      alignItems: "center",
    },
    content: {
      flex: 1,
      backgroundColor: theme.backgroundContent || theme.backgroundLight,
    },
    navbar: {
      height: 60,
      backgroundColor: theme.accentDark,
    },
  });

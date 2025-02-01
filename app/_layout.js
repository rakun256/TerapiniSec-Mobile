import React, { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import { Slot, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
  const router = useRouter();

  // Kullanıcı giriş durumunu ve yüklenme (loading) kontrolünü tutan state’ler
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  // Layout’un ilk kez render edilip edilmediğini (mount durumunu) takip etmek
  const [layoutMounted, setLayoutMounted] = useState(false);

  // Layout bileşeni ilk kez ekrana geldiğinde mount durumunu true’ya çeker
  useEffect(() => {
    setLayoutMounted(true);
  }, []);

  // AsyncStorage içindeki token’ı kontrol ederek giriş durumunu belirliyoruz
  useEffect(() => {
    (async () => {
      const token = await AsyncStorage.getItem("userToken");
      setIsAuthenticated(!!token);
      setIsLoading(false);
    })();
  }, []);

  // Layout mount olduktan ve loading işlemi bittikten sonra, giriş yapılmamışsa login ekranına yönlendir
  useEffect(() => {
    if (layoutMounted && !isLoading && isAuthenticated === false) {
      router.replace("/login");
    }
  }, [layoutMounted, isLoading, isAuthenticated]);

  // Yüklenme aşaması sürerken indikatör göster
  if (isLoading) {
    return (
      <View style={styles(theme).loadingContainer}>
        <ActivityIndicator size="large" color={theme.accentDark} />
      </View>
    );
  }

  // Kullanıcı giriş yapmamış, ancak yönlendirme yapacak effect henüz çalışmadıysa 
  // boş bir ekran döndürerek (null) bekliyoruz
  if (isAuthenticated === false) {
    return null;
  }

  // Kullanıcı giriş yapmışsa, header / navbar / sayfa içerikleri göster
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
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.backgroundLight,
    },
  });

import React, { useEffect, useState, useRef } from "react";
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

  // TypeScript değil, JavaScript kullanıyorsanız <boolean | null> gibi tipleri kaldırın
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Bileşenin mount durumunu takip etmek için ref:
  const isMountedRef = useRef(false);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        if (isMountedRef.current) {
          // !!token, token varsa true, yoksa false yapar
          setIsAuthenticated(!!token);
          setIsLoading(false);
        }
      } catch (error) {
        console.warn("Token okunurken hata oluştu:", error);
        if (isMountedRef.current) {
          setIsAuthenticated(false);
          setIsLoading(false);
        }
      }
    })();
  }, []);

  // Eğer hâlâ token'ı kontrol ediyorsak yüklenme ekranı göster
  if (isLoading) {
    return (
      <View style={styles(theme).loadingContainer}>
        <ActivityIndicator size="large" color={theme.accentDark} />
      </View>
    );
  }

  // Giriş yapılmadıysa, yönlendirmeyi ilk render sonrası useEffect’te yaptığımız için
  // burada null dönüyoruz ki "navigate before mount" hatası çıkmasın
  if (!isAuthenticated) {
    return null;
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

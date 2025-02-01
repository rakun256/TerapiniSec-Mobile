import React, { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator, Text } from "react-native";
import { Slot, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Örnek: Kendi Header ve Navbar bileşenlerinizi import edin
import Header from "./components/Header";
import Navbar from "./components/Navbar";

// Tema context'inizi ve diğer provider'larınızı import edin
import { ThemeProvider, useTheme } from "./utils/themeContext";
import { HomeScrollProvider } from "./utils/homeScrollContext";

// RootLayout, ThemeProvider ve diğer sağlayıcıları sarmalar:
export default function RootLayout() {
  return (
    <ThemeProvider>
      <HomeScrollProvider>
        <AuthenticatedLayout />
      </HomeScrollProvider>
    </ThemeProvider>
  );
}

/**
 * Ana layout bileşeni: Giriş yapılıp yapılmadığına göre
 * /login'e yönlendirir veya (Header, Navbar, Slot) içeriklerini gösterir.
 */
function AuthenticatedLayout() {
  const router = useRouter();
  const { theme } = useTheme();

  // Kullanıcının giriş yapıp yapmadığı
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  // AsyncStorage'den token okurken kullanılan loading durumu
  const [isLoading, setIsLoading] = useState(true);

  // Uygulama açılırken token kontrolü yapıyoruz
  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        setIsAuthenticated(!!token); // token varsa true, yoksa false
      } catch (error) {
        console.warn("Token okunurken hata oluştu:", error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };
    checkToken();
  }, []);

  /**
   * isLoading biter bitmez ve kullanıcı giriş yapmamışsa,
   * yönlendirmeyi `useEffect` içinde yapıyoruz. 
   * Ek olarak `setTimeout(..., 0)` hilesi, Layout’un gerçekten 
   * mount olmasını bekler ve “Attempted to navigate...” hatasını engeller.
   */
  useEffect(() => {
    if (!isLoading && isAuthenticated === false) {
      setTimeout(() => {
        router.replace("/login");
      }, 0);
    }
  }, [isLoading, isAuthenticated, router]);

  // 1) Token okunuyor, yüklenme sürüyor
  if (isLoading) {
    return (
      <View style={styles(theme).centered}>
        <ActivityIndicator size="large" color={theme.accentDark} />
        <Text style={{ marginTop: 8, color: theme.textDark }}>Yükleniyor...</Text>
      </View>
    );
  }

  // 2) Kullanıcı giriş yapmamışsa, yönlendirmeye kadar geçici bir ekran
  // (çok kısa bir an görünebilir)
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

  // 3) Kullanıcı giriş yapmışsa normal layout'u göster
  return (
    <View style={styles(theme).container}>
      <View style={styles(theme).header}>
        <Header />
      </View>

      <View style={styles(theme).content}>
        {/* Slot, Expo Router’daki alt sayfaların içeriğini temsil eder */}
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

import React, { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator, Text } from "react-native";
import { Slot, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Örneğin projenizde bu bileşenler "app/components/" klasöründe:
import Header from "./components/Header";
import Navbar from "./components/Navbar";

// Tema ve diğer provider'ları projenizde "app/utils/" veya başka klasörden import edebilirsiniz.
import { ThemeProvider, useTheme } from "./utils/themeContext";
import { HomeScrollProvider } from "./utils/homeScrollContext";

/**
 * RootLayout: En üst düzey sarmalayıcı.
 * Expo Router V2'de `app/_layout.js` şeklinde konumlandırılmışsa "root layout" olarak kabul edilir.
 */
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
 * AuthenticatedLayout:
 * - Token (userToken) var mı yok mu kontrol eder
 * - Giriş yoksa /login sayfasına yönlendirir
 * - Giriş varsa Header, Slot, Navbar içeren asıl layout'u gösterir
 */
function AuthenticatedLayout() {
  const router = useRouter();
  const { theme } = useTheme();

  const [isAuthenticated, setIsAuthenticated] = useState(null); // Kullanıcı giriş yapmış mı?
  const [isLoading, setIsLoading] = useState(true);             // Token kontrolü sürerken
  const [isLayoutMounted, setIsLayoutMounted] = useState(false); // Layout tam mount oldu mu?

  // Layout ilk kez ekrana geldiğinde "monte" olduğunu işaretle
  useEffect(() => {
    setIsLayoutMounted(true);
  }, []);

  // AsyncStorage'den token (userToken) var mı yok mu kontrol et
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

  /**
   * isLoading biter ve isAuthenticated === false ise,
   * ayrıca layout da tamamen monte olmuşsa => /login sayfasına git
   * Bu yönlendirmeyi useEffect içinde yaparak
   * "Attempted to navigate before mounting the Root Layout component" hatasını engelliyoruz.
   */
  useEffect(() => {
    if (isLayoutMounted && !isLoading && isAuthenticated === false) {
      router.replace("/login");
    }
  }, [isLayoutMounted, isLoading, isAuthenticated, router]);

  // 1) Token kontrolü sürerken ekrana "yükleniyor" göstergesi
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

  // 2) Giriş yoksa (isAuthenticated === false), yönlendirme effect'i çalışana kadar
  // kısa bir indikatör gösteriyoruz
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

  // 3) Kullanıcı giriş yapmışsa (token varsa), normal layout'u göster
  return (
    <View style={styles(theme).container}>
      <View style={styles(theme).header}>
        <Header />
      </View>

      <View style={styles(theme).content}>
        {/* Slot => Expo Router’da alt sayfaların içeriğini temsil eder */}
        <Slot />
      </View>

      <View style={styles(theme).navbar}>
        <Navbar />
      </View>
    </View>
  );
}

/**
 * Tema üzerinden dinamik stiller oluşturmak isteyen bir helper fonksiyon.
 * (Kodunuzu sadeleştirmek için "theme"yi doğrudan kullanabilirsiniz.)
 */
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

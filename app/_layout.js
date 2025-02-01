import React, { useEffect, useState, useRef } from "react";
import { View, StyleSheet, ActivityIndicator, Text } from "react-native";
import { Slot, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Örnek: Kendi Header ve Navbar bileşenlerinizi import edin
import Header from "./components/Header";
import Navbar from "./components/Navbar";

// Tema context'inizi ve diğer provider'larınızı import edin
import { ThemeProvider, useTheme } from "./utils/themeContext";
import { HomeScrollProvider } from "./utils/homeScrollContext";

export default function RootLayout() {
  return (
    // Burada istediğiniz sayıda provider sarmalayıcısını ekleyebilirsiniz
    <ThemeProvider>
      <HomeScrollProvider>
        <AuthenticatedLayout />
      </HomeScrollProvider>
    </ThemeProvider>
  );
}

/**
 * Ana layout bileşeni: Giriş yapılıp yapılmadığına göre
 * /login'e yönlendirir veya içerikleri (Header, Navbar vs.) gösterir.
 */
function AuthenticatedLayout() {
  const { theme } = useTheme();
  const router = useRouter();

  // Kullanıcının giriş yapıp yapmadığı
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  // Token kontrolü devam ediyor mu?
  const [isLoading, setIsLoading] = useState(true);

  // Layout’un ekrana tamamen yerleşip yerleşmediğini takip etmek için ref
  const isMountedRef = useRef(false);

  // İlk render (mount) anında ref'i true yap, unmount'ta false
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  /**
   * AsyncStorage’den “userToken” bilgisini alarak giriş durumunu belirliyoruz.
   * İşlem bitince isLoading = false yaparak loading'i kapatıyoruz.
   */
  useEffect(() => {
    (async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        if (isMountedRef.current) {
          setIsAuthenticated(!!token); // token varsa true, yoksa false
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

  /**
   * Kullanıcı giriş yapmamışsa (isAuthenticated = false),
   * ve layout tamamen yüklenmişse, /login ekranına yönlendiriyoruz.
   * Bunu useEffect içinde yaparak “henüz mount olmadan navigate” hatasını önlüyoruz.
   */
  useEffect(() => {
    if (!isLoading && isAuthenticated === false && isMountedRef.current) {
      router.replace("/login");
    }
  }, [isLoading, isAuthenticated]);

  // 1) Yüklenme (token kontrolü) sürerken ekrana loading göstergesi
  if (isLoading) {
    return (
      <View style={styles(theme).centered}>
        <ActivityIndicator size="large" color={theme.accentDark} />
        <Text style={{ color: theme.textDark, marginTop: 8 }}>
          Yükleniyor...
        </Text>
      </View>
    );
  }

  // 2) Token yoksa, yönlendirme effect'i çalışana kadar kısa bir bekleme ekranı
  if (isAuthenticated === false) {
    return (
      <View style={styles(theme).centered}>
        <ActivityIndicator size="large" color={theme.accentDark} />
        <Text style={{ color: theme.textDark, marginTop: 8 }}>
          Yönlendiriliyor...
        </Text>
      </View>
    );
  }

  // 3) Kullanıcı giriş yapmışsa (isAuthenticated = true), normal layout'u göster
  return (
    <View style={styles(theme).container}>
      {/* HEADER */}
      <View style={styles(theme).header}>
        <Header />
      </View>

      {/* ANA İÇERİK */}
      <View style={styles(theme).content}>
        {/* Slot, Expo Router'daki alt sayfaların içeriğini temsil eder */}
        <Slot />
      </View>

      {/* NAVBAR */}
      <View style={styles(theme).navbar}>
        <Navbar />
      </View>
    </View>
  );
}

/**
 * Temel stiller
 * "theme" objesi, themeContext içindeki light/dark renkleri vb. içerir
 */
const styles = (theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.backgroundLight,
    },
    centered: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
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

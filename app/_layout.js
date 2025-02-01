import React, { useEffect, useState, useRef } from "react";
import { View, StyleSheet, ActivityIndicator, Text } from "react-native";
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

  // Kullanıcının giriş yapıp yapmadığını tutan state.
  // JavaScript dosyasında tip parametresi (`<boolean>`) kullanmayın.
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  // Token kontrolü yapılırken yüklenme durumunu takip ediyoruz.
  const [isLoading, setIsLoading] = useState(true);

  // Layout’un gerçekten "monte" olup olmadığını izlemek için ref.
  const isMountedRef = useRef(false);

  // Layout ilk yüklendiğinde ref’i true yapıyoruz, unmount olduğunda false.
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // AsyncStorage’den token değerini okuyup isAuthenticated değeri atıyoruz.
  useEffect(() => {
    (async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        // Bileşen hala ekrandayken setState yapalım:
        if (isMountedRef.current) {
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

  // Eğer token yoksa ve artık mount tamamlanmışsa login sayfasına yönlendiriyoruz
  // Bu işlemi useEffect içinde yaptığımız için “henüz Layout yüklenmeden navigate” hatası oluşmaz.
  useEffect(() => {
    if (!isLoading && isAuthenticated === false && isMountedRef.current) {
      router.replace("/login");
    }
  }, [isLoading, isAuthenticated]);

  // Token kontrolü devam ediyorsa yüklenme ekranı
  if (isLoading) {
    return (
      <View style={styles(theme).loadingContainer}>
        <ActivityIndicator size="large" color={theme.accentDark} />
      </View>
    );
  }

  /**
   * isLoading false olduğu halde isAuthenticated === false ise
   * yönlendirme effect'i çalışana kadar çok kısa süreli bir boş ekran yerine 
   * küçük bir “Yönlendiriliyor...” göstergesi döndürüyoruz.
   */
  if (!isAuthenticated) {
    return (
      <View style={styles(theme).loadingContainer}>
        <ActivityIndicator size="large" color={theme.accentDark} />
        <Text style={{ color: theme.textDark, marginTop: 8 }}>
          Yönlendiriliyor...
        </Text>
      </View>
    );
  }

  // Kullanıcı giriş yapmışsa normal layout'u döndür
  return (
    <View style={styles(theme).container}>
      <View style={styles(theme).header}>
        <Header />
      </View>

      <View style={styles(theme).content}>
        {/* Slot, her sayfaya göre değişen içeriği render ediyor */}
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

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

  // Kullanıcının giriş yapıp yapmadığını tutan state
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  // Token kontrolü sırasında loading göstermek için
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Bu ref, bileşenin gerçekten "monte" (mount) olup olmadığını izlemek için.
   * Bazı durumlarda bileşen henüz tam mount olmadan render fazında 
   * router.replace() gibi işlemler yapmak hata verebiliyor.
   */
  const isMountedRef = useRef(false);

  /**
   * İlk render tamamlandığında (mount gerçekleştiğinde) isMountedRef.current = true yapıyoruz.
   */
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  /**
   * AsyncStorage içindeki userToken'i kontrol edip "isAuthenticated" değerini set ediyoruz.
   * İşlem bitince isLoading=false yaparak bekleme ekranını (ActivityIndicator) kapatıyoruz.
   */
  useEffect(() => {
    (async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
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

  /**
   * Kullanıcı login değilse, Layout tamamen mount olduktan sonra
   * "/login" sayfasına yönlendirme yapıyoruz.
   * Bunu useEffect içinde yaparak, “ilk render sırasında” yönlendirme yapılmamasını sağlıyoruz.
   */
  useEffect(() => {
    if (!isLoading && isAuthenticated === false && isMountedRef.current) {
      router.replace("/login");
    }
  }, [isLoading, isAuthenticated]);

  // Token kontrolü sürerken loading göstermek
  if (isLoading) {
    return (
      <View style={styles(theme).loadingContainer}>
        <ActivityIndicator size="large" color={theme.accentDark} />
      </View>
    );
  }

  /**
   * Eğer kullanıcı auth değilse, yönlendirme effect’inin tetiklenmesini bekliyoruz.
   * Boş bir ekran döndürüyoruz (return null).
   * Eğer burada direkt `router.replace(...)` yaparsanız yine uyarı alabilirsiniz,
   * bu yüzden yönlendirmeyi yukarıdaki useEffect’te kontrol ettik.
   */
  if (!isAuthenticated) {
    return null;
  }

  /**
   * Kullanıcı giriş yapmışsa normal Layout'u (Header, Slot, Navbar) döndürüyoruz.
   */
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

import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import { useTheme } from "../utils/themeContext";
import { useRouter } from "expo-router";
import { logout } from "../utils/loginService";

export default function SettingsScreen() {
  const {
    theme,
    isDarkMode,
    headerFontSize,
    bodyFontSize,
    toggleTheme,
    updateHeaderFontSize,
    updateBodyFontSize,
  } = useTheme();

  const router = useRouter();

  const increaseHeaderFontSize = () => {
    if (headerFontSize < 36) updateHeaderFontSize(headerFontSize + 2);
  };

  const decreaseHeaderFontSize = () => {
    if (headerFontSize > 18) updateHeaderFontSize(headerFontSize - 2);
  };

  const increaseBodyFontSize = () => {
    if (bodyFontSize < 24) updateBodyFontSize(bodyFontSize + 2);
  };

  const decreaseBodyFontSize = () => {
    if (bodyFontSize > 12) updateBodyFontSize(bodyFontSize - 2);
  };

  const handleLogout = async () => {
    try {
      await logout(); // Kullanıcı oturumunu sonlandır
      Alert.alert("Çıkış Yapıldı", "Başarıyla çıkış yaptınız.");
      router.replace("/login"); // Login ekranına yönlendirme
    } catch (error) {
      Alert.alert("Çıkış Hatası", error.message);
    }
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.backgroundLight }]}
    >
      <Text
        style={[
          styles.header,
          { color: theme.textDark, fontSize: headerFontSize },
        ]}
      >
        Ayarlar
      </Text>

      {/* Tema Ayarları */}
      <View style={styles.section}>
        <Text
          style={[
            styles.sectionHeader,
            { color: theme.textDark, fontSize: bodyFontSize },
          ]}
        >
          Tema Ayarları
        </Text>
        <View
          style={[styles.settingItem, { backgroundColor: theme.accentLight }]}
        >
          <Text
            style={[
              styles.settingText,
              { color: theme.textDark, fontSize: bodyFontSize },
            ]}
          >
            Karanlık Mod
          </Text>
          <Switch
            trackColor={{ false: theme.accentDark, true: theme.accentLight }}
            thumbColor={isDarkMode ? theme.textDark : theme.textLight}
            onValueChange={toggleTheme}
            value={isDarkMode}
          />
        </View>
      </View>

      {/* Yazı Boyutu Ayarları */}
      <View style={styles.section}>
        <Text
          style={[
            styles.sectionHeader,
            { color: theme.textDark, fontSize: bodyFontSize },
          ]}
        >
          Başlık Yazı Boyutu
        </Text>
        <View
          style={[
            styles.fontSizeControlBar,
            { backgroundColor: theme.accentLight },
          ]}
        >
          <TouchableOpacity
            onPress={decreaseHeaderFontSize}
            style={[
              styles.fontSizeControlButton,
              { backgroundColor: theme.accentDark },
            ]}
          >
            <Text
              style={[styles.fontSizeControlText, { color: theme.textLight }]}
            >
              -
            </Text>
          </TouchableOpacity>
          <Text style={[styles.fontSizeValue, { color: theme.textDark }]}>
            {headerFontSize}pt
          </Text>
          <TouchableOpacity
            onPress={increaseHeaderFontSize}
            style={[
              styles.fontSizeControlButton,
              { backgroundColor: theme.accentDark },
            ]}
          >
            <Text
              style={[styles.fontSizeControlText, { color: theme.textLight }]}
            >
              +
            </Text>
          </TouchableOpacity>
        </View>

        <Text
          style={[
            styles.sectionHeader,
            { color: theme.textDark, fontSize: bodyFontSize },
          ]}
        >
          Genel Yazı Boyutu
        </Text>
        <View
          style={[
            styles.fontSizeControlBar,
            { backgroundColor: theme.accentLight },
          ]}
        >
          <TouchableOpacity
            onPress={decreaseBodyFontSize}
            style={[
              styles.fontSizeControlButton,
              { backgroundColor: theme.accentDark },
            ]}
          >
            <Text
              style={[styles.fontSizeControlText, { color: theme.textLight }]}
            >
              -
            </Text>
          </TouchableOpacity>
          <Text style={[styles.fontSizeValue, { color: theme.textDark }]}>
            {bodyFontSize}pt
          </Text>
          <TouchableOpacity
            onPress={increaseBodyFontSize}
            style={[
              styles.fontSizeControlButton,
              { backgroundColor: theme.accentDark },
            ]}
          >
            <Text
              style={[styles.fontSizeControlText, { color: theme.textLight }]}
            >
              +
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Çıkış Yap Butonu */}
      <View style={styles.section}>
        <TouchableOpacity
          style={[styles.logoutButton, { backgroundColor: theme.accentDark }]}
          onPress={handleLogout}
        >
          <Text style={[styles.logoutButtonText, { color: theme.textLight }]}>
            Çıkış Yap
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  header: { fontWeight: "bold", marginBottom: 20 },
  section: { marginBottom: 30 },
  sectionHeader: { fontWeight: "bold", marginBottom: 10, marginTop: 20 },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
  },
  fontSizeControlBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  fontSizeControlButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  fontSizeControlText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  fontSizeValue: {
    fontSize: 18,
    fontWeight: "bold",
  },
  logoutButton: {
    padding: 15,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  logoutButtonText: {
    fontWeight: "bold",
    fontSize: 16,
  },
});

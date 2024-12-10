import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faComment,
  faMagnifyingGlass,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../utils/themeContext";

export default function Navbar() {
  const router = useRouter();
  const { theme } = useTheme();

  const styles = createStyles(theme);

  return (
    <View style={styles.navbar}>
      <TouchableOpacity style={styles.navItem} onPress={() => router.replace("/")}>
        <FontAwesomeIcon icon={faHouse} size={24} style={styles.iconStyle} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => router.push("/screens/AboutPage")}
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} size={24} style={styles.iconStyle} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => router.push("/screens/SettingsPage")}
      >
        <FontAwesomeIcon icon={faComment} size={24} style={styles.iconStyle} />
      </TouchableOpacity>
    </View>
  );
}

const createStyles = (theme) =>
  StyleSheet.create({
    navbar: {
      height: 60,
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      backgroundColor: theme.backgroundLight,
    },
    navItem: {
      fontSize: 16,
    },
    iconStyle: {
      color: theme.textDark,
    },
  });

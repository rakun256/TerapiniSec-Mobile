import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faGear, faUser } from "@fortawesome/free-solid-svg-icons";
import { useTheme } from "../utils/themeContext";

export default function Header() {
  const router = useRouter();
  const { theme , headerFontSize , bodyFontSize } = useTheme();

  const styles = createStyles(theme , headerFontSize , bodyFontSize);

  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.navItemSettings}
        onPress={() => router.push("/settings")}
      >
        <FontAwesomeIcon icon={faGear} size={24} style={styles.iconStyle} />
      </TouchableOpacity>

      <Text style={styles.headerText}>TerapiniSec</Text>

      <TouchableOpacity
        style={styles.navItemUser}
        onPress={() => router.push("/screens/AboutPage")}
      >
        <FontAwesomeIcon icon={faUser} size={24} style={styles.iconStyle} />
      </TouchableOpacity>
    </View>
  );
}

const createStyles = (theme , headerFontSize , bodyFontSize) =>
  StyleSheet.create({
    header: {
      display: "flex",
      width: "100%",
      flexDirection: "row",
      height: 60,
      backgroundColor: theme.backgroundLight,
      justifyContent: "center",
      alignItems: "center",
    },
    headerText: {
      color: theme.textDark,
      fontSize: headerFontSize,
      fontWeight: "bold",
    },
    navItemUser: {
      position: "absolute",
      right: 20,
    },
    navItemSettings: {
      position: "absolute",
      left: 20,
    },
    iconStyle: {
      color: theme.textDark,
    },
  });

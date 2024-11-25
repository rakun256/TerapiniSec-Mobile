import { Link } from "expo-router";
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faGear, faUser } from "@fortawesome/free-solid-svg-icons";
import colors from "../styles/globalStyles";

export default function Header() {
  return (
    <View style={styles.header}>
      <Link href="/screens/AboutPage" style={styles.navItemSettings}>
      <FontAwesomeIcon icon={faGear} size={24} style={styles.navItemSettings} />
      </Link>
      <Text style={styles.headerText}>TerapiniSec</Text>
      <Link href="/screens/AboutPage" style={styles.navItemUser}>
      <FontAwesomeIcon icon={faUser} size={24} style={styles.navItemUser} />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    margin: "auto",
    display: "flex",
    width: "100%",
    justifyItems: "around",
    flexDirection: "row",
    height: 60,
    backgroundColor: colors.backgroundLight,
    justifyContent: "center",
    alignItems: "center",
  },
  headerText: {
    color: colors.textDark,
    fontSize: 20,
    fontWeight: "bold",
  },
  navItemUser: {
    position: "absolute",
    color: colors.textDark,
    right: 20,
  },
  navItemSettings: {
    position: "absolute",
    color: colors.textDark,
    left: 20,
  },
});

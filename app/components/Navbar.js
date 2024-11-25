import React from "react";
import { View, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faGear, faComment, faMagnifyingGlass, faHouse } from "@fortawesome/free-solid-svg-icons";
import colors from "../styles/globalStyles";

export default function Navbar() {
  return (
    <View style={styles.navbar}>
      <Link href="/" style={styles.navItem}>
        <FontAwesomeIcon icon={faHouse} size={24} />
      </Link>

      <Link href="/screens/AboutPage" style={styles.navItem}>
      <FontAwesomeIcon icon={faMagnifyingGlass} size={24} />
      </Link>

      <Link href="/screens/SettingsPage" style={styles.navItem}>
      <FontAwesomeIcon icon={faComment} size={24} />
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    height: 60,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: colors.backgroundLight,
  },
  navItem: {
    fontSize: 16,
    color: colors.textDark,
  },
});

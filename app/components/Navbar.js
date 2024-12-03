import React from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faComment,
  faMagnifyingGlass,
  faHouse,
} from "@fortawesome/free-solid-svg-icons";
import colors from "../styles/globalStyles";

export default function Navbar() {
  const router = useRouter();

  const navigateToHome = () => {
    if (router.pathname !== "/") {
      router.replace("/");
    }
  };

  return (
    <View style={styles.navbar}>
      <TouchableOpacity style={styles.navItem} onPress={navigateToHome}>
        <FontAwesomeIcon icon={faHouse} size={24} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => router.push("/screens/AboutPage")}
      >
        <FontAwesomeIcon icon={faMagnifyingGlass} size={24} />
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.navItem}
        onPress={() => router.push("/screens/SettingsPage")}
      >
        <FontAwesomeIcon icon={faComment} size={24} />
      </TouchableOpacity>
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

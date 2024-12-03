import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faGear, faUser } from "@fortawesome/free-solid-svg-icons";
import colors from "../styles/globalStyles";

export default function Header() {
  const router = useRouter();

  return (
    <View style={styles.header}>
      {/* Ayarlar Butonu */}
      <TouchableOpacity
        style={styles.navItemSettings}
        onPress={() => router.push("/screens/AboutPage")}
      >
        <FontAwesomeIcon icon={faGear} size={24} style={styles.iconStyle} />
      </TouchableOpacity>

      {/* Başlık */}
      <Text style={styles.headerText}>TerapiniSec</Text>

      {/* Kullanıcı Butonu */}
      <TouchableOpacity
        style={styles.navItemUser}
        onPress={() => router.push("/screens/AboutPage")}
      >
        <FontAwesomeIcon icon={faUser} size={24} style={styles.iconStyle} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    margin: "auto",
    display: "flex",
    width: "100%",
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
    right: 20,
  },
  navItemSettings: {
    position: "absolute",
    left: 20,
  },
  iconStyle: {
    color: colors.textDark,
  },
});

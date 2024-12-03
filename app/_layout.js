import { View, StyleSheet } from "react-native";
import { Slot } from "expo-router"; // Slot'u import ediyoruz
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import colors from "./styles/globalStyles";

export default function Layout() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Header />
      </View>

      <View style={styles.content}>
        <Slot /> 
      </View>

      <View style={styles.navbar}>
        <Navbar />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundLight,
  },
  header: {
    height: 60,
    backgroundColor: colors.backgroundLight,
    zIndex: 1,
  },
  content: {
    flex: 1,
    backgroundColor: colors.backgroundContent,
  },
  navbar: {
    height: 60,
    backgroundColor: colors.backgroundLight,
    zIndex: 1,
  },
});

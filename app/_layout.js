import { Stack } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import Header from './components/Header';
import Navbar from './components/Navbar';
import colors from './styles/globalStyles';

export default function Layout() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Header />
      </View>

      {/* İçerik (Slot) */}
      <View style={styles.content}>
        <Stack
          screenOptions={{
            headerShown: false, // Özel Header kullanıldığı için varsayılan header'ı gizle
            animation: 'slide_from_right', // Geçiş animasyonu türü
          }}
        />
      </View>

      {/* Navbar */}
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
    zIndex: 1, // Üstte sabit kalması için
  },
  content: {
    flex: 1,
    backgroundColor: colors.backgroundContent,
  },
  navbar: {
    height: 60,
    backgroundColor: colors.backgroundLight,
    zIndex: 1, // Altta sabit kalması için
  },
});

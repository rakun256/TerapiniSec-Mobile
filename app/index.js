import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import colors from "./styles/globalStyles";
import { Link } from "expo-router";

export default function HomePage() {
  const tasks = [
    { id: "1", icon: "😀", text: "Complete your daily mood check-in" },
    { id: "2", icon: "📖", text: "Read about the benefits of journaling" },
    { id: "3", icon: "💡", text: "Learn about the power of gratitude" },
    { id: "4", icon: "⏰", text: "Set a reminder to practice mindfulness" },
  ];

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* Görsel ve Karşılama Mesajı */}
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={require("../assets/images/app-landing-image.png")}
          resizeMode="cover"
        />
        <View style={styles.overlay}>
          <View style={styles.overlayTexts}>
            <Text style={styles.greetingText}>Good morning, how are you feeling?</Text>
            <Text style={styles.subText}>We have a few tasks for you today.</Text>
          </View>
        </View>
      </View>


      {/* Görev Listesi */}
      <View style={styles.taskSection}>
        <Text style={styles.taskHeader}>Today's Tasks</Text>
        {tasks.map((task) => (
          <View key={task.id} style={styles.taskItem}>
            <Text style={styles.taskIcon}>{task.icon}</Text>
            <Text style={styles.taskText}>{task.text}</Text>
          </View>
        ))}
      </View>

      {/* Günlük Mood Yönlendiricisi */}
      <View style={styles.moodTrackerSection}>
        <Text style={styles.moodTrackerHeader}>Track Your Mood  📝</Text>
        <Link  href="/mood-tracker" style={styles.moodTrackerButton}>
          <Text style={styles.moodTrackerButtonText}>Go to Mood Tracker</Text>
        </Link>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1, 
  },
  imageContainer: {
    position: "relative", 
    width: "100%",
    height: 500, 
    overflow: "hidden", 
  },
  image: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute", // Overlay'in görsel üzerine çıkmasını sağlar
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.4)", // Görsel üzerine yarı şeffaf bir arka plan
  },
  overlayTexts: {
    position: "absolute",
    textAlign: "left",
    left: 20,
    bottom: 10, 
  },
  greetingText: {
    fontSize: 36,
    width: "50%",
    fontWeight: "bold",
    color: "#fff", 
    marginBottom: 5,
  },
  subText: {
    fontSize: 20,
    color: "#fff",
  },
  taskSection: {
    padding: 20,
    backgroundColor: colors.backgroundLight, // Görevlerin bulunduğu alanın arka planı
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -20, // Görsel ile içerik arasında geçiş
  },
  taskHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.textDark,
    marginBottom: 10,
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: colors.accentLight,
    borderRadius: 5,
  },
  taskIcon: {
    fontSize: 24,
    marginRight: 15,
  },
  taskText: {
    fontSize: 16,
    color: colors.textDark,
  },
  
  moodTrackerSection: {
    backgroundColor: colors.accentLight,
    padding: 20,
    margin: 20,
    borderRadius: 10,
  },
  moodTrackerHeader: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.textDark,
    marginBottom: 10,
    textAlign: "center",
  },
  moodTrackerButton: {
    backgroundColor: colors.accentDark,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  moodTrackerButtonText: {
    color: colors.textDark,
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
  },
});

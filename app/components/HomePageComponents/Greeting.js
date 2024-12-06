import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

export default function Greeting() {
  return (
    <View style={styles.imageContainer}>
      <Image
        style={styles.image}
        source={require("../../../assets/images/app-landing-image.png")}
        resizeMode="cover"
      />
      <View style={styles.overlay}>
        <View style={styles.overlayTexts}>
          <Text style={styles.greetingText}>
            Günaydın, kendizinizi nasıl hissediyorsunuz?
          </Text>
          <Text style={styles.subText}>
            Sizin için birkaç görevimiz var.
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
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
});

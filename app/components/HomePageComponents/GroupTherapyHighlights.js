import React from "react";
import { View, Text, StyleSheet, Dimensions, FlatList, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import groupTherapiesData from "../../utils/data/groupTherapiesData";
import { useTheme } from "../../utils/themeContext";

const { width } = Dimensions.get("window");

export default function GroupTherapyFlatList() {
  const router = useRouter();
  const { theme,headerFontSize , bodyFontSize } = useTheme();
  const styles = createStyles(theme,headerFontSize , bodyFontSize);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardDate}>
        {item.date} tarihinde, saat {item.time}
      </Text>
      <Text style={styles.cardDescription}>{item.description}</Text>
      <TouchableOpacity
        style={styles.detailButton}
        onPress={() => router.push(`/grouptherapy-detail/${item.id}`)}
      >
        <Text style={styles.detailButtonText}>Detayları Gör</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Yaklaşan Grup Terapileri</Text>
      <FlatList
        data={groupTherapiesData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.flatListContainer}
        snapToInterval={width * 0.8 + 15}
        decelerationRate="fast"
        snapToAlignment="start"
        overScrollMode="never"
      />
    </View>
  );
}

const createStyles = (theme,headerFontSize , bodyFontSize) =>
  StyleSheet.create({
    container: {
      padding: 20,
      backgroundColor: theme.backgroundLight,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      marginTop: 20,
    },
    header: {
      fontSize: headerFontSize,
      fontWeight: "bold",
      color: theme.textDark,
      marginBottom: 15,
    },
    flatListContainer: {
      paddingLeft: 10,
    },
    card: {
      backgroundColor: theme.accentLight,
      padding: 20,
      borderRadius: 10,
      marginRight: 15,
      width: width * 0.8,
    },
    cardTitle: {
      fontSize: headerFontSize - 1,
      fontWeight: "bold",
      color: theme.textDark,
      marginBottom: 10,
    },
    cardDate: {
      fontSize: bodyFontSize - 2,
      color: theme.textDark,
      marginBottom: 5,
    },
    cardDescription: {
      fontSize: bodyFontSize - 2,
      color: theme.textDark,
      marginBottom: 15,
    },
    detailButton: {
      backgroundColor: theme.accentDark,
      paddingVertical: 10,
      borderRadius: 10,
      alignItems: "center",
    },
    detailButtonText: {
      color: theme.textDark,
      fontWeight: "bold",
      fontSize: bodyFontSize,
    },
  });

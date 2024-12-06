import React from "react";
import { View, Text, StyleSheet, Dimensions, FlatList, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import groupTherapiesData from "../../utils/data/groupTherapiesData"; 
import colors from "../../styles/globalStyles";

const { width } = Dimensions.get("window");

export default function GroupTherapyFlatList() {
  const router = useRouter();

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardDate}>
        {item.date} tarihinde, saat {item.time}
      </Text>
      <Text style={styles.cardDescription}>{item.description}</Text>
      <TouchableOpacity
        style={styles.detailButton}
        onPress={() => router.push(`/GroupTherapyDetailScreen?id=${item.id}`)}
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

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: colors.backgroundLight,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: colors.textDark,
    marginBottom: 15,
  },
  flatListContainer: {
    paddingLeft: 10,
  },
  card: {
    backgroundColor: colors.accentLight,
    padding: 20,
    borderRadius: 10,
    marginRight: 15,
    width: width * 0.8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.textDark,
    marginBottom: 10,
  },
  cardDate: {
    fontSize: 14,
    color: colors.textDark,
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: colors.textDark,
    marginBottom: 15,
  },
  detailButton: {
    backgroundColor: colors.accentDark,
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
  },
  detailButtonText: {
    color: colors.textDark,
    fontWeight: "bold",
    fontSize: 16,
  },
});

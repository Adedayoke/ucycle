import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import React from "react";
import GradientBg from "@/components/GradientBg";
import { StatusBar } from "expo-status-bar";

const users = [
  { id: '1', name: 'IDRIS', points: 10000, image: require('@/assets/Idris.jpg') },
  { id: '2', name: 'Habeeb', points: 12500, image: require('@/assets/Idris.jpg') },
  { id: '3', name: 'Habeeb', points: 12500, image: require('@/assets/Idris.jpg') },
  { id: '4', name: 'Habeeb', points: 12500, image: require('@/assets/Idris.jpg') },
  { id: '5', name: 'Habeeb', points: 12500, image: require('@/assets/Idris.jpg') },
];
export default function Leaderboard() {
  return (
    <GradientBg>
      <StatusBar style="light" backgroundColor="transparent" />
      <Text style={styles.title}>🏆 Leaderboard</Text>
      <View style={styles.containerm}>
            <Text style={styles.pointsm}>UCY 10.0K</Text>
            <Image source={require('@/assets/Idris.jpg')} style={styles.avatarm} />
            <Text style={styles.namem}>IDRIS</Text>
          </View>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item, index }) => (
          <View style={styles.item}>
            <Text style={styles.rank}>{index + 1}.</Text>
            <Image source={item.image} style={styles.avatar} />
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.points}>UCY {item.points}</Text>
          </View>
        )}
      />
    </GradientBg>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 50,
    marginBottom: 20,
    alignSelf: "center",
  },
  list: {
    paddingHorizontal: 20,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomColor: "rgba(255,255,255,0.1)",
    borderBottomWidth: 1,
  },
  rank: {
    fontSize: 16,
    color: "#fff",
    width: 30,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  name: {
    flex: 1,
    fontSize: 16,
    color: "#fff",
  },
  points: {
    fontSize: 14,
    color: "#FFD700",
    fontWeight: "bold",
  },
  containerm: {
    flexDirection: "column",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomColor: "rgba(255,255,255,0.1)",
    borderBottomWidth: 1,
    margin: 10,
  },
  pointsm: {
    fontSize: 20,
    color: "#FFD700",
    width: 1500,
    paddingHorizontal: 30,
    paddingBlockEnd : 10,
    fontWeight: "bold",
    textAlign: "center",      
  },
  avatarm: {
    width: 120,
    height: 120,
    borderRadius: 120,
    marginLeft: 10,
    padding : 10,
  },
  namem: {
    fontWeight: "bold",
    fontSize: 25,
    padding: 20,
    
    color: "#fff",
  },
});


import React from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import GradientBg from "@/components/GradientBg";
import { StatusBar } from "expo-status-bar";
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
const referrals = [
  { id: "1", name: "Habeeb", points: 1000, avatar: require('@/assets/Idris.jpg')},
  { id: "2", name: "Habeeb", points: 1000, avatar: require('@/assets/Idris.jpg') },
  { id: "3", name: "Habeeb", points: 1000, avatar: require('@/assets/Idris.jpg') },
];
<FontAwesome name="group" size={24} color="black" />
export default function ReferralScreen() {
  const renderReferral = ({ item, index }: { item: (typeof referrals)[0], index: number }) => (
    <View style={styles.row}>
      <Text style={styles.rank}>{index + 1}.</Text>
      <Image source={item.avatar} style={styles.avatar} />
      <View style={styles.referralcol}>
      <Text style={styles.name}>{item.name}</Text>
        <View style = {styles.referralicon}>
      <AntDesign name="addusergroup" size={24} color="black" style = {styles.reffered}/>
        <Text style={styles.subText}>+2</Text>
        </View>
      </View>
      <View style={styles.referralInfo}>
        <Text style={styles.points}>UCY {item.points}</Text>
      </View>
    </View>
  );

  return (
    <GradientBg>
      <StatusBar style="light" backgroundColor="transparent" />

      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>EQU</Text>
        <View style={styles.inviteCard}>
        <FontAwesome name="group" size={24} color="black" />
        <AntDesign name="arrowright" size={24} color="black" />     
             <Image
            source={require("@/assets/Idris.jpg")}
            style={styles.inviteImage}
            resizeMode="contain"
          />
        </View>
      </View>
      <Text style={styles.inviteText}>Invite friends to earn points</Text>
          <Text style={styles.inviteText2}>Referral </Text>

      {/* Referrals List */}
      <FlatList
        data={referrals}
        keyExtractor={(item) => item.id}
        renderItem={renderReferral}
        contentContainerStyle={styles.list}
      />

      {/* Invite Button */}
      <TouchableOpacity style={styles.inviteButton}>
        <Text style={styles.inviteButtonText}>Invite a friend</Text>
      </TouchableOpacity>
    </GradientBg>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    paddingHorizontal: 20,
    marginTop: 50,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
  },
  inviteCard: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginBottom: 24,
    justifyContent: "space-around",
    marginTop: 20,
  },
  inviteImage: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  inviteText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,
    flexWrap: "wrap",
    textAlign: "center",
  },
  inviteText2: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    flexWrap: "wrap",
    paddingHorizontal: 20,
  
  },
  list: {
    paddingHorizontal: 20,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomColor: "rgba(255,255,255,0.1)",
    borderBottomWidth: 1,
  },
  rank: {
    width: 24,
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginHorizontal: 8,
  },
  name: {
    flex: 1,
    color: "#fff",
    fontSize: 16,
  },
  referralInfo: {
    alignItems: "flex-end",
  },
  subText: {
    color: "#fff",
    fontSize: 12,
  },
  points: {
    color: "#FFD700",
    fontSize: 14,
    fontWeight: "bold",
  },
  inviteButton: {
    backgroundColor: "#fff",
    marginBottom: 100 ,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 20,
  },
  inviteButtonText: {
    color: "#07575B",
    fontSize: 16,
    fontWeight: "600",
  },
  reffered: {
    marginLeft: -10,
    color: "#fff",
    fontSize: 16,
  },
  referralicon: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,

  },
  referralcol: {
    flexDirection: "column",
    flex: 1,
  },
});

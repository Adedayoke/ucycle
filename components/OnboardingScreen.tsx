import { View, Text, StyleSheet, Pressable } from "react-native";
import React from "react";
import { themes } from "@/theme";
import { Link } from "expo-router";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const imageSize = width - width * 0.231;

export default function OnboardingScreen({
  data,
  index,
}: {
  data: any;
  index: number;
}) {
  return (
    <View style={styles.page}>
      <View style={styles.header}>
        <View style={styles.counter}>
          <Text
            style={{
              color: "white",
              fontSize: 16,
              fontFamily: "Montserrat_600SemiBold",
            }}
          >
            {index + 1}
          </Text>
          <Text
            style={{
              color: themes.colorInactive,
              fontSize: 16,
              fontFamily: "Montserrat_600SemiBold",
            }}
          >
            /3
          </Text>
        </View>
        <Link href="/login" asChild>
          <Pressable hitSlop={20}>
            <Text
              style={{
                color: "white",
                fontSize: 16,
                fontFamily: "Montserrat_600SemiBold",
              }}
            >
              Skip
            </Text>
          </Pressable>
        </Link>
      </View>
      <View style={styles.content}>
        <View style={styles.imagecont}></View>
        <View style={styles.contentText}>
          <Text style={styles.title}>{data[index].title}</Text>
          <Text style={styles.desc}>{data[index].description}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    width: width,
    padding: 20,
    backgroundColor: themes.colorPrimaryDark,
    flex: 1,
  },
  title: {
    fontSize: 24,
    color: "white",
    fontFamily: "Montserrat_800ExtraBold",
  },
  desc: {
    marginTop: 10,
    fontSize: 14,
    textAlign: "center",
    color: themes.colorTextFaded,
    fontFamily: "Montserrat_600SemiBold",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  counter: {
    flexDirection: "row",
    alignItems: "center",
  },
  content: {
    flex: 1,
    // backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
  contentText: {
    alignItems: "center",
    justifyContent: "center",
  },
  imagecont: {
    width: imageSize,
    height: imageSize,
    backgroundColor: "#C4C4C4",
    marginBottom: 50,
  },
});

import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'

export default function login() {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" backgroundColor="white" />{" "}
      <Text style={styles.title}>Login to recycu</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: "white",
      // justifyContent: "center",
      // alignItems: "center",
      paddingTop: 100,
      paddingHorizontal: 20,
    },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
  }
})
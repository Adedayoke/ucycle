import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { StatusBar } from 'expo-status-bar'

export default function login() {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" backgroundColor="white" />{" "}
      <Text style={styles.title}>Login</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
  }
})
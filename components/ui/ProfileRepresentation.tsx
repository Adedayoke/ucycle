import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function ProfileRepresentation() {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>OH</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#4104F9",
    width: 50,
    height: 50,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  name: {
    color: "#fff",
    fontSize: 20,
    fontFamily: "Montserrat_600SemiBold"
  }
})
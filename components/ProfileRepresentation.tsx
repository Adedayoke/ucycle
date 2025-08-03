import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { useUserStore } from '@/store/userStore'

export default function ProfileRepresentation() {
  const user = useUserStore((state) => state.user)
  console.log("user is ", user)
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{user?.username?.slice(0, 2)}</Text>
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
    fontFamily: "Montserrat_600SemiBold",
    textTransform: "uppercase",
  }
})
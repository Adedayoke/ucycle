import { View, Text } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

export default function _layout() {
  return (
    <Stack>
        <Stack.Screen name="index" options={{ title: 'Home', headerShown: false }} />
        <Stack.Screen name='wastes' options={{ headerShown: false }} />
        <Stack.Screen name='pickup' options={{ title: 'Pickup' }} />
        <Stack.Screen name='delivery' options={{ title: 'Delivery' }} />
    </Stack>
  )
}
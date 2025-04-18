import { View, Text } from 'react-native'
import React from 'react'
import GradientBg from '@/components/GradientBg'
import { StatusBar } from 'expo-status-bar'

export default function leaderboard() {
  return (
    <GradientBg>
          <StatusBar style='light' backgroundColor="transparent" />
          <Text>Leaderboard</Text>
        </GradientBg>
  )
}
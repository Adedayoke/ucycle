import { View, Text } from 'react-native'
import React from 'react'
import GradientBg from '@/components/GradientBg'
import { StatusBar } from 'expo-status-bar'

export default function referral() {
  return (
    <GradientBg>
          <StatusBar style='light' backgroundColor="transparent" />
          <Text>Referral</Text>
        </GradientBg>
  )
}
import { View, Text } from 'react-native'
import React from 'react'
import GradientBg from '@/components/GradientBg'
import { StatusBar } from 'expo-status-bar'
import { themes } from '@/theme'

export default function pickup() {
  return (
     <GradientBg>
          <StatusBar style='light' backgroundColor={themes.colorBgDark} />
          <Text>Pickup</Text>
        </GradientBg>
  )
}
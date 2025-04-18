import { View, Text, ScrollView } from 'react-native'
import React from 'react'
import GradientBg from '@/components/GradientBg'
import { StatusBar } from 'expo-status-bar'
import { themes } from '@/theme'

export default function index() {
  return (
    <GradientBg>
      <StatusBar style='light' backgroundColor="transparent" />
      <ScrollView>
        <Text>Home</Text>
      </ScrollView>
    </GradientBg>
  )
}
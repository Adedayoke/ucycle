import React from 'react'
import { Text, View } from 'react-native'
import { useChangeTabBg } from "@/hooks/useChangeTabBG";
import { themes } from "@/theme";


export default function pickup() {
  useChangeTabBg({ backgroundColor: themes.colorBgDark })
  return (
     <View>
      <Text>Pickup</Text>
     </View>
  )
}
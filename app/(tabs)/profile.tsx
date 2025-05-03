import { View, Text } from 'react-native'
import React from 'react'
import GradientBg from '@/components/GradientBg'
import { StatusBar } from 'expo-status-bar'

export default function profile() {
  return (
    <GradientBg>
          <StatusBar style='light' backgroundColor="transparent" />
          <Text>Profile</Text>
        </GradientBg>
  )
}
// import React from 'react';
// import { View, Text, Button, StyleSheet } from 'react-native';

// export default function ProfileScreen() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Profile Settings</Text>
//       <Button title="Logout" onPress={() => {}} />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
//   title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
// });

import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import React from 'react';
import CameraScanner from '@/components/CameraScanner';
import { themes } from '@/constants/theme';

export default function ScanWasteScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>Scan your waste</Text> */}
      {/* Camera functionality can be added here */}
      <CameraScanner />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingVertical: 0, backgroundColor: themes.colorPrimaryLight },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, color: '#003B46' },
});

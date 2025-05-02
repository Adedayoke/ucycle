import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import React from 'react';

export default function ScanWasteScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scan your waste</Text>
      {/* Camera functionality can be added here */}
      <Button title="Done Scanning" onPress={() => router.push('/')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
});

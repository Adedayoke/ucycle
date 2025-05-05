import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import React from 'react';
import { useChangeTabBg } from '@/hooks/useChangeTabBG';
import { themes } from '@/theme';

export default function WastesScreen() {
  const router = useRouter();
  useChangeTabBg({ backgroundColor: themes.colorBgDark })

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Wastes</Text>
      <Button title="Add waste" onPress={() => router.push('/')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20 },
});

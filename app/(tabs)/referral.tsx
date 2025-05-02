import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function ReferralScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Invite friends to earn points</Text>
      <Button title="Invite a friend" onPress={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
});

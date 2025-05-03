import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function SubmitWasteScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Submit Waste</Text>

      <Text>Waste Name</Text>
      <TextInput style={styles.input} placeholder="Plastic Bottle" />

      <Text>Quantity</Text>
      <TextInput style={styles.input} placeholder="Enter quantity" keyboardType="numeric" />

      <Button title="Submit" onPress={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { 
    borderWidth: 1, 
    borderColor: '#ccc', 
    padding: 10, 
    marginVertical: 10, 
    borderRadius: 5 
  },
});

// PickupDetailsScreen.tsx
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView 
} from 'react-native';
import { useRouter } from 'expo-router';

export default function PickupDetailsScreen() {
  const router = useRouter();
  const [location, setLocation] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  const [notes, setNotes] = useState('');

  const handleRequestPickup = () => {
    // TODO: validate and save details
    router.push('/'); // navigate to map screen
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Pickup Details</Text>

      <Text style={styles.label}>Pickup Location</Text>
      <TextInput
        value={location}
        onChangeText={setLocation}
        placeholder="Enter pickup address"
        style={styles.input}
      />

      <Text style={styles.label}>Preferred Date</Text>
      <TextInput
        value={preferredDate}
        onChangeText={setPreferredDate}
        placeholder="YYYY-MM-DD"
        style={styles.input}
      />

      <Text style={styles.label}>Preferred Time</Text>
      <TextInput
        value={preferredTime}
        onChangeText={setPreferredTime}
        placeholder="HH:MM"
        style={styles.input}
      />

      <Text style={styles.label}>Additional Notes</Text>
      <TextInput
        value={notes}
        onChangeText={setNotes}
        placeholder="Any instructions?"
        style={[styles.input, styles.textArea]}
        multiline
        numberOfLines={4}
      />

      <TouchableOpacity style={styles.button} onPress={handleRequestPickup}>
        <Text style={styles.buttonText}>Request Pickup</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
// PickupDetailsScreen.styles.ts (or include below)
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 24,
    color: '#003B46',
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: '#000',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#07575B',
    paddingVertical: 14,
    borderRadius: 8,
    marginTop: 24,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

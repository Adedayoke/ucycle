import React, { useMemo, useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, ScrollView, Alert } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import Toast from 'react-native-toast-message';
import PrimaryButton from '@/components/ui/PrimaryButton';
import { useWasteStore } from '@/store/wasteStore';

export default function WasteDetailScreen() {
  const { id } = useLocalSearchParams();
  const wastes = useWasteStore((s) => s.wastes);
  const updateWaste = useWasteStore((s) => s.updateWaste);
  const removeWaste = useWasteStore((s) => s.removeWaste);

  const waste = useMemo(() => wastes.find(w => w.id === id), [wastes, id]);
  const [name, setName] = useState(waste?.name ?? '');
  const [quantity, setQuantity] = useState(String(waste?.quantity ?? ''));
  const [notes, setNotes] = useState(waste?.notes ?? '');

  if (!waste) {
    return (
      <View style={styles.container}> 
        <Text style={styles.title}>Waste not found</Text>
        <PrimaryButton onPress={() => router.back()}>Go Back</PrimaryButton>
      </View>
    );
  }

  const handleSave = () => {
    const q = Math.max(1, Number(quantity) || 1);
    updateWaste(waste.id, { name: name.trim() || waste.name, quantity: q, notes });
    Toast.show({ type: 'success', text1: 'Saved changes' });
    router.back();
  };

  const handleDelete = () => {
    Alert.alert('Delete waste', `Delete ${waste.name}?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => { removeWaste(waste.id); Toast.show({ type: 'success', text1: 'Waste deleted' }); router.back(); } }
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Waste Details</Text>

      {waste.imageUri ? (
        <Image source={{ uri: waste.imageUri }} style={styles.image} />
      ) : (
        <View style={[styles.image, { backgroundColor: '#eee', alignItems: 'center', justifyContent: 'center' }]}>
          <Text>No image</Text>
        </View>
      )}

      <Text style={styles.label}>Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Waste name" />

      <Text style={styles.label}>Quantity</Text>
      <TextInput style={styles.input} value={quantity} onChangeText={setQuantity} keyboardType="numeric" placeholder="Quantity" />

      <Text style={styles.label}>Notes</Text>
      <TextInput
        style={[styles.input, { height: 100, textAlignVertical: 'top' }]}
        value={notes}
        onChangeText={setNotes}
        placeholder="Add notes"
        multiline
      />

      <View style={{ gap: 12 }}>
        <PrimaryButton onPress={handleSave}>Save changes</PrimaryButton>
        <PrimaryButton onPress={handleDelete}>Delete</PrimaryButton>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  image: { width: '100%', aspectRatio: 1, borderRadius: 12, marginBottom: 12 },
  label: { fontWeight: '600', marginTop: 8 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginTop: 6 },
});

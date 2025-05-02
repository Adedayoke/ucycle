import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const wasteTypes = ['Plastic', 'Glass', 'Metal', 'Paper', 'E-waste', 'Organic'];

export default function FilterScreen() {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [location, setLocation] = useState('');

  const toggleType = (type: string) => {
    setSelectedTypes((current) =>
      current.includes(type)
        ? current.filter((t) => t !== type)
        : [...current, type]
    );
  };

  const applyFilter = () => {
    // TODO: use selectedTypes and location to filter your data
    console.log('Filters:', { selectedTypes, location });
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Filter Waste Pickup</Text>

      <Text style={styles.label}>Waste Types</Text>
      <View style={styles.typesContainer}>
        {wasteTypes.map((type) => {
          const selected = selectedTypes.includes(type);
          return (
            <TouchableOpacity
              key={type}
              style={[styles.typeButton, selected && styles.typeButtonActive]}
              onPress={() => toggleType(type)}
            >
              {selected ? (
                <MaterialCommunityIcons name="checkbox-marked" size={20} color="#07575B" />
              ) : (
                <MaterialCommunityIcons name="checkbox-blank-outline" size={20} color="#666" />
              )}
              <Text style={[styles.typeText, selected && styles.typeTextActive]}>
                {type}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <Text style={styles.label}>Location</Text>
      <TextInput
        value={location}
        onChangeText={setLocation}
        placeholder="Enter city or ZIP code"
        style={styles.input}
      />

      <TouchableOpacity style={styles.button} onPress={applyFilter}>
        <Text style={styles.buttonText}>Apply Filters</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
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
      fontSize: 16,
      marginBottom: 8,
      color: '#666',
      fontWeight: '500',
    },
    typesContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: 24,
    },
    typeButton: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#666',
      borderRadius: 20,
      paddingHorizontal: 12,
      paddingVertical: 6,
      margin: 4,
    },
    typeButtonActive: {
      backgroundColor: '#07575B',
      borderColor: '#07575B',
    },
    typeText: {
      marginLeft: 6,
      color: '#666',
    },
    typeTextActive: {
      color: '#fff',
    },
    input: {
      backgroundColor: '#F5F5F5',
      borderRadius: 8,
      paddingHorizontal: 12,
      paddingVertical: 10,
      fontSize: 16,
      color: '#000',
      marginBottom: 24,
    },
    button: {
      backgroundColor: '#07575B',
      paddingVertical: 14,
      borderRadius: 8,
      alignItems: 'center',
      marginBottom: 32,
    },
    buttonText: {
      color: '#fff',
      fontWeight: '600',
      fontSize: 16,
    },
  });
  
import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import { router } from 'expo-router';
import Toast from 'react-native-toast-message';
import PrimaryButton from '@/components/ui/PrimaryButton';
import { usePickupStore } from '@/store/pickupStore';
import { useWasteStore } from '@/store/wasteStore';
import { scheduleLocalNotification } from '@/utils/notifications';
import * as Haptics from 'expo-haptics';

export default function PickupScreen() {
  const addPickup = usePickupStore((s) => s.addPickup);
  const wastes = useWasteStore((s) => s.wastes);
  const addActivity = useWasteStore((s) => s.addActivity);

  const [address, setAddress] = useState('');
  const [date, setDate] = useState(''); // YYYY-MM-DD
  const [time, setTime] = useState(''); // HH:mm
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const isValid = useMemo(() => {
    if (!address.trim()) return false;
    // naive checks for date/time
    const dateOk = /^\d{4}-\d{2}-\d{2}$/.test(date);
    const timeOk = /^\d{2}:\d{2}$/.test(time);
    return dateOk && timeOk;
  }, [address, date, time]);

  const datetimeISO = useMemo(() => {
    if (!isValid) return '';
    try {
      const iso = new Date(`${date}T${time}:00`).toISOString();
      return iso;
    } catch {
      return '';
    }
  }, [date, time, isValid]);

  const handleSubmit = async () => {
    if (!isValid || !datetimeISO || submitting) return;
    setSubmitting(true);
    try {
      const selectedWasteIds = wastes.slice(0, 5).map(w => w.id); // simple inclusion of latest items
      addPickup({ address: address.trim(), datetimeISO, phone: phone.trim() || undefined, notes: notes.trim() || undefined, wasteIds: selectedWasteIds });
      addActivity({
        type: 'pickup',
        message: `Pickup scheduled for ${new Date(datetimeISO).toLocaleString()} at ${address.trim()}`,
      });
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      Toast.show({ type: 'success', text1: 'Pickup scheduled', text2: `${new Date(datetimeISO).toLocaleString()}` });
      // reminder 10 seconds later for demo; adjust to minutes/hours in real usage
      await scheduleLocalNotification('Pickup scheduled', `Reminder for ${new Date(datetimeISO).toLocaleString()}`, 10);
      router.back();
    } catch (e) {
      await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
      Toast.show({ type: 'error', text1: 'Failed to schedule notification' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Request Pickup</Text>

      <Text style={styles.label}>Address</Text>
      <TextInput style={styles.input} placeholder="123 Green St, City" value={address} onChangeText={setAddress} />

      <Text style={styles.label}>Date (YYYY-MM-DD)</Text>
      <TextInput style={styles.input} placeholder="2025-08-25" value={date} onChangeText={setDate} keyboardType="numbers-and-punctuation" />

      <Text style={styles.label}>Time (HH:mm)</Text>
      <TextInput style={styles.input} placeholder="14:30" value={time} onChangeText={setTime} keyboardType="numbers-and-punctuation" />

      <Text style={styles.label}>Phone (optional)</Text>
      <TextInput style={styles.input} placeholder="(+44) 7000 000000" value={phone} onChangeText={setPhone} keyboardType="phone-pad" />

      <Text style={styles.label}>Notes (optional)</Text>
      <TextInput style={[styles.input, { height: 100, textAlignVertical: 'top' }]} value={notes} onChangeText={setNotes} placeholder="Any instructions" multiline />

      <View style={{ height: 12 }} />
      <PrimaryButton disabled={!isValid || submitting} loading={submitting} onPress={handleSubmit} accessibilityLabel="Schedule pickup">
        Schedule Pickup
      </PrimaryButton>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  label: { fontWeight: '600', marginTop: 8 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10, marginTop: 6 },
});

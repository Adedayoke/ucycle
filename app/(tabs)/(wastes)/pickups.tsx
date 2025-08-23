import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Pressable, Alert } from 'react-native';
import { usePickupStore } from '@/store/pickupStore';
import Toast from 'react-native-toast-message';
import { themes } from '@/constants/theme';
import { useWasteStore } from '@/store/wasteStore';

export default function PickupsScreen() {
  const pickups = usePickupStore((s) => s.pickups);
  const updatePickup = usePickupStore((s) => s.updatePickup);
  const removePickup = usePickupStore((s) => s.removePickup);
  const addActivity = useWasteStore((s) => s.addActivity);

  const [tab, setTab] = useState<'upcoming' | 'completed' | 'canceled'>('upcoming');

  const now = Date.now();
  const relTime = (ts: number) => {
    const diff = ts - now;
    const abs = Math.abs(diff);
    const mins = Math.round(abs / 60000);
    if (mins < 1) return diff >= 0 ? 'in <1m' : '<1m ago';
    if (mins < 60) return diff >= 0 ? `in ${mins}m` : `${mins}m ago`;
    const hrs = Math.round(mins / 60);
    if (hrs < 24) return diff >= 0 ? `in ${hrs}h` : `${hrs}h ago`;
    const days = Math.round(hrs / 24);
    return diff >= 0 ? `in ${days}d` : `${days}d ago`;
  };

  const filtered = useMemo(() => {
    if (tab === 'upcoming') return pickups.filter(p => p.status === 'scheduled');
    if (tab === 'completed') return pickups.filter(p => p.status === 'completed');
    return pickups.filter(p => p.status === 'canceled');
  }, [pickups, tab]);

  const sorted = useMemo(() => {
    if (tab === 'upcoming') {
      return filtered.slice().sort((a, b) => new Date(a.datetimeISO).getTime() - new Date(b.datetimeISO).getTime());
    }
    return filtered.slice().sort((a, b) => b.createdAt - a.createdAt);
  }, [filtered, tab]);

  const confirmCancel = (id: string) => {
    Alert.alert('Cancel pickup', 'Are you sure you want to cancel this pickup?', [
      { text: 'No', style: 'cancel' },
      { text: 'Yes, cancel', style: 'destructive', onPress: () => { 
        updatePickup(id, { status: 'canceled' }); 
        addActivity({ type: 'pickup', message: 'Pickup canceled' });
        Toast.show({ type: 'success', text1: 'Pickup canceled' }); 
      } },
    ]);
  };

  const confirmComplete = (id: string) => {
    Alert.alert('Complete pickup', 'Mark this pickup as completed?', [
      { text: 'No', style: 'cancel' },
      { text: 'Yes, complete', onPress: () => { 
        updatePickup(id, { status: 'completed' }); 
        addActivity({ type: 'pickup', message: 'Pickup completed' });
        Toast.show({ type: 'success', text1: 'Pickup completed' }); 
      } },
    ]);
  };

  const confirmDelete = (id: string) => {
    Alert.alert('Delete pickup', 'Remove this pickup from history?', [
      { text: 'No', style: 'cancel' },
      { text: 'Delete', style: 'destructive', onPress: () => { removePickup(id); Toast.show({ type: 'success', text1: 'Pickup removed' }); } },
    ]);
  };

  const StatusPill = ({ status }: { status: 'scheduled' | 'completed' | 'canceled' }) => {
    const map: any = {
      scheduled: { bg: '#e7f3ff', fg: '#004085', label: 'Scheduled' },
      completed: { bg: '#e6ffed', fg: '#155724', label: 'Completed' },
      canceled: { bg: '#fdecea', fg: '#721c24', label: 'Canceled' },
    };
    const s = map[status];
    return (
      <View style={{ backgroundColor: s.bg, paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 }}>
        <Text style={{ color: s.fg, fontWeight: '600', fontSize: 12 }}>{s.label}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pickups</Text>
      <View style={styles.tabs}>
        <Pressable onPress={() => setTab('upcoming')} style={[styles.tab, tab === 'upcoming' && styles.tabActive]}>
          <Text style={[styles.tabText, tab === 'upcoming' && styles.tabTextActive]}>Upcoming</Text>
        </Pressable>
        <Pressable onPress={() => setTab('completed')} style={[styles.tab, tab === 'completed' && styles.tabActive]}>
          <Text style={[styles.tabText, tab === 'completed' && styles.tabTextActive]}>Completed</Text>
        </Pressable>
        <Pressable onPress={() => setTab('canceled')} style={[styles.tab, tab === 'canceled' && styles.tabActive]}>
          <Text style={[styles.tabText, tab === 'canceled' && styles.tabTextActive]}>Canceled</Text>
        </Pressable>
      </View>
      {sorted.length === 0 ? (
        <Text style={{ textAlign: 'center', color: 'rgba(0,0,0,0.5)' }}>No pickups yet</Text>
      ) : (
        <FlatList
          data={sorted}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.card}>
              <View style={{ flex: 1 }}>
                <Text style={styles.addr}>{item.address}</Text>
                <Text style={styles.meta}>{new Date(item.datetimeISO).toLocaleString()} • {relTime(new Date(item.datetimeISO).getTime())}</Text>
                <View style={{ marginTop: 6 }}>
                  <StatusPill status={item.status} />
                </View>
              </View>
              <View style={styles.actions}>
                {item.status === 'scheduled' && (
                  <>
                    <Pressable style={[styles.smallBtn, { backgroundColor: themes.colorPrimaryDark }]} onPress={() => confirmComplete(item.id)}>
                      <Text style={styles.smallBtnText}>Complete</Text>
                    </Pressable>
                    <Pressable style={[styles.smallBtn, { backgroundColor: '#dc3545' }]} onPress={() => confirmCancel(item.id)}>
                      <Text style={styles.smallBtnText}>Cancel</Text>
                    </Pressable>
                  </>
                )}
                {item.status !== 'scheduled' && (
                  <Pressable style={[styles.smallBtn, { backgroundColor: '#6c757d' }]} onPress={() => confirmDelete(item.id)}>
                    <Text style={styles.smallBtnText}>Delete</Text>
                  </Pressable>
                )}
              </View>
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingVertical: 50, paddingHorizontal: 15, gap: 20 },
  title: { fontSize: 22, fontWeight: 'bold' },
  tabs: { flexDirection: 'row', gap: 8, marginTop: 4 },
  tab: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 16, backgroundColor: '#eee' },
  tabActive: { backgroundColor: themes.colorPrimaryDark },
  tabText: { fontWeight: '600', color: '#333' },
  tabTextActive: { color: '#fff' },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  addr: { fontSize: 16, fontWeight: '600' },
  meta: { color: '#666', marginTop: 4 },
  actions: { gap: 8, marginLeft: 12 },
  smallBtn: { paddingVertical: 8, paddingHorizontal: 10, borderRadius: 8 },
  smallBtnText: { color: '#fff', fontWeight: '600', fontSize: 12 },
});

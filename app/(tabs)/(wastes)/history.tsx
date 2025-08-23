import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, TextInput, Switch, FlatList, Pressable } from 'react-native';
import { useWasteStore } from '@/store/wasteStore';
import { router } from 'expo-router';

export default function HistoryScreen() {
  const wastes = useWasteStore((s) => s.wastes);
  const [query, setQuery] = useState('');
  const [onlyRecyclable, setOnlyRecyclable] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 20;

  const formatTimeAgo = (timestamp: number) => {
    const now = Date.now();
    const diff = Math.max(0, now - timestamp);
    const seconds = Math.floor(diff / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 7) return `${days}d ago`;
    const weeks = Math.floor(days / 7);
    return `${weeks}w ago`;
  };

  const filtered = useMemo(() => {
    let arr = wastes;
    if (query.trim()) {
      const q = query.toLowerCase();
      arr = arr.filter(w => w.name.toLowerCase().includes(q) || (w.notes || '').toLowerCase().includes(q));
    }
    if (onlyRecyclable) arr = arr.filter(w => w.recyclable);
    return arr;
  }, [wastes, query, onlyRecyclable]);

  const paged = filtered.slice(0, page * pageSize);
  const hasMore = filtered.length > paged.length;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Waste History</Text>

      <View style={styles.filters}>
        <TextInput
          style={styles.search}
          placeholder="Search by name or notes"
          value={query}
          onChangeText={(t) => { setPage(1); setQuery(t); }}
        />
        <View style={styles.switchRow}>
          <Text style={{ marginRight: 8 }}>Recyclable only</Text>
          <Switch value={onlyRecyclable} onValueChange={(v) => { setPage(1); setOnlyRecyclable(v); }} />
        </View>
      </View>

      <FlatList
        data={paged}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 24 }}
        renderItem={({ item }) => (
          <Pressable style={styles.row} onPress={() => router.push({ pathname: '/(tabs)/(wastes)/waste_detail', params: { id: item.id } })}>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.meta}>Qty: {item.quantity} • {item.recyclable ? 'Recyclable' : 'Not recyclable'} • {formatTimeAgo(item.createdAt)}</Text>
            </View>
          </Pressable>
        )}
        ListFooterComponent={hasMore ? (
          <Pressable style={styles.loadMore} onPress={() => setPage((p) => p + 1)}>
            <Text style={{ textAlign: 'center' }}>Load more</Text>
          </Pressable>
        ) : null}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  filters: { marginBottom: 12 },
  search: { borderWidth: 1, borderColor: '#ccc', borderRadius: 8, padding: 10 },
  switchRow: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  row: { backgroundColor: '#fff', padding: 12, borderRadius: 10, marginBottom: 10 },
  name: { fontSize: 16, fontWeight: '600' },
  meta: { color: '#666', marginTop: 4 },
  loadMore: { padding: 12, backgroundColor: '#eee', borderRadius: 8, marginTop: 8 },
});

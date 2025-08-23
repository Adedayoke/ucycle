import React, { useMemo } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useWasteStore } from '@/store/wasteStore';

export default function AnalyticsScreen() {
  const wastes = useWasteStore((s) => s.wastes);

  const stats = useMemo(() => {
    const total = wastes.length;
    const totalQty = wastes.reduce((s, w) => s + (w.quantity || 0), 0);
    const recyclableCount = wastes.filter(w => w.recyclable).length;
    const recyclableRate = total ? Math.round((recyclableCount / total) * 100) : 0;

    // Top categories by name keyword (very simple)
    const counts: Record<string, number> = {};
    wastes.forEach(w => {
      const key = (w.name || 'unknown').toLowerCase().split(' ')[0];
      counts[key] = (counts[key] || 0) + 1;
    });
    const topCategories = Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5);

    // Weekly chart (last 7 days)
    const now = Date.now();
    const oneDay = 24 * 60 * 60 * 1000;
    const last7 = Array.from({ length: 7 }).map((_, i) => {
      const dayStart = new Date(now - (6 - i) * oneDay);
      dayStart.setHours(0, 0, 0, 0);
      const next = new Date(dayStart.getTime() + oneDay);
      const count = wastes.filter(w => w.createdAt >= dayStart.getTime() && w.createdAt < next.getTime()).length;
      return { label: dayStart.toLocaleDateString(undefined, { weekday: 'short' }), count };
    });

    return { total, totalQty, recyclableRate, topCategories, last7 };
  }, [wastes]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Analytics</Text>

      <View style={styles.card}>
        <Text style={styles.metric}>Total scans: {stats.total}</Text>
        <Text style={styles.metric}>Total quantity: {stats.totalQty}</Text>
        <Text style={styles.metric}>Recyclability rate: {stats.recyclableRate}%</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.section}>Top categories</Text>
        {stats.topCategories.length === 0 ? (
          <Text style={styles.dim}>No data</Text>
        ) : stats.topCategories.map(([name, count]) => (
          <Text key={name} style={styles.item}>{name}: {count}</Text>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.section}>This week</Text>
        {stats.last7.map(d => (
          <Text key={d.label} style={styles.item}>{d.label}: {d.count}</Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 12, marginBottom: 12 },
  metric: { fontSize: 16, marginVertical: 2 },
  section: { fontSize: 16, fontWeight: '600', marginBottom: 6 },
  item: { fontSize: 14, color: '#333' },
  dim: { color: '#666' },
});

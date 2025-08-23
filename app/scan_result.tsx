import { View, Text, StyleSheet, Image as RNImage } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import PrimaryButton from '@/components/ui/PrimaryButton';
import Toast from 'react-native-toast-message';
import { scheduleLocalNotification } from '@/utils/notifications';
import { useWasteStore } from '@/store/wasteStore';
import * as Haptics from 'expo-haptics';
import { Image } from 'expo-image';
import * as FileSystem from 'expo-file-system';
import { themes } from '@/constants/theme';

export default function ScanResultScreen() {
  const { imageUri, wasteName, quantity } = useLocalSearchParams();
  const imgUri = Array.isArray(imageUri) ? imageUri[0] : (imageUri as string | undefined);
  const normalizedUri = useMemo(() => {
    if (!imgUri) return undefined;
    const u = imgUri.trim();
    if (u.startsWith('file://') || u.startsWith('content://') || u.startsWith('http')) return u;
    return `file://${u}`;
  }, [imgUri]);
  const [cachedUri, setCachedUri] = useState<string | undefined>(undefined);
  const [imgError, setImgError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function ensureCache(uri?: string) {
      if (!uri) return;
      // If data URI (base64), use directly with no FS ops
      if (uri.startsWith('data:')) {
        if (!cancelled) setCachedUri(uri);
        return;
      }
      try {
        const ext = uri.split('.').pop() || 'jpg';
        const dest = `${FileSystem.cacheDirectory}ucycle_result_${Date.now()}.${ext}`;
        await FileSystem.copyAsync({ from: uri, to: dest });
        if (!cancelled) setCachedUri(dest);
      } catch {
        if (!cancelled) setCachedUri(uri);
      }
    }
    setCachedUri(undefined);
    setImgError(null);
    ensureCache(normalizedUri);
    return () => { cancelled = true; };
  }, [normalizedUri]);
  const addFromScan = useWasteStore((s) => s.addFromScan);

  // Simple recyclability check based on waste name
  const isRecyclable = (name: string) => {
    const recyclableItems = ['plastic', 'bottle', 'can', 'paper', 'cardboard', 'glass'];
    return recyclableItems.some(item => name.toLowerCase().includes(item));
  };

  const recyclable = isRecyclable(wasteName as string);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Scanning Result</Text>
      
      <View style={styles.resultContainer}>
        {cachedUri ? (
          <Image
            source={{ uri: cachedUri }}
            recyclingKey={cachedUri}
            transition={200}
            cachePolicy="none"
            style={styles.image}
            contentFit="contain"
            onError={() => setImgError('Image failed to load')}
          />
        ) : (
          <View style={[styles.image, { justifyContent: 'center', alignItems: 'center' }]}> 
            <Text style={{ color: '#999' }}>No image</Text>
          </View>
        )}
        {imgError && (cachedUri || normalizedUri) ? (
          <>
            <Text style={{ color: '#ff7675', marginTop: 6, fontSize: 12 }}>Preview failed. Trying fallback…</Text>
            <RNImage
              source={{ uri: cachedUri || normalizedUri }}
              resizeMode="contain"
              style={styles.image}
            />
            <Text style={{ color: '#999', fontSize: 11 }}>URI: {cachedUri || normalizedUri}</Text>
          </>
        ) : null}
        
        <View style={styles.wasteTag}>
          <Text style={styles.wasteTagText}>{wasteName}</Text>
        </View>
        
        <Text style={styles.recyclableText}>
          {recyclable ? "It's Recyclable" : "Not Recyclable"}
        </Text>
        
        <Text style={styles.quantityText}>
          Quantity: {quantity}
        </Text>
        
        <PrimaryButton size={14} style={{ paddingVertical: 8, paddingHorizontal: 12 }} onPress={async () => {
          const q = Number(quantity) || 1;
          const name = (wasteName as string) || 'Unknown waste';
          if (cachedUri || normalizedUri) {
            addFromScan({ imageUri: (cachedUri || normalizedUri) as string, name, quantity: q, recyclable });
          } else {
            addFromScan({ name, quantity: q, recyclable });
          }
          await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
          Toast.show({ type: 'success', text1: 'Waste saved', text2: `${name} (x${q})` });
          // fire-and-forget a small local notification
          scheduleLocalNotification('Waste saved', `${name} (x${q}) added`).catch(() => {});
          router.replace('/wastes');
        }}>
          Complete
        </PrimaryButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    paddingVertical: 70,
    paddingHorizontal: 15,
    justifyContent: 'space-between',
    backgroundColor: themes.colorPrimaryLight
  },
  title: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    marginBottom: 20 
  },
  resultContainer: {
    height: '80%',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 20,
    borderWidth: 4,
    borderColor: '#666666'
  },
  wasteTag: {
    width: 'auto',
    marginHorizontal: 'auto',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: 30,
    backgroundColor: '#FACC39'
  },
  wasteTagText: {
    fontSize: 12,
    color: '#2F5F67'
  },
  recyclableText: {
    textAlign: 'center',
    fontWeight: '800',
    fontSize: 25
  },
  quantityText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#666'
  }
});

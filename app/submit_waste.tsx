import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image as RNImage } from 'react-native';
import * as FileSystem from 'expo-file-system';
import { useLocalSearchParams, router } from 'expo-router';
import PrimaryButton from '@/components/ui/PrimaryButton';
import { themes } from '@/constants/theme';
import * as Haptics from 'expo-haptics';
import { Image } from 'expo-image';

export default function SubmitWasteScreen() {
  const { imageUri, suggestedName } = useLocalSearchParams();
  const imgUri = Array.isArray(imageUri) ? imageUri[0] : (imageUri as string | undefined);
  const normalizedUri = useMemo(() => {
    if (!imgUri) return undefined;
    const u = imgUri.trim();
    // Allow data URIs from expo-camera base64 capture
    if (u.startsWith('data:')) return u;
    if (u.startsWith('file://') || u.startsWith('content://') || u.startsWith('http')) return u;
    return `file://${u}`;
  }, [imgUri]);
  const initialName = typeof suggestedName === 'string' ? suggestedName : '';
  const [wasteName, setWasteName] = useState(initialName);
  const [quantity, setQuantity] = useState('');
  const [touched, setTouched] = useState({ name: false, qty: false });
  const [submitting, setSubmitting] = useState(false);
  const [imgError, setImgError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [cachedUri, setCachedUri] = useState<string | undefined>(undefined);
  const [displayUri, setDisplayUri] = useState<string | undefined>(undefined);

  useEffect(() => {
    // tiny delay to avoid race conditions right after capture
    const t = setTimeout(() => setReady(true), 50);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    let cancelled = false;
    async function ensureCacheAndExist(uri?: string) {
      if (!uri) return;
      // If data URI, no file operations needed
      if (uri.startsWith('data:')) {
        if (!cancelled) {
          setCachedUri(uri);
          setDisplayUri(uri);
        }
        return;
      }
      let target = uri;
      try {
        const ext = uri.split('.').pop() || 'jpg';
        const dest = `${FileSystem.cacheDirectory}ucycle_${Date.now()}.${ext}`;
        await FileSystem.copyAsync({ from: uri, to: dest });
        target = dest;
      } catch {
        // ignore copy failure, use original
        target = uri;
      }
      // wait until file exists
      for (let i = 0; i < 6 && !cancelled; i++) {
        try {
          const info = await FileSystem.getInfoAsync(target);
          if (info.exists) {
            if (!cancelled) {
              setCachedUri(target);
              setDisplayUri(target);
            }
            return;
          }
        } catch {}
        await new Promise(r => setTimeout(r, 120));
      }
      if (!cancelled) {
        setCachedUri(target);
        setDisplayUri(target);
      }
    }
    setCachedUri(undefined);
    setDisplayUri(undefined);
    setImgError(null);
    ensureCacheAndExist(normalizedUri);
    return () => { cancelled = true; };
  }, [normalizedUri]);

  const errors = useMemo(() => {
    const errs: { name?: string; qty?: string } = {};
    if (!wasteName.trim()) errs.name = 'Waste name is required';
    const q = Number(quantity);
    if (!quantity.trim()) errs.qty = 'Quantity is required';
    else if (!Number.isFinite(q) || q <= 0) errs.qty = 'Enter a positive number';
    return errs;
  }, [wasteName, quantity]);

  const handleSubmit = () => {
    if (errors.name || errors.qty || submitting) return;
    setSubmitting(true);
    const passUri = displayUri || cachedUri || normalizedUri || '';
    console.log('SubmitWaste navigate with URI:', passUri);
    router.push({
      pathname: "/scan_result",
      params: { 
        imageUri: passUri,
        wasteName,
        quantity 
      }
    });
    setSubmitting(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Submit Waste</Text>

      {displayUri && ready ? (
        <Image 
          source={{ uri: displayUri }}
          recyclingKey={displayUri}
          transition={200}
          cachePolicy="none"
          onError={async () => {
            setImgError('Image failed to load');
            // If file path, try converting to base64 data URI and retry
            try {
              if (displayUri.startsWith('file://')) {
                const b64 = await FileSystem.readAsStringAsync(displayUri, { encoding: FileSystem.EncodingType.Base64 });
                const dataUri = `data:image/jpeg;base64,${b64}`;
                setImgError(null);
                setDisplayUri(dataUri);
              }
            } catch {}
          }}
          style={styles.previewImage}
          contentFit="contain"
        />
      ) : null}
      {imgError && (displayUri || normalizedUri) ? (
        <>
          <Text style={{ color: '#ff7675', marginTop: -10, fontSize: 12 }}>Preview failed. Trying fallback…</Text>
          <RNImage
            source={{ uri: displayUri || normalizedUri }}
            resizeMode="contain"
            style={styles.previewImage}
            onError={() => console.log('RNImage fallback failed for', displayUri || normalizedUri)}
          />
          <Text style={{ color: '#999', fontSize: 11, marginBottom: 10 }}>URI: {displayUri || normalizedUri}</Text>
        </>
      ) : null}
      {imgError ? (
        <Text style={{ color: '#ff7675', marginTop: -10, marginBottom: 10, fontSize: 12 }}>Image preview failed. URI: {displayUri || normalizedUri}</Text>
      ) : null}

      <View style={styles.actionsRow}>
        <PrimaryButton size={13} fullWidth={false} style={{ paddingVertical: 6, paddingHorizontal: 12, alignSelf: 'flex-start' }} onPress={async () => { await Haptics.selectionAsync(); router.push('/scan'); }} accessibilityLabel="Retake photo">
          Retake
        </PrimaryButton>
      </View>

      <Text style={styles.label}>Waste Name</Text>
      <TextInput 
        style={styles.input} 
        placeholder="e.g., Plastic Bottle" 
        placeholderTextColor="#2F5F6799"
        value={wasteName}
        onChangeText={(t) => setWasteName(t)}
        onBlur={() => setTouched((s) => ({ ...s, name: true }))}
      />
      {touched.name && errors.name ? <Text style={styles.error}>{errors.name}</Text> : null}

      <Text style={styles.label}>Quantity</Text>
      <TextInput 
        style={styles.input} 
        placeholder="Enter quantity" 
        placeholderTextColor="#2F5F6799"
        keyboardType="numeric"
        value={quantity}
        onChangeText={(t) => setQuantity(t)}
        onBlur={() => setTouched((s) => ({ ...s, qty: true }))}
      />
      {touched.qty && errors.qty ? <Text style={styles.error}>{errors.qty}</Text> : null}

      <PrimaryButton size={13} fullWidth={false} style={{ paddingVertical: 6, paddingHorizontal: 12, alignSelf: 'flex-start', marginTop: 6 }} onPress={async () => { await Haptics.selectionAsync(); handleSubmit(); }} disabled={Boolean(errors.name || errors.qty) || submitting} loading={submitting} accessibilityLabel="Submit waste details">
        Submit
      </PrimaryButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: themes.colorPrimaryLight },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center', color: '#003B46' },
  label: { color: '#003B46', fontWeight: '600', marginTop: 8 },
  actionsRow: { marginBottom: 12, alignSelf: 'flex-start' },
  previewImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  input: { 
    borderWidth: 1, 
    borderColor: themes.colorSecondary, 
    padding: 10, 
    marginVertical: 10, 
    borderRadius: 5,
    color: '#003B46',
    backgroundColor: '#FFFFFF'
  },
  error: {
    color: '#c0392b',
    marginTop: -6,
    marginBottom: 8,
  },
});

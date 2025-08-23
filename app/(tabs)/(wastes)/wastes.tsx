import { themes } from "@/constants/theme";
import { useChangeTabBg } from "@/hooks/useChangeTabBG";
import GradientBg from "@/components/GradientBg";
import { StatusBar } from "expo-status-bar";
import { FontAwesome6, MaterialIcons, Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Pressable, Animated, FlatList, Image, Alert } from "react-native";
import Toast from 'react-native-toast-message';
import { useWasteStore } from "@/store/wasteStore";

export default function WastesScreen() {
  const router = useRouter();
  const { openMenu } = useLocalSearchParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [rotateAnim] = useState(new Animated.Value(0));
  const [scaleAnim] = useState(new Animated.Value(0));
  const wastes = useWasteStore((s) => s.wastes);
  const removeWaste = useWasteStore((s) => s.removeWaste);
  
  // Home uses gradient page background; set tab bar to light to match
  useChangeTabBg({ backgroundColor: themes.colorPrimaryLight });

  const toggleMenu = () => {
    const toValue = isMenuOpen ? 0 : 1;
    
    Animated.parallel([
      Animated.timing(rotateAnim, {
        toValue,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
    
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    if ((openMenu as string) === '1' && !isMenuOpen) {
      // open the menu once on entry
      toggleMenu();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '45deg'],
  });

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

  const actionItems = [
    {
      icon: 'camera',
      label: 'Add Waste',
      onPress: () => {
        toggleMenu();
        router.push("/scan");
      }
    },
    {
      icon: 'local-shipping',
      label: 'Request Pickup',
      onPress: () => {
        toggleMenu();
        router.push("/pickup");
      }
    },
    {
      icon: 'history',
      label: 'Pickups',
      onPress: () => {
        toggleMenu();
        router.push('/(tabs)/(wastes)/pickups');
      }
    },
    {
      icon: 'history',
      label: 'Waste History',
      onPress: () => {
        toggleMenu();
        router.push('/(tabs)/(wastes)/history');
      }
    },
    {
      icon: 'analytics',
      label: 'Analytics',
      onPress: () => {
        toggleMenu();
        router.push('/(tabs)/(wastes)/analytics');
      }
    }
  ];

  return (
    <GradientBg>
      <StatusBar style="light" backgroundColor="transparent" />
      <View style={styles.container}>
        <Text style={styles.title}>Wastes</Text>
      {wastes.length === 0 ? (
        <Text
          style={{
            textAlign: "center",
            color: "rgba(255, 255, 255, 0.8)",
            fontSize: 16,
          }}
        >
          Your wastes appear here
        </Text>
      ) : (
        <FlatList
          data={wastes}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingBottom: 160 }}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => router.push({ pathname: '/(tabs)/(wastes)/waste_detail', params: { id: item.id } })}
              onLongPress={() => {
                Alert.alert('Delete waste', `Delete ${item.name}?`, [
                  { text: 'Cancel', style: 'cancel' },
                  { text: 'Delete', style: 'destructive', onPress: () => { removeWaste(item.id); Toast.show({ type: 'success', text1: 'Waste deleted' }); } }
                ]);
              }}
              style={styles.wasteCard}
            >
              {item.imageUri ? (
                <Image source={{ uri: item.imageUri }} style={styles.wasteImage} />
              ) : (
                <View style={[styles.wasteImage, { alignItems: 'center', justifyContent: 'center' }]}>
                  <Ionicons name="trash" size={22} color="#999" />
                </View>
              )}
              <View style={{ flex: 1, marginLeft: 10 }}>
                <Text style={styles.wasteName}>{item.name}</Text>
                <Text style={styles.wasteMeta}>Qty: {item.quantity} • {item.recyclable ? 'Recyclable' : 'Not recyclable'} • {formatTimeAgo(item.createdAt)}</Text>
              </View>
            </Pressable>
          )}
        />
      )}
      
      {/* Action Menu Items */}
      {[...actionItems].reverse().map((item, index) => (
        <Animated.View
          key={item.label}
          style={[
            styles.actionItem,
            {
              bottom: 140 + (index * 60),
              transform: [{ scale: scaleAnim }],
              opacity: scaleAnim,
            }
          ]}
        >
          <Pressable
            style={styles.actionButton}
            onPress={item.onPress}
          >
            <MaterialIcons name={item.icon as any} size={20} color="white" />
          </Pressable>
          <Text style={styles.actionLabel}>{item.label}</Text>
        </Animated.View>
      ))}
      
      {/* Main FAB */}
      <Pressable onPress={toggleMenu} style={styles.fab}>
        <Animated.View style={[styles.fabInner, { transform: [{ rotate: rotation }] }]}>
          <FontAwesome6 name="add" size={24} color="white" />
        </Animated.View>
      </Pressable>
      </View>
    </GradientBg>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 50,
    paddingHorizontal: 15,
    gap: 30,
    position: "relative",
    flex: 1
  },
  // On gradient background, title should be light
  title: { fontSize: 22, fontWeight: "bold", color: "#fff" },
  wasteCard: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  wasteImage: {
    width: 56,
    height: 56,
    borderRadius: 10,
    backgroundColor: '#eee',
  },
  wasteName: {
    fontSize: 16,
    fontWeight: '600',
  },
  wasteMeta: {
    color: '#666',
    marginTop: 4,
  },
  fab: {
    position: "absolute",
    right: 15,
    bottom: 80,
    width: 50,
    height: 50,
    borderRadius: 25,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  fabInner: {
    backgroundColor: themes.colorPrimaryDark,
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  actionItem: {
    position: "absolute",
    right: 15,
    flexDirection: "row",
    alignItems: "center",
  },
  actionButton: {
    backgroundColor: themes.colorPrimaryDark,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },
  actionLabel: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "500",
    backgroundColor: themes.colorPrimaryDark,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
});

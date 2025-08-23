import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

export async function configureNotifications() {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowBanner: true,
      shouldShowList: true,
    }),
  });

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  // Android: ensure a default channel exists
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'Default',
      importance: Notifications.AndroidImportance.DEFAULT,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }
  return finalStatus === 'granted';
}

export async function scheduleLocalNotification(title: string, body: string, secondsFromNow = 2) {
  return Notifications.scheduleNotificationAsync({
    content: { title, body },
    trigger: Platform.select({
      android: { channelId: 'default', type: 'timeInterval', seconds: secondsFromNow },
      ios: { type: 'timeInterval', seconds: secondsFromNow },
      default: { type: 'timeInterval', seconds: secondsFromNow },
    }) as Notifications.NotificationTriggerInput,
  });
}

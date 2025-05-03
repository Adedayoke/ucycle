// components/toastConfig.ts
import React from 'react';
import { BaseToast, BaseToastProps, ErrorToast } from 'react-native-toast-message';

export const toastConfig = {
  success: (props: React.JSX.IntrinsicAttributes & BaseToastProps) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: '#28a745', backgroundColor: '#e6ffed' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontWeight: 'bold',
        color: '#155724',
      }}
      text2Style={{
        fontSize: 14,
        color: '#155724',
      }}
    />
  ),
  error: (props: React.JSX.IntrinsicAttributes & BaseToastProps) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: '#dc3545', backgroundColor: '#fdecea' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontWeight: 'bold',
        color: '#721c24',
      }}
      text2Style={{
        fontSize: 14,
        color: '#721c24',
      }}
    />
  ),
  info: (props: React.JSX.IntrinsicAttributes & BaseToastProps) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: '#007bff', backgroundColor: '#e7f3ff' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 16,
        fontWeight: 'bold',
        color: '#004085',
      }}
      text2Style={{
        fontSize: 14,
        color: '#004085',
      }}
    />
  ),
};

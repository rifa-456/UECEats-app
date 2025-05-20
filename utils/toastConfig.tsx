import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Toast, { BaseToast, ErrorToast, InfoToast, ToastConfig } from 'react-native-toast-message';
import { useThemeColor } from '@/hooks/useThemeColor';

const ThemedToast = ({ text1, text2, ...props }: any) => {
  const backgroundColor = useThemeColor({}, 'background');
  const textColor = useThemeColor({}, 'text');
  const borderColor = useThemeColor({}, 'tint');

  return (
    <View style={[styles.toastContainer, { backgroundColor, borderColor }]}>
      {text1 && <Text style={[styles.text1, { color: textColor }]}>{text1}</Text>}
      {text2 && <Text style={[styles.text2, { color: textColor }]}>{text2}</Text>}
    </View>
  );
};

export const toastConfig: ToastConfig = {
  success: props => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: '#07C160' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{ fontSize: 16, fontWeight: '600' }}
      text2Style={{ fontSize: 14 }}
    />
  ),
  error: props => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: '#FF3B30' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{ fontSize: 16, fontWeight: '600' }}
      text2Style={{ fontSize: 14 }}
    />
  ),
  info: props => (
    <InfoToast
      {...props}
      style={{ borderLeftColor: '#007AFF' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{ fontSize: 16, fontWeight: '600' }}
      text2Style={{ fontSize: 14 }}
    />
  ),
  custom: props => <ThemedToast {...props} />
};

const styles = StyleSheet.create({
  toastContainer: {
    width: '90%',
    borderRadius: 8,
    padding: 15,
    borderWidth: 1,
    marginTop: 10,
    minHeight: 60,
    justifyContent: 'center'
  },
  text1: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4
  },
  text2: {
    fontSize: 14
  }
});
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

type UserAvatarProps = {
  username: string;
  avatarUrl?: string; // Optional: if Strapi provides an avatar URL
};

export function UserAvatar({ username, avatarUrl }: UserAvatarProps) {
  // Strapi user object might have an avatar field: user.avatar.url
  if (avatarUrl) {
    return <Image source={{ uri: avatarUrl }} style={styles.avatarImage} />;
  }

  // Fallback to initials or a default image
  const initials = username?.substring(0, 2).toUpperCase() || '??';
  return (
    <View style={styles.avatarFallback}>
      <Text style={styles.avatarText}>{initials}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  avatarImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  avatarFallback: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
  },
});
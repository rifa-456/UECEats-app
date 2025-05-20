import { config } from "@/constants/config";
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";

type UserAvatarProps = {
  username: string;
  avatarUrl?: string;
};

export function UserAvatar({ username, avatarUrl }: UserAvatarProps) {
  const fullAvatarUrl =
    avatarUrl && !avatarUrl.startsWith("http")
      ? `${config.strapiBaseUrl}${avatarUrl}`
      : avatarUrl;
  if (fullAvatarUrl) {
    return <Image source={{ uri: fullAvatarUrl }} style={styles.avatarImage} />;
  }

  const initials = username?.substring(0, 2).toUpperCase() || "??";
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
    backgroundColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "bold",
  },
});

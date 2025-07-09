import React from "react";
import { Button, ActivityIndicator, View, StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import { useGoogleSignIn } from "@/hooks/useGoogleSignIn";

export function GoogleSignInButton() {
  const { isGoogleSignInLoading, promptGoogleSignIn } = useGoogleSignIn();
  
  if (isGoogleSignInLoading) {
    return <ActivityIndicator />;
  }

  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={promptGoogleSignIn}>
        <Image 
          source={require('@/assets/images/google.png')} 
          style={styles.googleLogo} 
        />
        <Text style={styles.buttonText}>Fazer login com Google</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  googleLogo: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4285F4',
  },
});
import { GoogleSignInButton } from "@/components/ui/GoogleSignInButton";
import { useAuth } from "@/hooks/useAuth";
import { Redirect } from "expo-router";
import React from "react";
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

const { width, height } = Dimensions.get('window');


const WelcomeScreen = () => {
  const { isLoading: isLoggingIn, isAuthenticated } = useAuth();

  if (isAuthenticated) {
    return <Redirect href="/passo1"/>;
  }

  const handlePrivacyPolicy = () => {
    console.log('Privacy policy pressed');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Background */}
      <Image
        source={require('@/assets/images/loginbg.png')}
        style={styles.background}
        resizeMode="cover"
      />

      {/* Logo in center of upper area */}
      <View style={[styles.content, { height: height * 0.6}]}>
        <Image
          source={require('@/assets/images/logouece.png')}
          style={styles.logoImage}
          resizeMode="contain"
        />
      </View>

      {/* Welcome Card - Fixed at Bottom */}
      <View style={[styles.welcomeCard, { height: height * 0.4}]}>
        <Text style={styles.appName}>UECEats</Text>
        <Text style={styles.welcomeText}>Seja Bem vindo!</Text>

        <GoogleSignInButton />

        <TouchableOpacity
          onPress={handlePrivacyPolicy}
          style={styles.privacyLink}
        >
          <Text style={styles.privacyText}>
            Ver Políticas de Privacidade e Termos de uso
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    position: 'absolute',
    width: width,
    height: height,
    top: 0,
    left: 0,
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: width * 0.05,
  },
  welcomeCard: {
    position: 'absolute',
    bottom: 0,
    width: width,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
    paddingVertical: height * 0.035,
    paddingHorizontal: width * 0.08,
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    borderColor: "#00ff00",
  },
  appName: {
    fontSize: width * 0.085,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: height * 0.012,
  },
  welcomeText: {
    fontSize: width * 0.048,
    color: '#666',
    marginBottom: height * 0.03,
  },
  privacyLink: {
    marginTop: height * 0.02,
  },
  privacyText: {
    color: '#666',
    fontSize: width * 0.032,
    textDecorationLine: 'underline',
    textAlign: 'center',
  },
  logoImage: {
    width: width * 0.48,
    height: width * 0.48,
  },
});

export default WelcomeScreen;

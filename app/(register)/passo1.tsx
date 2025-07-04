import { View, StyleSheet, ScrollView, Image, Text, SafeAreaView, Dimensions } from "react-native"
import { Control, useForm } from "react-hook-form"
import { Button, Heading, InputEmail, InputText } from "@/src/components";
import { Redirect } from "expo-router";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useUserStore } from "@/stores/useUserStore";


interface FormData {
  name: string
  email: string
}

const { width: screenWidth, height: screenHeight } = Dimensions.get("window")

export default function InitialSetupScreen() {
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const { isAuthenticated, isLoading } = useAuth();
  const { user, logout } = useUserStore();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()
  
  if (isLoading) {
    return null;
  }
  if (!isAuthenticated || !user) {
    //return <Redirect href="/" />;
  }
  console.log("authenticated")
  const username = user?.username || "User";
  const email = user?.email || "No email provided";

  
  
  if (shouldRedirect) {
    return <Redirect href="/(register)/passo2" />;
  }
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Configuração inicial</Text>
          <Text style={styles.headerSubtitle}>Passo 1 de 4</Text>
          <View style={styles.progressBar}>
            <View style={styles.progressFill} />
          </View>
        </View>

        {/* Logo and App Name Section */}
        <View style={styles.logoSection}>
          <Image source={require("@/assets/images/logouece.png")} style={styles.logo} resizeMode="contain" />

          <Heading fs={screenWidth > 400 ? 48 : 40} mt={15} mb={8} color="#000000">
            UECEats
          </Heading>

          <Text style={styles.subtitle}>
            É a primeira vez que vemos você por aqui,{"\n"}
            precisamos de mais informações
          </Text>
        </View>
      
        {/* Form Section */}
        <View style={styles.formSection}>
          <Heading 
          fs={screenWidth > 400 ? 24 : 20} mb={8} textAlign="left" color="#000000">
            Confirme seu nome
          </Heading>

          <Text style={[styles.formSubtitle]}>
            Verifique se suas informações estão corretas</Text>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Nome Completo</Text>
            <InputText
              control={control}
              name="name"
              placeholder={username}
              containerStyle={styles.input}
              editable = {false}
              defaultValue={username}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Email institucional</Text>
            <InputEmail
              control={control}
              name="email"
              placeholder={email}
              containerStyle={styles.input}
              editable = {false}
              defaultValue={email}
            />
          </View>
        </View>

        {/* Continue Button */}
        <View style={styles.buttonContainer}>
          <Button style={styles.continueButton} onPress={handleSubmit(() => setShouldRedirect(true))}>
            <Text style={styles.buttonText}>Continuar</Text>
          </Button>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Ver Políticas de Privacidade e Termos de uso</Text>
          <Text style={styles.footerSubtext}>Universidade Estadual do Ceará</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    width: screenWidth,
    backgroundColor: "#f0f8f0",
  },
  container: {
    marginTop: "1%",
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    alignItems: "center",
    paddingBottom: 20,
  },
  header: {
    width: screenWidth,
    alignItems: "center",
    paddingTop: 25,
    paddingBottom: 8,
    backgroundColor: "white"
  },
  headerTitle: {
    fontSize: screenWidth > 400 ? 18 : 16,
    fontWeight: "600",
    color: "#000000",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: screenWidth > 400 ? 14 : 12,
    color: "#666",
    marginBottom: 15,
  },
  progressBar: {
    width: "100%",
    height: 4,
    backgroundColor: "#e0e0e0",
    borderRadius: 2,
  },
  progressFill: {
    width: "25%",
    height: "100%",
    backgroundColor: "#4CAF50",
    borderRadius: 2,
  },
  logoSection: {
    alignItems: "center",
    height: screenHeight * 0.38,
    paddingVertical: screenHeight * 0.02, // Reduzido de 0.04 para 0.02
  },
  logo: {
    width: screenWidth * 0.3,
    height: screenWidth * 0.3,
    maxWidth: 110,
    maxHeight: 110,
  },
  subtitle: {
    fontSize: screenWidth > 400 ? 18 : 16,
    textAlign: "center",
    color: "#666",
    lineHeight: screenWidth > 400 ? 22 : 20,
    paddingHorizontal: 20,
  },
  formSection: {
    backgroundColor: "white",
    borderRadius: 20,
    width: screenWidth * 0.9,
    paddingLeft: 20,
    flex: 1,
    paddingTop: 15,
  },
  formSubtitle: {
    fontSize: screenWidth > 400 ? 14 : 12,
    color: "#666",
    marginBottom: 20,
  },
  inputContainer: {
    marginRight: 15,
    marginBottom: 15,
  },
  inputLabel: {
    fontSize: screenWidth > 400 ? 16 : 14,
    
    fontWeight: "500",
    color: "#000000",
    marginBottom: 8,
  },
  input: {
    fontSize: 10,
    minHeight: 50,
  },
  buttonContainer: {
    paddingVertical: 15,
  },
  continueButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    width: screenWidth * 0.6,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 50,
  },
  buttonText: {
    color: "white",
    fontSize: screenWidth > 400 ? 18 : 16,
    fontWeight: "600",
  },
  footer: {
    alignItems: "center",
    paddingTop: 10, // Reduzido de 15 para 10
    paddingBottom: 10,
  },
  footerText: {
    fontSize: screenWidth > 400 ? 12 : 11,
    color: "#666",
    textAlign: "center",
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: screenWidth > 400 ? 11 : 10,
    color: "#999",
    textAlign: "center",
  },
})

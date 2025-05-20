import { View, Text, StyleSheet, Platform } from 'react-native';
import Animated, {
  FadeInDown,
  FadeInUp
} from 'react-native-reanimated';
import { UserAvatar } from './UserAvatar';

type WelcomeContentProps = {
  user: string; // Username
  email: string;
};

export function WelcomeContent({ user, email }: WelcomeContentProps) {
  return (
    <View style={styles.content}>
      <Animated.View
        entering={FadeInDown.duration(800).delay(300)}
        style={styles.avatarContainer}
      >
        <UserAvatar username={user} />
      </Animated.View>

      <Animated.Text
        entering={FadeInUp.duration(800).delay(600)}
        style={styles.greeting}
      >
        Hello, {user}
      </Animated.Text>

      <Animated.Text
        entering={FadeInUp.duration(800).delay(900)}
        style={styles.email}
      >
        Email: {email}
      </Animated.Text>

      <Animated.View
        entering={FadeInUp.duration(800).delay(1200)}
        style={styles.card}
      >
        <Text style={styles.welcomeText}>
          Welcome to our application. We're glad to have you here.
        </Text>
      </Animated.View>
    </View>
  );
}
// ... (rest of your styles from file1)
const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  avatarContainer: {
    marginBottom: 32,
  },
  greeting: {
    // fontFamily: 'Inter-Bold', // Ensure font is loaded
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 8,
    textAlign: 'center',
  },
  email: {
    // fontFamily: 'Inter-Regular', // Ensure font is loaded
    fontSize: 18,
    color: '#666666',
    marginBottom: 40,
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#F5F7FA',
    borderRadius: 16,
    padding: 24,
    width: Platform.OS === 'web' ? '100%' : '90%',
    maxWidth: 400,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
      web: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
    }),
  },
  welcomeText: {
    // fontFamily: 'Inter-SemiBold', // Ensure font is loaded
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '600',
    color: '#333333',
    textAlign: 'center',
  },
});
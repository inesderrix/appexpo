import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import useAuthStore from '../store/authStore';

export default function RootLayout() {
    const { isLoggedIn } = useAuthStore();

    return (
        <SafeAreaView edges={["top"]} style={{ flex: 1 }}>
            <Stack>
                <Stack.Protected guard={isLoggedIn}>
                    <Stack.Screen name="(app)" options={{ headerShown: false }} />
                </Stack.Protected>

                <Stack.Protected guard={!isLoggedIn}>
                    <Stack.Screen name="signin" options={{ headerShown: false }} />
                    <Stack.Screen name="signup" options={{ headerShown: false }} />
                </Stack.Protected>
            </Stack>
        </SafeAreaView>
    )
}
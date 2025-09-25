import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RootLayout() {
    const isLoggedIn = true;

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Stack>
                <Stack.Protected guard={isLoggedIn}>
                    <Stack.Screen name="(app)" options={{headerShown:false}} />
                </Stack.Protected>

                <Stack.Protected guard={!isLoggedIn}>
                    <Stack.Screen name="signin" options={{ headerShown: false }} />
                </Stack.Protected>
            </Stack>
        </SafeAreaView>
    )
}
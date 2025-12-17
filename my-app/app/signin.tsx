import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BackgroundCircles from "./cercle";
import { useState } from "react";
import { useRouter, Link } from "expo-router";
import config from "../config";
import useAuthStore from "../store/authStore"


export default function SignIn() {
    const router = useRouter();
    const { setIsLoggedIn, setUser } = useAuthStore();

    // console.log(useAuthStore.getState());

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Erreur", "Tous les champs sont obligatoires");
            return;
        }
        try {
            const response = await fetch(`${config.API_BASE_URL}/users/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', "ngrok-skip-browser-warning": "true", },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                setIsLoggedIn(true);
                setUser(data.user);
                Alert.alert('Success', 'Login successful');
                console.log('Login successful:', data);

                router.replace("/(app)")
            } else {
                Alert.alert('Error', 'Login error');
                console.log('Login failed:', data.message);
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (

        <KeyboardAvoidingView style={styles.container}
            behavior="padding"
        >
            <BackgroundCircles />
            <Ionicons name="person" size={24} color="black" />
            <Text style={styles.title}>Connexion</Text>

            <TextInput
                placeholder="Email"
                placeholderTextColor={'#999'}

                keyboardType="email-address"
                style={styles.input}
                value={email}
                onChangeText={setEmail}
            />

            <TextInput
                placeholder="Mot de passe"
                placeholderTextColor={'#999'}
                secureTextEntry
                style={styles.input}
                value={password}
                onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Se connecter</Text>
            </TouchableOpacity>
            <Link href="/signup" style={styles.link}>
                Créer un compte
            </Link>
        </KeyboardAvoidingView>

    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20, width: '100%' },
    title: {
        fontSize: 26,
        fontWeight: "bold",
        marginBottom: 30,
        textAlign: "center",
    },
    input: {
        width: "100%",
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 12,
        marginBottom: 15,
        backgroundColor: "#ffffffbb",
    },
    button: {
        backgroundColor: "#007AFF",
        padding: 15,
        borderRadius: 8,
        width: "100%",
        alignItems: "center",
    },
    buttonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
    link: {
        marginTop: 15,
        color: "#007AFF",
        textAlign: "center",
    }

});

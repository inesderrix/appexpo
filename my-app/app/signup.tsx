import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView } from "react-native";
import { useState } from "react";
import BackgroundCircles from "./cercle";
import { useRouter, Link } from "expo-router";
import config from "../config";
import useAuthStore from "../store/authStore"
import { Ionicons } from "@expo/vector-icons";

export default function SignUp() {
    const router = useRouter();
    const { setIsLoggedIn, setUser, setToken } = useAuthStore();


    const [email, setEmail] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");

    const handleSignUp = async () => {
        if (!email || !firstName || !lastName || !password) {
            Alert.alert("Erreur", "Tous les champs sont obligatoires");
            return;
        }
        try {
            const response = await fetch(`${config.API_BASE_URL}/users/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "ngrok-skip-browser-warning": "true",
                },
                body: JSON.stringify({
                    email,
                    first_name: firstName,
                    last_name: lastName,
                    password,
                }),
            });

            const data = await response.json();

            if (!response.ok) {
                Alert.alert("Erreur", data.error || "Erreur lors de la création du compte");
                return;
            }
            setIsLoggedIn(true);
            setUser(data.user);
            setToken(data.token);
            Alert.alert("Succès", "Compte créé avec succès");

            console.log("USER CREATED ", data.user);

            router.replace("/(app)");

        } catch (error) {
            console.error("Signup error:", error);
            Alert.alert("Erreur", "Impossible de créer le compte");
        }
    };

    return (
        <KeyboardAvoidingView style={styles.container}
            behavior="padding"
            >



            <BackgroundCircles />
            <Ionicons name="person" size={24} color="black" />
            <Text style={styles.title}>Créer un compte</Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor={'#999'}
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
            />

            <TextInput
                style={styles.input}
                placeholderTextColor={'#999'}
                placeholder="Prénom"
                value={firstName}
                onChangeText={setFirstName}
            />

            <TextInput
                style={styles.input}
                placeholderTextColor={'#999'}
                placeholder="Nom"
                value={lastName}
                onChangeText={setLastName}
            />

            <TextInput
                style={styles.input}
                placeholderTextColor={'#999'}
                placeholder="Mot de passe"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            <TouchableOpacity
                style={styles.button}
                onPress={handleSignUp}
            >
                <Text style={styles.buttonText}>
                    Créer un compte
                </Text>
            </TouchableOpacity>
            <Link href="/signin" style={styles.link}>
                Se connecter
            </Link>
        </KeyboardAvoidingView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center", padding: 20, width: '100%'
    },
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
    buttonText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
    },
    link: {
        marginTop: 15,
        color: "#007AFF",
        textAlign: "center",
    }
});

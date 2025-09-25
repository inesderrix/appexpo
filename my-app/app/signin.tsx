import { View, Text, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BackgroundCircles from "./cercle";

export default function SignIn() {
    return (

            <View style={styles.container}>
                <BackgroundCircles/>
                <Ionicons name="person" size={24} color="black" />
                <Text style={styles.title}>Connexion</Text>

                <TextInput
                    placeholder="Email"
                    placeholderTextColor={'#999'}

                    keyboardType="email-address"
                    style={styles.input}
                />

                <TextInput
                    placeholder="Mot de passe"
                    placeholderTextColor={'#999'}
                    secureTextEntry
                    style={styles.input}
                />
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Se connecter</Text>
                </TouchableOpacity>
            </View>

    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 , width: '100%'},
    title: { fontSize: 26, fontWeight: "bold", marginBottom: 30 },
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
});

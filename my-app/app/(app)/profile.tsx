import { View, Text, StyleSheet, Button } from "react-native";
import useAuthStore from "@/store/authStore";
import { router } from "expo-router";

export default function ProfileScreen() {

    const { user, logout } = useAuthStore();

    if (!user) {
        return <Text>Chargement...</Text>;
    }

    const handleLogout = () => {
        logout();
        console.log("Déconnexion");
        router.replace("/signin");
    };

    

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mon Profil</Text>

            <View style={styles.card}>
                <Text style={styles.label}>Nom</Text>
                <Text>{user.firstName} {user.lastName}</Text>

                <Text style={styles.label}>Email</Text>
                <Text>{user.email}</Text>
            </View>

            <Button title="Se déconnecter" color="red" onPress={handleLogout} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "600",
        marginBottom: 20,
        textAlign: "center",
    },
    card: {
        backgroundColor: "#fff",
        padding: 20,
        borderRadius: 12,
        marginBottom: 30,
    },
    label: {
        fontWeight: "bold",
        marginTop: 10,
    },
});

import { View, Text, StyleSheet, Button } from "react-native";
import useAuthStore from "@/store/authStore";
import { router } from "expo-router";
import BackgroundCircles from "../cercle";


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
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Ma liste de courses</Text>
            </View>
            <BackgroundCircles />

            <View style={styles.content}>

                <View style={styles.card}>
                    <Text style={styles.label}>Nom</Text>
                    <Text>{user.firstName} {user.lastName}</Text>

                    <Text style={styles.label}>Email</Text>
                    <Text>{user.email}</Text>
                </View>

                <Button title="Se déconnecter" color="red" onPress={handleLogout} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    header: {
        height: 56,
        justifyContent: "center",
        alignItems: "center",
        borderBottomWidth: 1,
        borderBottomColor: "#e5e5e5",
        backgroundColor: "#fff",
    },

    headerTitle: {
        fontSize: 20,
        fontWeight: "600",
    }, content: {
        flex: 1,
        padding: 20,
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

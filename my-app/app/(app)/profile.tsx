import { View, Text, StyleSheet, Button, Alert, TouchableOpacity , } from "react-native";
import useAuthStore from "@/store/authStore";
import { router } from "expo-router";
import BackgroundCircles from "../cercle";
import config from "@/config";


export default function ProfileScreen() {

    const { user, logout , token} = useAuthStore();

    if (!user) {
        return <Text>Chargement...</Text>;
    }

    const deleteUser = async ()=>{
        try {
            await fetch(`${config.API_BASE_URL}/users/${user.id}`, { method: 'DELETE', headers: { 'Authorization': `Bearer ${token}` } });
            Alert.alert('Succès', 'Compte supprimé avec succès');
            logout();
            router.replace("/signup");
        }catch (err){
            Alert.alert('Error', 'Erreur de suppression de compte');
            console.error(err , 'Erreur de suppression de compte')
        }
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
            <View>

                <View style={styles.card}>
                    <Text style={styles.label}>Nom</Text>
                    <Text>{user.firstName} {user.lastName}</Text>

                    <Text style={styles.label}>Email</Text>
                    <Text>{user.email}</Text>
                </View>

                <Button title="Se déconnecter" color="red" onPress={handleLogout} />

            </View>
            <TouchableOpacity onPress={() => deleteUser()} style={styles.buttonDanger}>
                <Text style={styles.buttonDangerText}>Supprimer le compte</Text>
                          </TouchableOpacity>
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
        justifyContent:'space-between'
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
    }, buttonDanger: {
        backgroundColor: "#FF3B30",
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: "center",
        marginVertical: 12,
    },
    buttonDangerText: {
        color: "#fff",
        fontWeight: "700",
        fontSize: 16,
    },
});

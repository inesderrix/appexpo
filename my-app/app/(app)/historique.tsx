import { View, Text, FlatList, StyleSheet, TouchableOpacity, TextInput, Modal } from "react-native";
import { useState, useEffect } from "react";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import BackgroundCircles from "../cercle";
import useAuthStore from "../../store/authStore";
import config from "../../config";
import { useFocusEffect } from "expo-router";

export default function HistoryScreen() {
    const { user, token } = useAuthStore();
    const userId = user.id;
    const [search, setSearch] = useState("");
    const [historiqueItems, setHistoriqueItems] = useState<any[]>([]);
    const [clearModalVisible, setClearModalVisible] = useState(false);

    console.log("Token dans historique :", token);

    const fetchHistoriqueItems = async () => {
        try {
            const res = await fetch(`${config.API_BASE_URL}/items/history?userId=${userId}`, { headers:{ 'Authorization': `Bearer ${token}` }, });
            const data = await res.json();
            setHistoriqueItems(data);
        } catch (err) {
            console.error("Erreur fetch historique", err);
        }
    };

 
    useFocusEffect(
        React.useCallback(() => {
            fetchHistoriqueItems();

        }, [])
    );



    const removeItem = async (id: string) => {
        try {
            await fetch(`${config.API_BASE_URL}/items/${id}`, { method: "DELETE",  headers: { 'Authorization': `Bearer ${token}`}});
            fetchHistoriqueItems();
        } catch (err) {
            console.error("Erreur delete item", err);
        }
    };

    const clearHistory = async () => {
        try {
            await fetch(`${config.API_BASE_URL}/items/clear/${userId}?type=history`, { method: "DELETE", headers: { 'Authorization': `Bearer ${token}` } });
            fetchHistoriqueItems();
            setClearModalVisible(false);
        } catch (err) {
            console.error("Erreur vider historique", err);
        }
    };

    const filteredList = historiqueItems.filter((i) =>
        i.title.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Mon historique</Text>
            </View>
            <BackgroundCircles />
            <View style={styles.content}>

                <View style={styles.searchRow}>
                    <TextInput
                        placeholder="Rechercher dans l'historique"
                        placeholderTextColor="#999"
                        value={search}
                        onChangeText={setSearch}
                        style={[styles.input, { flex: 1 }]}
                    />
                    <TouchableOpacity
                        style={[styles.actionBtn, { backgroundColor: "rgba(255,0,0,0.2)" }]}
                        onPress={() => setClearModalVisible(true)}
                    >
                        <MaterialIcons name="clear" size={24} color="white" />
                    </TouchableOpacity>
                </View>
                <FlatList
                    data={filteredList}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => (
                        <View style={styles.itemContainer}>
                            <Text style={styles.item}>{item.title}</Text>
                            <TouchableOpacity onPress={() => removeItem(item._id)}>
                                <MaterialIcons name="delete" size={24} color="#888" />
                            </TouchableOpacity>
                        </View>
                    )}
                    ListEmptyComponent={<Text style={{ color: "#aaa" }}>Aucun historique</Text>}
                    style={{ marginBottom: 20 }}
                />
                <Modal visible={clearModalVisible} transparent animationType="slide">
                    <View style={styles.modalBackground}>
                        <View style={styles.modalContainer}>
                            <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 20 }}>
                                Supprimer tout l&apos;historique ?
                            </Text>

                            <TouchableOpacity style={styles.buttonDanger} onPress={clearHistory}>
                                <Text style={styles.buttonDangerText}>Supprimer</Text>
                            </TouchableOpacity>

                            <TouchableOpacity onPress={() => setClearModalVisible(false)}>
                                <Text style={styles.cancelText}>Annuler</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
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
    }, searchRow: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
        marginBottom: 15,
    },
    input: {
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        padding: 12,
        backgroundColor: "#ffffffbb",
    },
    actionBtn: {
        width: 52,
        height: 52,
        borderRadius: 26,
        justifyContent: "center",
        alignItems: "center",
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.3,
    },
    itemContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 16,
    },
    item: { fontSize: 18 },
    modalBackground: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#00000088" },
    modalContainer: { width: "80%", padding: 20, backgroundColor: "#fff", borderRadius: 10 },
    buttonDanger: {
        backgroundColor: "#FF3B30",
        paddingVertical: 14,
        borderRadius: 10,
        alignItems: "center",
        marginBottom: 12,
    },
    buttonDangerText: { color: "#fff", fontWeight: "700", fontSize: 16 },
    cancelText: { textAlign: "center", color: "#888", fontSize: 16 },
});
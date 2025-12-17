import { View, Text, FlatList, StyleSheet, Button } from "react-native";
import { useState } from "react";
import BackgroundCircles from "../cercle";

export default function HistoryScreen() {
    const [historique, setHistorique] = useState<string[]>(["poires", "fromage", "pain"]);


    const clearList = () => {
        setHistorique([]);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Mon historique</Text>
            </View>
            <BackgroundCircles />
            <View style={styles.content}>


                <FlatList
                    data={historique}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
                    ListEmptyComponent={<Text style={{ color: "#aaa" }}>Aucun historique</Text>}
                    style={{ marginBottom: 20 }}
                />
                <Button title="Vider la liste" onPress={clearList} color="red" />
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

    item: { fontSize: 18, marginBottom: 5 },
});

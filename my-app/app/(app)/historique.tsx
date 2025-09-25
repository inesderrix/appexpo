import { View, Text, FlatList, StyleSheet , Button} from "react-native";
import { useState } from "react";
import BackgroundCircles from "../cercle";

export default function HistoryScreen() {
    const [historique, setHistorique] = useState<string[]>(["poires", "fromage", "pain"]);


    const clearList = () => {
        setHistorique([]);
    };

    return (
        <View style={styles.container}>
            <BackgroundCircles/>

            <Text style={styles.title}>Historique des listes</Text>
            <FlatList
                data={historique}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => <Text style={styles.item}>{item}</Text>}
                ListEmptyComponent={<Text style={{ color: "#aaa" }}>Aucun historique</Text>}
                style={{ marginBottom: 20 }}
            />
              <Button title="Vider la liste" onPress={clearList} color="red" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    title: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
    item: { fontSize: 18, marginBottom: 5 },
});

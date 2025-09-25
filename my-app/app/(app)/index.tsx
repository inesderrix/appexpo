import { View, TextInput, Button, FlatList, Text, StyleSheet } from "react-native";
import { useState } from "react";
import { Checkbox } from "expo-checkbox";
import BackgroundCircles from "../cercle";

export default function CoursesScreen() {
  const [item, setItem] = useState("");
  const [list, setList] = useState<string[]>(["beurre", "pain", "oeufs", "fraises"]);
  const [checked, setChecked] = useState<boolean[]>(list.map(() => false));
  const [historique, setHistorique] = useState<string[]>([]);

  const addItem = () => {
    if (item.trim() !== "") {
      setList([...list, item]);
      setChecked([...checked, false]);
      setItem("");
    }
  };

  const removeItem = (index: number) => {
    const newList = list.filter((_, i) => i !== index);
    const newChecked = checked.filter((_, i) => i !== index);
    setList(newList);
    setChecked(newChecked);
  };

  const handleCheck = (index: number) => {
    setHistorique([...historique, list[index]]);
    removeItem(index);
  };

  const clearList = () => {
    setList([]);
    setChecked([]);
  };

  return (
    <View style={styles.container}>
      <BackgroundCircles/>
      
      <TextInput
        placeholder="Ajouter un produit"
        placeholderTextColor={'#999'}
        value={item}
        onChangeText={setItem}
        style={styles.input}
        autoCorrect={false} // desactiver completement
      />
      <Button title="Ajouter" onPress={addItem} />

      <FlatList
        data={list}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.itemContainer}>
            <View style={styles.itemWithCheckbox}>

              <Checkbox
                style={styles.checkbox}
                value={checked[index] || false}
                onValueChange={() => handleCheck(index)}
              />
              <Text style={styles.item}>{item}</Text>
            </View>
            <Button title="Supprimer" onPress={() => removeItem(index)} />
          </View>
        )}
      />
      <Text style={{ marginTop: 20, fontWeight: "bold", fontSize: 16 }}>Historique</Text>
      <FlatList
        data={historique}
        keyExtractor={(_, index) => `${index}`}
        renderItem={({ item }) => (
          <View style={{ paddingVertical: 4 }}>
            <Text style={{ color: "#888" }}>{item}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={{ color: "#aaa" }}>Aucun historique</Text>}
        style={{ marginBottom: 20 }}
      />

      <Button title="Vider la liste" onPress={clearList} color="red" />
    </View>

  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, marginTop: 10 },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    backgroundColor: "#ffffffbb",
  },
  itemContainer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 5 },
  item: { fontSize: 18 },
  checkbox: { marginRight: 10 },
  itemWithCheckbox: { flexDirection: "row", alignItems: "center" },

});

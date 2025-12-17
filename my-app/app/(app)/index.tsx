import { View, TextInput, Button, FlatList, Text, StyleSheet, Modal, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Checkbox } from "expo-checkbox";
import BackgroundCircles from "../cercle";

export default function CoursesScreen() {
  const [item, setItem] = useState("");
  const [list, setList] = useState<string[]>(["beurre", "pain", "oeufs", "fraises"]);
  const [checked, setChecked] = useState<boolean[]>(list.map(() => false));
  const [historique, setHistorique] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState("");

  const addItem = (newItem: string) => {
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

  const filteredList = list.filter((i) => i.toLowerCase().includes(search.toLowerCase()));


  return (
    <View style={styles.container}>
      <BackgroundCircles />
      <View style={styles.searchRow}>
        <TextInput
          placeholder="Rechercher un produit"
          placeholderTextColor="#999"
          value={search}
          onChangeText={setSearch}
          style={styles.input}
          autoCorrect={false}
        />

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setModalVisible(true)}
        >
          <Ionicons name="add" size={26} color="#fff" />
        </TouchableOpacity>
      </View>


      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={{ fontSize: 18, marginBottom: 10 }}>Ajouter un produit</Text>
            <TextInput
              placeholder="Nom du produit"
              value={item}
              onChangeText={setItem}
              style={styles.input}
            />
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 10 }}>
              <Button
                title="Annuler"
                color="red"
                onPress={() => {
                  setItem("");
                  setModalVisible(false);
                }}
              />
              <Button
                title="Ajouter"
                onPress={() => {
                  addItem(item);
                  setModalVisible(false);
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
      {/* <TextInput
        placeholder="Ajouter un produit"
        placeholderTextColor={'#999'}
        value={item}
        onChangeText={setItem}
        style={styles.input}
        autoCorrect={false} // desactiver completement
      />
      <Button title="Ajouter" onPress={addItem} /> */}

      <FlatList
        data={filteredList}
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
    flex: 1,
    width: "auto",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 15,
    backgroundColor: "#ffffffbb",
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginBottom: 15,
  },
  itemContainer: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 5 },
  item: { fontSize: 18 },
  checkbox: { marginRight: 10 },
  itemWithCheckbox: { flexDirection: "row", alignItems: "center" },
  modalBackground: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#00000088" },
  modalContainer: { width: "80%", padding: 20, backgroundColor: "#fff", borderRadius: 10 },
  addButton: {
    backgroundColor: "rgba(0,122,255,0.2)",
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
  },

});

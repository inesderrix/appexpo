import { View, TextInput, Button, FlatList, Text, StyleSheet, Modal, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { useState, useEffect } from "react";
import { Checkbox } from "expo-checkbox";
import BackgroundCircles from "../cercle";
import useAuthStore from "../../store/authStore"
import config from "../../config";
import { useFocusEffect } from "expo-router";


export default function CoursesScreen() {

  const { user, token } = useAuthStore();
  const userId = user.id;
  console.log('id user', userId)

  const [item, setItem] = useState("");

  const [modalVisible, setModalVisible] = useState(false);
  const [search, setSearch] = useState("");

  const [activeItems, setActiveItems] = useState<any[]>([]);
  const [historiqueItems, setHistoriqueItems] = useState<any[]>([]);


  const fetchItems = async () => {
    try {
      const res = await fetch(
        `${config.API_BASE_URL}/items/active?userId=${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      const data = await res.json();
      setActiveItems(data);
    } catch (err) {
      console.error("Erreur fetch items", err);
    }
  };
  const fetchHistoriqueItems = async () => {
    try {
      const res = await fetch(`${config.API_BASE_URL}/items/history?userId=${userId}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await res.json();
      setHistoriqueItems(data);
    } catch (err) {
      console.error("Erreur fetch historique", err);
    }
  };

  const refreshLists = () => {
    fetchItems();
    fetchHistoriqueItems();
  };

  useFocusEffect(React.useCallback(() => {
    refreshLists();
  }, [])
  );


  const addItem = async () => {
    if (!item.trim()) return;

    try {
      await fetch(`${config.API_BASE_URL}/items`, {
        method: "POST",
        headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
          title: item,
          userId: userId,
        }),
      });


      setItem("");
      setModalVisible(false);
      fetchItems();
    } catch (err) {
      console.error("Erreur add item", err);
    }
  };


  const removeItem = async (id: string) => {
    try {
      await fetch(`${config.API_BASE_URL}/items/${id}`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      refreshLists();
    } catch (err) {
      console.error("Erreur delete item", err);
    }
  };


  const handleCheck = async (itemId: string) => {
    console.log('item id', itemId)
    try {
      await fetch(`${config.API_BASE_URL}/items/${itemId}/check`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({ checked: true }),
      });

      refreshLists();
    } catch (err) {
      console.error("Erreur update item", err);
    }
  };

  const clearList = async (type: 'active' | 'history' | 'all' = 'all') => {
    try {
      await fetch(`${config.API_BASE_URL}/items/clear/${userId}?type=${type}`, { method: 'DELETE', headers: {'Authorization': `Bearer ${token}`}});
      fetchItems();
      fetchHistoriqueItems();
    } catch (err) {
      console.error('Erreur vider la liste', err);
    }
  };



  const filteredList = activeItems.filter((i) =>
    i.title.toLowerCase().includes(search.toLowerCase())
  );

  const [clearModalVisible, setClearModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Ma liste de courses</Text>
      </View>

      <BackgroundCircles />
      <View style={styles.content}>

        <View style={styles.searchRow}>
          <TextInput
            placeholder="Rechercher un produit"
            placeholderTextColor="#999"
            value={search}
            onChangeText={setSearch}
            style={[styles.input, styles.searchInput]}
            autoCorrect={false}
          />

          <TouchableOpacity
            style={[styles.actionBtn, styles.btnAdd]}
            onPress={() => {
              setModalVisible(true)
            }}
          >
            <Ionicons name="add" size={26} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionBtn, styles.btnDelete]}
            onPress={() => setClearModalVisible(true)}
          >
            <MaterialIcons name="clear" size={24} color="white" />
          </TouchableOpacity>

        </View>

 <KeyboardAvoidingView style={styles.container}
            behavior="padding"
        >
        <Modal visible={modalVisible} transparent animationType="slide">
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={{ fontSize: 18, marginBottom: 10 }}>Ajouter un produit</Text>
              <TextInput
                placeholderTextColor="#999"
                placeholder="Nom du produit"
                value={item}
                onChangeText={setItem}
                style={styles.input}
              />
              <View style={styles.modalActions}>
                <TouchableOpacity onPress={() => {
                  setItem("");
                  setModalVisible(false);
                }}>
                  <Text style={styles.cancelText}>Annuler</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.buttonSecondary}
                  onPress={() => {
                    addItem();
                    setModalVisible(false);
                  }}
                >
                  <Text style={styles.buttonSecondaryText}>Ajouter</Text>
                </TouchableOpacity>

              </View>
            </View>
          </View>
        </Modal>
        </KeyboardAvoidingView>
        <FlatList
          data={filteredList}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <View style={styles.itemWithCheckbox}>

                <Checkbox
                  style={styles.checkbox}
                  value={item.checked}
                  onValueChange={() => handleCheck(item._id)}
                />
                <Text style={styles.item}>{item.title}</Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  removeItem(item._id)
                }}
              >
                <MaterialIcons name="delete" size={24} color="#888" />
              </TouchableOpacity>
            </View>
          )}
        />
        <Text style={{ marginTop: 20, fontWeight: "bold", fontSize: 16 }}>Historique</Text>
        <FlatList
          data={historiqueItems}
          keyExtractor={(_, index) => `${index}`}
          renderItem={({ item }) => (
            <View style={{ paddingVertical: 4 }}>
              <Text style={{ color: "#888" }}>{item.title}</Text>
            </View>
          )}
          ListEmptyComponent={<Text style={{ color: "#aaa" }}>Aucun historique</Text>}
          style={{ marginBottom: 20, height: 150 }}
        />



        <Modal
          visible={clearModalVisible}
          transparent
          animationType="slide"
        >
          <View style={styles.modalBackground}>
            <View style={styles.modalContainer}>
              <Text style={{ fontSize: 18, marginBottom: 20, fontWeight: "bold" }}>Supprimer les items :</Text>
              <View style={styles.modalBtnSecondary}>
                <TouchableOpacity
                  style={styles.buttonSecondary}
                  onPress={() => { clearList('active'); setClearModalVisible(false); }}
                >
                  <Text style={styles.buttonSecondaryText}>Actifs</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.buttonSecondary}
                  onPress={() => { clearList('history'); setClearModalVisible(false); }}
                >
                  <Text style={styles.buttonSecondaryText}>Historique</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                style={styles.buttonDanger}
                onPress={() => { clearList('all'); setClearModalVisible(false); }}
              >
                <Text style={styles.buttonDangerText}>Tout supprimer</Text>
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
  }, searchInput: {
    flex: 1,
  }, input: {
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
    gap: 8,
    marginBottom: 15,
  },
  itemContainer: { flexDirection: "row", justifyContent: "space-between" ,marginBottom: 16 },
  item: { fontSize: 18 },
  checkbox: { marginRight: 10 },
  itemWithCheckbox: { flexDirection: "row", alignItems: "center" },
  modalBackground: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#00000088" },
  modalContainer: { width: "80%", padding: 20, backgroundColor: "#fff", borderRadius: 10 },
  btnAdd: { backgroundColor: "rgba(0,122,255,0.2)", },
  btnDelete: { backgroundColor: "rgba(255, 0, 0, 0.2)", },
  actionBtn: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: "center",
    alignItems: "center",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.3,
  },
  modalBtnSecondary: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: 'space-between',
  }, buttonSecondary: {
    borderWidth: 1,
    borderColor: "#007AFF",
    paddingVertical: 14,
    borderRadius: 10,
    width: "48%",
    alignItems: "center",
    backgroundColor: "#F5F9FF",
  },
  buttonSecondaryText: {
    color: "#007AFF",
    fontWeight: "600",
    fontSize: 15,
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
  }, cancelText: {
    textAlign: "center",
    color: "#888",
    fontSize: 16,
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 12,
    marginTop: 16,
  },


});

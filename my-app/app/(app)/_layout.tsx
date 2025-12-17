import { Tabs } from "expo-router";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Feather from '@expo/vector-icons/Feather';
import { Ionicons } from "@expo/vector-icons";


export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor:'#007AFF',
        tabBarInactiveTintColor: "#888",
      }}
    >
      <Tabs.Screen name="index" options={{
      title: "Courses",
        tabBarIcon: ({ color }) => <Feather name="list" size={24} color={color} />
        
       }}
       />
      <Tabs.Screen name="historique" options={{
        title: "Historique",
        tabBarIcon: ({ color }) => <MaterialCommunityIcons name="history" size={24} color={color} /> }} />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profil",
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-outline" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

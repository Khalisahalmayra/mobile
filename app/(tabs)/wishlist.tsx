// screens/WishlistScreen.tsx
import React from "react";
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity 
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function WishlistScreen() {

  const wishlist = [
    {
      id: "1",
      title: "Laskar Pelangi",
      category: "Fiksi",
      author: "Andrea Hirata",
      image:
        "https://cdn.gramedia.com/uploads/items/9789793062792_New-Edition-Laskar-Pelangi.jpg",
    },
    {
      id: "2",
      title: "Filosofi Teras",
      category: "Pengembangan Diri",
      author: "Henry Manampiring",
      image:
        "https://cdn.gramedia.com/uploads/items/9786020633176.jpg",
    },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>

      <Text style={styles.header}>Wishlist Buku</Text>

      <View style={styles.grid}>
        {wishlist.map((item) => (
          <View key={item.id} style={styles.card}>

            {/* ❤️ LOVE RED ICON */}
            <TouchableOpacity style={styles.loveIcon}>
              <AntDesign name="heart" size={20} color="red" />
            </TouchableOpacity>

            <Image
              source={{ uri: item.image }}
              style={styles.bookImage}
            />

            <Text style={styles.title}>{item.title}</Text>

            <View style={styles.badge}>
              <Text style={styles.badgeText}>{item.category}</Text>
            </View>

            <Text style={styles.author}>by {item.author}</Text>
          </View>
        ))}
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
    color: "#333",
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    marginBottom: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 10,
    borderWidth: 1,
    borderColor: "#eee",
    position: "relative",
  },

  /* ❤️ LOVE ICON */
  loveIcon: {
    position: "absolute",
    top: 8,
    left: 8,
    zIndex: 10,
    backgroundColor: "#fff",
    padding: 5,
    borderRadius: 50,
    elevation: 2,
  },

  /* 📘 COVER BUKU FIXED RATIO 2:3 */
  bookImage: {
    width: "100%",
    aspectRatio: 2 / 3,   // Rasio cover buku
    borderRadius: 8,
    marginBottom: 8,
    resizeMode: "cover",
  },

  title: {
    fontSize: 15,
    fontWeight: "700",
    marginBottom: 4,
    color: "#333",
  },

  badge: {
    backgroundColor: "#4c77ff",
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginBottom: 6,
  },
  badgeText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "600",
  },

  author: {
    fontSize: 13,
    color: "#555",
  },
});

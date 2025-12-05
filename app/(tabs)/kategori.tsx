import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function CategoryScreen() {
  const categories = ["Novel", "Pelajaran", "Fiksi", "Non-Fiksi"];

  const books = [
    {
      id: "1",
      title: "Laskar Pelangi",
      category: "Novel",
      author: "Andrea Hirata",
      image:
        "https://cdn.gramedia.com/uploads/items/9789793062792_New-Edition-Laskar-Pelangi.jpg",
    },
    {
      id: "2",
      title: "Filosofi Teras",
      category: "Fiksi",
      author: "Henry Manampiring",
      image: "https://cdn.gramedia.com/uploads/items/9786020633176.jpg",
    },
    {
      id: "3",
      title: "Matematika SMA",
      category: "Pelajaran",
      author: "Tim Penyusun",
      image:
        "https://cdn.gramedia.com/uploads/items/matematika_sma_kelas_x.jpg",
    },
    {
      id: "4",
      title: "Atomic Habits",
      category: "Non-Fiksi",
      author: "James Clear",
      image:
        "https://cdn.gramedia.com/uploads/items/9786020521701_atomic_habits.jpg",
    },
    {
      id: "5",
      title: "Dilan 1990",
      category: "Novel",
      author: "Pidi Baiq",
      image: "https://cdn.gramedia.com/uploads/items/9786027870413_dilan.jpg",
    },
    {
      id: "6",
      title: "Sosiologi SMA",
      category: "Pelajaran",
      author: "Tim",
      image:
        "https://cdn.gramedia.com/uploads/items/sosiologi_sma_kelas_x.jpg",
    },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 50 }}>

      {/* TITLE */}
      <Text style={styles.header}>Kategori Buku</Text>

      {/* CATEGORY BAR */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryScroll}>
        {categories.map((cat, i) => (
          <TouchableOpacity key={i} style={styles.categoryPill}>
            <Text style={styles.categoryText}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* GRID 3 KOLOM */}
      <View style={styles.grid}>
        {books.map((item) => (
          <View key={item.id} style={styles.card}>
            {/* ❤️ ICON */}
            <TouchableOpacity style={styles.loveIcon}>
              <AntDesign name="heart" size={18} color="red" />
            </TouchableOpacity>

            <Image source={{ uri: item.image }} style={styles.bookImage} />

            <Text style={styles.title} numberOfLines={2}>
              {item.title}
            </Text>

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
    marginBottom: 10,
    color: "#333",
  },

  /* CATEGORY SCROLL */
  categoryScroll: {
    marginBottom: 20,
  },
  categoryPill: {
    backgroundColor: "#4c77ff",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  categoryText: {
    color: "#fff",
    fontWeight: "600",
  },

  /* GRID 3 KOLOM */
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  card: {
    width: "30.5%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 8,
    borderWidth: 1,
    borderColor: "#eee",
    marginBottom: 18,
    position: "relative",
  },

  loveIcon: {
    position: "absolute",
    top: 6,
    left: 6,
    zIndex: 10,
    backgroundColor: "#fff",
    padding: 4,
    borderRadius: 50,
    elevation: 2,
  },

  bookImage: {
    width: "100%",
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },

  title: {
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 2,
    color: "#333",
  },

  badge: {
    backgroundColor: "#4c77ff",
    alignSelf: "flex-start",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    marginBottom: 4,
  },
  badgeText: {
    color: "#fff",
    fontSize: 10,
    fontWeight: "600",
  },

  author: {
    fontSize: 11,
    color: "#666",
  },
});

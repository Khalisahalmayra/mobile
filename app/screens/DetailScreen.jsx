// screens/DetailScreen.js
import React from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

export default function DetailScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const book = params.book ? JSON.parse(params.book) : {
    image: "https://cdn.gramedia.com/uploads/items/9789793062792_New-Edition-Laskar-Pelangi.jpg",
    title: "Judul Buku",
    author: "Penulis",
    publisher: "Penerbit",
    year: "Tahun",
    category: "Kategori",
    stock: 0,
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
  };

  return (
    <ScrollView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Text style={styles.backBtnText}>← Kembali</Text>
      </TouchableOpacity>

      {/* Cover Buku */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: book.image }} style={styles.bookImage} />
      </View>

      {/* Judul */}
      <Text style={styles.title}>{book.title}</Text>

      {/* Tabel Info Buku */}
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text style={styles.tableKey}>Penulis</Text>
          <Text style={styles.tableValue}>{book.author}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableKey}>Penerbit</Text>
          <Text style={styles.tableValue}>{book.publisher || "Gramedia"}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableKey}>Tahun Terbit</Text>
          <Text style={styles.tableValue}>{book.year || "2025"}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableKey}>Kategori</Text>
          <Text style={styles.tableValue}>{book.category}</Text>
        </View>
        <View style={styles.tableRow}>
          <Text style={styles.tableKey}>Stok</Text>
          <Text style={styles.tableValue}>{book.stock ?? 5}</Text>
        </View>
      </View>

      {/* Deskripsi */}
      <Text style={styles.sectionTitle}>Deskripsi</Text>
      <Text style={styles.description}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
      </Text>

      {/* Tombol Wishlist dan Pinjam */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.wishlistBtn}>
          <Text style={styles.buttonText}>Tambahkan Wishlist</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.borrowBtn}
          onPress={() => router.push("/screens/PinjamScreen")} // Arahkan ke PinjamScreen
        >
          <Text style={styles.buttonText}>Pinjam Sekarang</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // ================== CONTAINER ==================
  container: { 
    flex: 1, 
    padding: 15, 
    backgroundColor: "#fff" 
  },

  // ================== BACK BUTTON ==================
  backBtn: { 
    marginBottom: 10 
  },
  backBtnText: { 
    color: "#1e90ff", 
    fontSize: 16, 
    fontWeight: "600" 
  },

  // ================== BOOK IMAGE ==================
  imageContainer: { 
    alignItems: "center", 
    marginBottom: 15 
  },
  bookImage: { 
    width: 150, 
    height: 220, 
    borderRadius: 8, 
    backgroundColor: "#ccc" 
  },

  // ================== TITLE ==================
  title: { 
    fontSize: 20, 
    fontWeight: "bold", 
    textAlign: "center", 
    marginBottom: 15 
  },

  // ================== TABLE INFO ==================
  table: { 
    borderWidth: 1, 
    borderColor: "#ccc", 
    borderRadius: 8, 
    marginBottom: 20 
  },
  tableRow: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    paddingVertical: 10, 
    paddingHorizontal: 12, 
    borderBottomWidth: 1, 
    borderBottomColor: "#eee" 
  },
  tableKey: { 
    fontWeight: "600", 
    color: "#444" 
  },
  tableValue: { 
    color: "#555" 
  },

  // ================== DESCRIPTION ==================
  sectionTitle: { 
    fontSize: 18, 
    fontWeight: "bold", 
    marginBottom: 8 
  },
  description: { 
    fontSize: 14, 
    lineHeight: 20, 
    color: "#333", 
    marginBottom: 20 
  },

  // ================== BUTTONS ==================
  buttonContainer: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    gap: 10, 
    marginBottom: 30 
  },
  wishlistBtn: { 
    flex: 1, 
    backgroundColor: "#ffcc00", 
    paddingVertical: 12, 
    borderRadius: 8, 
    alignItems: "center" 
  },
  borrowBtn: { 
    flex: 1, 
    backgroundColor: "#4c77ff", 
    paddingVertical: 12, 
    borderRadius: 8, 
    alignItems: "center" 
  },
  buttonText: { 
    color: "#fff", 
    fontWeight: "bold", 
    fontSize: 16 
  }
});

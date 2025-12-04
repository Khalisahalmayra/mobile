// screens/DetailScreen.js
import React from "react";
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useRouter, useSearchParams } from "expo-router";

export default function DetailScreen() {
  const router = useRouter();
  const params = useSearchParams(); // ambil data dari query params

  const book = {
    image: params.image,
    title: params.title,
    category: params.category,
    author: params.author,
    description:
      "Ini adalah deskripsi buku. Kamu bisa menambahkan ringkasan atau informasi penting tentang buku ini di sini.",
  };

  return (
    <ScrollView style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Text style={styles.backBtnText}>← Kembali</Text>
      </TouchableOpacity>

      {/* Cover Buku */}
      <Image source={{ uri: book.image }} style={styles.bookImage} />

      {/* Info Buku */}
      <Text style={styles.title}>{book.title}</Text>
      <View style={styles.categoryBox}>
        <Text style={styles.categoryText}>{book.category}</Text>
      </View>
      <Text style={styles.authorText}>by {book.author}</Text>

      <Text style={styles.sectionTitle}>Deskripsi</Text>
      <Text style={styles.description}>{book.description}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#fff",
  },
  backBtn: {
    marginBottom: 10,
  },
  backBtnText: {
    color: "#1e90ff",
    fontSize: 16,
    fontWeight: "600",
  },
  bookImage: {
    width: "100%",
    height: 300,
    borderRadius: 12,
    marginBottom: 15,
    backgroundColor: "#ccc",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 5,
  },
  categoryBox: {
    backgroundColor: "#4c77ff",
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 6,
    alignSelf: "flex-start",
    marginBottom: 5,
  },
  categoryText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "bold",
  },
  authorText: {
    fontSize: 16,
    color: "#444",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: "#333",
  },
});

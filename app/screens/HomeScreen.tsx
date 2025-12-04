import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router"; // <- import useRouter

const books = [
  {
    image: "https://cdn.gramedia.com/uploads/items/9789793062792_New-Edition-Laskar-Pelangi.jpg",
    title: "Laskar Pelangi",
    category: "Fiksi",
    author: "Andrea Hirata",
  },
  {
    image: "https://images-cdn.bukuext.com/thumbnail?width=400&type=auto&url=https://cdn.bukuext.com/covers/iaxwv0dnxe5nvqjyyvcy28x2phhljlvsb9zwjxe0.jpg",
    title: "Belajar React Native",
    category: "Teknologi",
    author: "Budi Santoso",
  },
  {
    image: "https://tse4.mm.bing.net/th/id/OIP.ljR2LBujYm63BvIGLxxvRQHaLU?pid=Api&P=0&h=220",
    title: "Sejarah Dunia",
    category: "Sejarah",
    author: "H. Kartono",
  },
  {
    image: "https://elibrary.bsi.ac.id/assets/images/buku/212675.jpg",
    title: "Psikologi Remaja",
    category: "Psikologi",
    author: "Rina Amelia",
  },
];

export default function HomeScreen() {
  const router = useRouter(); // <- inisialisasi router

  return (
    <ScrollView style={styles.container}>
      {/* HEADER */}
      <View style={styles.header}>
        {/* Hamburger */}
        <TouchableOpacity style={styles.menuBtn}>
          <Ionicons name="menu" size={28} />
        </TouchableOpacity>

        {/* Search Bar */}
        <View style={styles.searchBox}>
          <Ionicons name="search" size={20} />
          <TextInput placeholder="Search books..." style={styles.searchInput} />
        </View>

        {/* Profile Photo */}
        <TouchableOpacity 
          style={styles.profileBox} 
          onPress={() => router.push("/screens/ProfileScreen")} // navigasi ke Profile
        >
          <Image
            source={{ uri: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png" }}
            style={styles.profileImg}
          />
        </TouchableOpacity>
      </View>

      {/* WELCOME BANNER */}
      <View style={styles.banner}>
        <Text style={styles.bannerText}>
          Selamat datang! 
          Kamu punya beberapa buku menarik untuk dijelajahi hari ini.
          Yuk mulai menambah wawasanmu di Perpustakaan Starbhak.
        </Text>

        <TouchableOpacity style={styles.bannerBtn}>
          <Text style={styles.bannerBtnText}>Lihat Koleksi Buku Sekarang</Text>
        </TouchableOpacity>
      </View>

      {/* BUKU TERBARU */}
      <Text style={styles.sectionTitle}>Koleksi Buku Terbaru</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10 }}
        style={{ marginBottom: 20 }}
      >
        {books.map((book, i) => (
          <View key={i} style={styles.bookCard}>
            <Image source={{ uri: book.image }} style={styles.bookImage} />
            <Text style={styles.bookTitle}>{book.title}</Text>
            <View style={styles.categoryBox}>
              <Text style={styles.categoryText}>{book.category}</Text>
            </View>
            <Text style={styles.authorText}>by {book.author}</Text>
          </View>
        ))}
      </ScrollView>

      {/* COMING SOON */}
      <Text style={styles.sectionTitle}>Buku Yang Akan Segera Datang</Text>
      <View style={styles.comingSoonBanner}>
        <View style={styles.comingContent}>
          <Text style={styles.comingText}>
            Akan Segera Datang di Pusat Literasi Starbhak !{"\n"}
            Untukmu, Anak Bungsu — karya Hidya Hanin
          </Text>
          <Image
            source={{ uri: "https://down-id.img.susercontent.com/file/id-11134207-7rbk0-m7653xtw4y3xe9" }}
            style={styles.comingImage}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 15 },
  header: { flexDirection: "row", alignItems: "center", gap: 10 },
  menuBtn: { marginTop: 8 },
  searchBox: { flex: 1, flexDirection: "row", alignItems: "center", backgroundColor: "#eee", paddingHorizontal: 10, height: 45, borderRadius: 10 },
  searchInput: { marginLeft: 10, flex: 1 },
  profileBox: { marginLeft: 5 },
  profileImg: { width: 40, height: 40, borderRadius: 20, backgroundColor: "#ccc" },
  banner: { backgroundColor: "#4c77ff", padding: 20, borderRadius: 12, marginTop: 20 },
  bannerText: { color: "#fff", fontSize: 16, fontWeight: "bold", marginBottom: 15 },
  bannerBtn: { backgroundColor: "#fff", paddingVertical: 10, borderRadius: 8, alignItems: "center" },
  bannerBtnText: { color: "#4c77ff", fontWeight: "bold", fontSize: 16 },
  sectionTitle: { fontSize: 18, fontWeight: "bold", marginTop: 25, marginBottom: 10 },
  bookCard: { width: 110, marginRight: 12 },
  bookImage: { width: 110, height: 170, borderRadius: 10, backgroundColor: "#ccc" },
  bookTitle: { marginTop: 5, fontWeight: "600" },
  categoryBox: { backgroundColor: "#4c77ff", paddingVertical: 3, paddingHorizontal: 8, borderRadius: 6, alignSelf: "flex-start", marginTop: 4 },
  categoryText: { color: "#fff", fontSize: 12, fontWeight: "bold" },
  authorText: { marginTop: 4, color: "#444", fontSize: 13 },
  comingSoonBanner: { backgroundColor: "#ffcc00", padding: 15, borderRadius: 12, marginBottom: 40, alignItems: "center" },
  comingContent: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: 10 },
  comingText: { flex: 1, fontSize: 14, fontWeight: "bold", color: "#333" },
  comingImage: { width: 80, height: 110, borderRadius: 8 },
});

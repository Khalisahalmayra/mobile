// screens/HistoryScreen.tsx
import React, { useState } from "react";
import { 
  View, 
  Text, 
  Image, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet 
} from "react-native";
import { useRouter } from "expo-router";

interface HistoryItem {
  id: string;
  image: string;
  title: string;
  startDate: string;
  endDate: string;
  status: "Menunggu" | "Dipinjam" | "Selesai" | "Telat";
}

export default function HistoryScreen() {
  const router = useRouter();

  const [history] = useState<HistoryItem[]>([
    {
      id: "1",
      image: "https://cdn.gramedia.com/uploads/items/9789793062792_New-Edition-Laskar-Pelangi.jpg",
      title: "Laskar Pelangi",
      startDate: "10 Januari 2025",
      endDate: "17 Januari 2025",
      status: "Dipinjam"
    },
    {
      id: "2",
      image: "https://cdn.gramedia.com/uploads/items/9786020633176.jpg",
      title: "Filosofi Teras",
      startDate: "01 Januari 2025",
      endDate: "08 Januari 2025",
      status: "Selesai"
    },
    {
      id: "3",
      image: "https://cdn.gramedia.com/uploads/items/9786020379500_Bumi.jpg",
      title: "Bumi",
      startDate: "20 Desember 2024",
      endDate: "27 Desember 2024",
      status: "Telat"
    },
    {
      id: "4",
      image: "https://cdn.gramedia.com/uploads/items/ID_SEKDA2022MTH12SEKA.jpg",
      title: "Sejarah Dunia",
      startDate: "15 Januari 2025",
      endDate: "22 Januari 2025",
      status: "Menunggu"
    }
  ]);

  const statusColors = {
    Menunggu: "#f0ad4e",
    Dipinjam: "#0d6efd",
    Selesai: "#28a745",
    Telat: "#dc3545",
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>

      {/* 🔙 TOMBOL KEMBALI */}
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => router.push("/(tabs)/HomeScreen")}
      >
        <Text style={styles.backIcon}>←</Text>
        <Text style={styles.backText}>Kembali</Text>
      </TouchableOpacity>

      {/* HEADER */}
      <Text style={styles.header}>Riwayat Peminjaman</Text>

      {history.map((item) => (
        <View key={item.id} style={styles.card}>
          <Image source={{ uri: item.image }} style={styles.bookImage} />

          <View style={{ flex: 1 }}>
            <Text style={styles.title}>{item.title}</Text>

            <Text style={styles.dateText}>Mulai: {item.startDate}</Text>
            <Text style={styles.dateText}>Kembali: {item.endDate}</Text>

            <Text
              style={[
                styles.status,
                { backgroundColor: statusColors[item.status] }
              ]}
            >
              {item.status}
            </Text>

            <TouchableOpacity 
              style={styles.detailBtn}
              onPress={() => router.push(`/screens/PinjamScreen?id=${item.id}`)}
            >
              <Text style={styles.detailBtnText}>Detail</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15
  },

  /* 🔙 BUTTON KEMBALI */
  backButton: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  backIcon: {
    fontSize: 20,
    marginRight: 6,
    color: "#4c77ff",
  },
  backText: {
    fontSize: 16,
    color: "#4c77ff",
    fontWeight: "600",
  },

  header: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
    color: "#333"
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#f8f9fa",
    padding: 12,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#e9ecef"
  },
  bookImage: {
    width: 70,
    height: 100,
    borderRadius: 8,
    marginRight: 12
  },
  title: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 6,
    color: "#333"
  },
  dateText: {
    fontSize: 14,
    color: "#555"
  },
  status: {
    marginTop: 8,
    alignSelf: "flex-start",
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
    color: "#fff",
    fontSize: 13,
    fontWeight: "700"
  },
  detailBtn: {
    marginTop: 10,
    paddingVertical: 6,
    paddingHorizontal: 14,
    backgroundColor: "#4c77ff",
    borderRadius: 8,
    alignSelf: "flex-start"
  },
  detailBtnText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14
  }
});

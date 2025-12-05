import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

type IconName = keyof typeof Ionicons.glyphMap;

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  icon: IconName;
  color: string;
}

export default function NotificationScreen() {
  const notifications: NotificationItem[] = [
    {
      id: "1",
      title: "Buku Baru Telah Ditambahkan",
      message: "Buku 'Laskar Pelangi Edisi Baru' sekarang tersedia.",
      time: "5 menit lalu",
      icon: "book",
      color: "#4c77ff",
    },
    {
      id: "2",
      title: "Peringatan Pengembalian Buku",
      message: "Buku 'Filosofi Teras' harus dikembalikan besok.",
      time: "1 jam lalu",
      icon: "alert-circle",
      color: "#ff9800",
    },
    {
      id: "3",
      title: "Promo Buku",
      message: "Diskon 50% untuk kategori Novel minggu ini!",
      time: "2 hari lalu",
      icon: "pricetag",
      color: "#e91e63",
    },
    {
      id: "4",
      title: "Akun Berhasil Diperbarui",
      message: "Profil Anda telah diperbarui.",
      time: "3 hari lalu",
      icon: "checkmark-circle",
      color: "#4caf50",
    },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 30 }}>
      <Text style={styles.header}>Notifikasi</Text>

      {notifications.map((item) => (
        <TouchableOpacity key={item.id} style={styles.card}>
          <View style={[styles.iconBox, { backgroundColor: item.color + "20" }]}>
            <Ionicons name={item.icon} size={26} color={item.color} />
          </View>

          <View style={styles.textBox}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.message}>{item.message}</Text>
            <Text style={styles.time}>{item.time}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 22,
    fontWeight: "700",
    marginBottom: 20,
    color: "#333",
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#fafafa",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#eee",
  },
  iconBox: {
    width: 50,
    height: 50,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  textBox: {
    flex: 1,
  },
  title: {
    fontSize: 15,
    fontWeight: "700",
    color: "#333",
  },
  message: {
    fontSize: 13,
    color: "#555",
    marginVertical: 3,
  },
  time: {
    fontSize: 12,
    color: "#999",
  },
});

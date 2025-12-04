import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { router } from "expo-router";

export default function RegisterScreen() {
  const [nama, setNama] = useState("");
  const [kelas, setKelas] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleRegister = () => {
    if (!nama || !kelas || !email || !password || !confirm) {
      alert("Semua field wajib diisi");
      return;
    }

    if (password !== confirm) {
      alert("Password tidak sama");
      return;
    }

    // nanti bisa tambahkan API register di sini
    alert("Registrasi berhasil!");

    // kembali ke halaman login
    router.replace("/screens/LoginScreen");
  };

  return (
    <View style={styles.container}>
      {/* Pesan Selamat Datang */}
      <Text style={styles.welcomeText}>
        Selamat datang! Segera daftarkan akun Anda untuk meminjam secara mudah di Pusat Literasi Starbhak
      </Text>

      <Text style={styles.title}>Daftar Akun</Text>

      <TextInput
        style={styles.input}
        placeholder="Nama Lengkap"
        value={nama}
        onChangeText={setNama}
      />

      <TextInput
        style={styles.input}
        placeholder="Kelas"
        value={kelas}
        onChangeText={setKelas}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        keyboardType="email-address"
        onChangeText={setEmail}
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TextInput
        style={styles.input}
        placeholder="Konfirmasi Password"
        secureTextEntry
        value={confirm}
        onChangeText={setConfirm}
      />

      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Daftar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/screens/LoginScreen")}>
        <Text style={styles.link}>Sudah punya akun? Masuk</Text>
      </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#fff",
  },
  welcomeText: {
    textAlign: "center",
    fontSize: 16,
    color: "#444",
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    padding: 14,
    borderRadius: 10,
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#000", // tombol diubah menjadi hitam
    padding: 16,
    borderRadius: 10,
    marginTop: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 17,
    textAlign: "center",
    fontWeight: "600",
  },
  link: {
    marginTop: 18,
    color: "#1e90ff",
    textAlign: "center",
    fontSize: 15,
  },
});

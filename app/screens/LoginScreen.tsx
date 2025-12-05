import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { router } from "expo-router";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // ga pake API, langsung masuk ke tabs/home
    router.replace("/(tabs)/home");
  };

  return (
    <View style={styles.container}>
      {/* Pesan Selamat Datang */}
      <Text style={styles.welcomeText}>
        Selamat datang kembali di Pusat Literasi Starbhak, Segera jelajahi buku terbaru!
      </Text>

      <Text style={styles.title}>Login</Text>

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

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Masuk</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/screens/RegisterScreen")}>
        <Text style={styles.link}>Belum punya akun? Daftar</Text>
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
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 32,
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

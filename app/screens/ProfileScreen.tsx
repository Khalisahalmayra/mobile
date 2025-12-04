import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router"; // <- import useRouter

export default function ProfileScreen() {
  const router = useRouter(); // <- inisialisasi router

  const [photo, setPhoto] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  );
  const [nama, setNama] = useState("Andrea Hirata");
  const [kelas, setKelas] = useState("12 IPA 1");
  const [email, setEmail] = useState("andre@example.com");
  const [password, setPassword] = useState("12345678");

  // Fungsi untuk pilih foto dari gallery
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission Denied", "Izin akses galeri diperlukan!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  };

  // Fungsi hapus foto
  const removePhoto = () => {
    setPhoto(
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    );
  };

  // Fungsi simpan perubahan (dummy)
  const saveProfile = () => {
    Alert.alert("Berhasil", "Data profile berhasil diperbarui!");
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Text style={styles.backBtnText}>← Kembali</Text>
      </TouchableOpacity>

      {/* Photo Profile */}
      <Image source={{ uri: photo }} style={styles.photo} />
      <View style={styles.photoButtons}>
        <TouchableOpacity style={styles.photoBtn} onPress={pickImage}>
          <Text style={styles.photoBtnText}>Ubah Foto</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.photoBtn, { backgroundColor: "#ff4d4d" }]}
          onPress={removePhoto}
        >
          <Text style={styles.photoBtnText}>Hapus Foto</Text>
        </TouchableOpacity>
      </View>

      {/* Form Profile */}
      <TextInput
        style={styles.input}
        value={nama}
        onChangeText={setNama}
        placeholder="Nama Lengkap"
      />
      <TextInput
        style={styles.input}
        value={kelas}
        onChangeText={setKelas}
        placeholder="Kelas"
      />
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        placeholder="Password"
        secureTextEntry
      />

      <TouchableOpacity style={styles.saveBtn} onPress={saveProfile}>
        <Text style={styles.saveBtnText}>Simpan Perubahan</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
  photo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: "center",
    marginBottom: 10,
    backgroundColor: "#ccc",
  },
  photoButtons: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  photoBtn: {
    backgroundColor: "#1e90ff",
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  photoBtnText: {
    color: "#fff",
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#aaa",
    borderRadius: 10,
    padding: 14,
    marginBottom: 16,
    fontSize: 16,
  },
  saveBtn: {
    backgroundColor: "#000",
    padding: 16,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  saveBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  Alert,
  Modal,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";

export default function ProfileScreen() {
  const router = useRouter();

  const [photo, setPhoto] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  );
  const [nama, setNama] = useState("Andrea Hirata");
  const [kelas, setKelas] = useState("12 IPA 1");
  const [email, setEmail] = useState("andre@example.com");
  const [password, setPassword] = useState("12345678");

  const [logoutModal, setLogoutModal] = useState(false); // <- state modal logout

  // Pilih foto
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

  const removePhoto = () => {
    setPhoto(
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    );
  };

  const saveProfile = () => {
    Alert.alert("Berhasil", "Data profile berhasil diperbarui!");
  };

  // Fungsi logout
  const handleLogout = () => {
    setLogoutModal(false);
    router.replace("/screens/LoginScreen"); // ARAHKAN KE HALAMAN LOGIN
  };

  return (
    <View style={styles.container}>
      {/* Back */}
      <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
        <Text style={styles.backBtnText}>← Kembali</Text>
      </TouchableOpacity>

      {/* Foto */}
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

      {/* Form */}
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

      {/* Tombol Simpan */}
      <TouchableOpacity style={styles.saveBtn} onPress={saveProfile}>
        <Text style={styles.saveBtnText}>Simpan Perubahan</Text>
      </TouchableOpacity>

      {/* Tombol Logout */}
      <TouchableOpacity
        style={styles.logoutBtn}
        onPress={() => setLogoutModal(true)}
      >
        <Text style={styles.logoutBtnText}>Logout</Text>
      </TouchableOpacity>

      {/* MODAL LOGOUT */}
      <Modal
        transparent
        animationType="fade"
        visible={logoutModal}
        onRequestClose={() => setLogoutModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Konfirmasi Logout</Text>
            <Text style={styles.modalDesc}>
              Apakah kamu yakin ingin keluar akun?
            </Text>

            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: "#ccc" }]}
                onPress={() => setLogoutModal(false)}
              >
                <Text style={styles.modalBtnText}>Batal</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: "#ff4d4d" }]}
                onPress={handleLogout}
              >
                <Text style={[styles.modalBtnText, { color: "#fff" }]}>
                  Logout
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: "#fff" 
  },

  backBtn: { 
    marginBottom: 10 
  },

  backBtnText: { 
    color: "#1e90ff", 
    fontSize: 16, 
    fontWeight: "600" 
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
    marginBottom: 20 
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
    fontWeight: "600" 
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
    fontWeight: "600" 
  },

  /* Logout */
  logoutBtn: {
    backgroundColor: "#ff4d4d",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 15,
  },

  logoutBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  /* Modal */
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  
  modalBox: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
    elevation: 5,
  },

  modalTitle: { 
    fontSize: 18, 
    fontWeight: "700", 
    marginBottom: 10 
  },

  modalDesc: { 
    fontSize: 14, 
    color: "#555", 
    marginBottom: 20 
  },

  modalButtons: { 
    flexDirection: "row", 
    justifyContent: "space-between" 
  },

  modalBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    marginHorizontal: 5,
    alignItems: "center",
  },
  modalBtnText: { 
    fontSize: 16, 
    fontWeight: "600" 
  },
});

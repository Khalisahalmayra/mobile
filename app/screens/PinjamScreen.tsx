// screens/TransactionScreen.tsx
import React, { useState } from "react";
import { 
  View, 
  Text, 
  Image, 
  ScrollView, 
  TouchableOpacity, 
  Modal,
  TextInput, // Pastikan TextInput diimport
  Alert,
  StyleSheet
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

// Definisikan tipe untuk buku
interface Book {
  image: string;
  title: string;
  author: string;
  publisher: string;
  year: string;
  category: string;
  stock: number;
}

// Definisikan tipe untuk quick date options
interface QuickDateOption {
  label: string;
  days: number;
}

export default function TransactionScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ book?: string }>();

  // Inisialisasi data buku dengan tipe yang aman
  const [book] = useState<Book>(() => {
    try {
      if (params.book) {
        return JSON.parse(params.book) as Book;
      }
    } catch (error) {
      console.error("Error parsing book data:", error);
    }
    
    // Return default book jika parsing gagal
    return {
      image: "https://cdn.gramedia.com/uploads/items/9789793062792_New-Edition-Laskar-Pelangi.jpg",
      title: "Judul Buku",
      author: "Penulis",
      publisher: "Penerbit",
      year: "2025",
      category: "Kategori",
      stock: 5,
    };
  });

  const [days, setDays] = useState<number>(7);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  
  // State untuk tanggal manual (format: DD/MM/YYYY)
  const today = new Date();
  const defaultDate = `${String(today.getDate()).padStart(2, '0')}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;
  const [dateInput, setDateInput] = useState<string>(defaultDate);

  // Fungsi untuk parse tanggal dari string
  const parseDate = (dateStr: string): Date => {
    const parts = dateStr.split('/').map(Number);
    if (parts.length !== 3 || isNaN(parts[0]) || isNaN(parts[1]) || isNaN(parts[2])) {
      return new Date();
    }
    // Validasi tanggal: bulan 1-12
    if (parts[1] < 1 || parts[1] > 12) {
      return new Date();
    }
    return new Date(parts[2], parts[1] - 1, parts[0]);
  };

  // Dapatkan tanggal mulai
  const startDate: Date = parseDate(dateInput);

  // Hitung tanggal kembali
  const returnDate = new Date(startDate);
  returnDate.setDate(returnDate.getDate() + days);

  // Format tanggal untuk display
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('id-ID', { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric' 
    });
  };

  // Tombol cepat tanggal
  const quickDateOptions: QuickDateOption[] = [
    { label: "Hari Ini", days: 0 },
    { label: "Besok", days: 1 },
    { label: "Lusa", days: 2 }
  ];

  const setQuickDate = (daysToAdd: number): void => {
    const newDate = new Date();
    newDate.setDate(newDate.getDate() + daysToAdd);
    
    const day = String(newDate.getDate()).padStart(2, '0');
    const month = String(newDate.getMonth() + 1).padStart(2, '0');
    const year = newDate.getFullYear();
    
    setDateInput(`${day}/${month}/${year}`);
  };

  // Validasi tanggal
  const validateDate = (text: string): void => {
    // Hapus karakter selain angka dan slash
    const cleaned = text.replace(/[^0-9/]/g, '');
    let formatted = cleaned;

    // Format otomatis DD/MM/YYYY
    if (cleaned.length >= 2 && cleaned.length < 5 && !cleaned.includes('/')) {
      formatted = cleaned.substring(0, 2) + '/' + cleaned.substring(2);
    } else if (cleaned.length >= 5 && cleaned.length < 8 && cleaned.split('/').length === 2) {
      formatted = cleaned.substring(0, 5) + '/' + cleaned.substring(5);
    }

    // Batasi panjang
    if (formatted.length <= 10) {
      setDateInput(formatted);
    }
  };

  // Konfirmasi peminjaman
  const handleConfirm = (): void => {
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!dateRegex.test(dateInput)) {
      Alert.alert(
        "Format Tanggal Salah",
        "Masukkan tanggal dengan format DD/MM/YYYY",
        [{ text: "OK" }]
      );
      return;
    }

    setModalVisible(true);
    setTimeout(() => {
      setModalVisible(false);
      router.push("/screens/HistoryScreen");
    }, 2000);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
        <Text style={styles.backBtnText}>← Kembali</Text>
      </TouchableOpacity>

      <View style={styles.bookContainer}>
        <Image 
          source={{ uri: book.image }} 
          style={styles.bookImage} 
          resizeMode="cover"
        />
        <View style={styles.bookInfo}>
          <Text style={styles.title}>{book.title}</Text>
          <Text style={styles.infoText}>Penulis: {book.author}</Text>
          <Text style={styles.infoText}>Penerbit: {book.publisher}</Text>
          <Text style={styles.infoText}>Tahun Terbit: {book.year}</Text>
          <Text style={styles.infoText}>Kategori: {book.category}</Text>
          <Text style={styles.infoText}>Stok: {book.stock}</Text>
        </View>
      </View>

      {/* Lama Pinjam */}
      <View style={styles.optionBox}>
        <Text style={styles.optionLabel}>Lama Pinjam (hari)</Text>
        <View style={styles.dayBtnContainer}>
          {[7, 10, 14, 20].map((d) => (
            <TouchableOpacity
              key={d}
              style={[styles.dayBtn, days === d && styles.dayBtnActive]}
              onPress={() => setDays(d)}
            >
              <Text style={days === d ? styles.dayBtnTextActive : styles.dayBtnText}>
                {d} hari
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Tanggal Mulai */}
      <View style={styles.optionBox}>
        <Text style={styles.optionLabel}>Tanggal Mulai Pinjam</Text>
        
        <View style={styles.quickDateContainer}>
          {quickDateOptions.map((option) => (
            <TouchableOpacity
              key={option.label}
              style={styles.quickDateBtn}
              onPress={() => setQuickDate(option.days)}
            >
              <Text style={styles.quickDateText}>{option.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
        
        <TextInput
          style={styles.dateInput}
          value={dateInput}
          onChangeText={validateDate}
          placeholder="DD/MM/YYYY"
          keyboardType="numeric"
          maxLength={10}
        />
        
        <Text style={styles.selectedDateText}>
          Dipilih: {formatDate(startDate)}
        </Text>
      </View>

      {/* Tanggal Kembali */}
      <View style={styles.optionBox}>
        <Text style={styles.optionLabel}>Tanggal Kembali</Text>
        <Text style={styles.returnDate}>{formatDate(returnDate)}</Text>
        <Text style={styles.returnDateSub}>(Setelah {days} hari)</Text>
      </View>

      {/* Warning */}
      <View style={styles.warningBox}>
        <Text style={styles.warningText}>⚠ Denda Buku Hilang: Rp 250.000</Text>
        <Text style={styles.warningText}>⚠ Denda Telat Kembali: Rp 50.000 / hari</Text>
      </View>

      {/* Konfirmasi Button */}
      <TouchableOpacity style={styles.confirmBtn} onPress={handleConfirm}>
        <Text style={styles.confirmBtnText}>Konfirmasi Peminjaman</Text>
      </TouchableOpacity>

      {/* Modal */}
      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalBg}>
          <View style={styles.modalBox}>
            <Text style={styles.modalIcon}>✅</Text>
            <Text style={styles.modalText}>
              Buku berhasil dipinjam!{'\n'}Tunggu konfirmasi dari admin.
            </Text>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#fff" 
  },
  scrollContent: { 
    padding: 15, 
    paddingBottom: 40 
  },
  backBtn: { 
    marginBottom: 10 
  },
  backBtnText: { 
    color: "#1e90ff", 
    fontSize: 16, 
    fontWeight: "600" 
  },
  bookContainer: { 
    flexDirection: "row", 
    marginBottom: 25, 
    backgroundColor: "#f8f9fa", 
    padding: 15, 
    borderRadius: 12, 
    borderWidth: 1, 
    borderColor: "#e9ecef" 
  },
  bookImage: { 
    width: 100, 
    height: 150, 
    borderRadius: 8, 
    backgroundColor: "#ccc" 
  },
  bookInfo: { 
    flex: 1, 
    marginLeft: 15, 
    justifyContent: "center" 
  },
  title: { 
    fontSize: 18, 
    fontWeight: "bold", 
    marginBottom: 8, 
    color: "#333" 
  },
  infoText: { 
    fontSize: 14, 
    color: "#666", 
    marginBottom: 4 
  },
  optionBox: { 
    marginBottom: 25, 
    backgroundColor: "#f8f9fa", 
    padding: 16, 
    borderRadius: 12, 
    borderWidth: 1, 
    borderColor: "#e9ecef" 
  },
  optionLabel: { 
    fontWeight: "700", 
    marginBottom: 12, 
    fontSize: 17, 
    color: "#333" 
  },
  dayBtnContainer: { 
    flexDirection: "row", 
    gap: 10, 
    flexWrap: "wrap" 
  },
  dayBtn: { 
    paddingVertical: 10, 
    paddingHorizontal: 18, 
    borderWidth: 1, 
    borderColor: "#dee2e6", 
    borderRadius: 8, 
    backgroundColor: "#fff", 
    minWidth: 70, 
    alignItems: "center" 
  },
  dayBtnActive: { 
    backgroundColor: "#4c77ff", 
    borderColor: "#4c77ff" 
  },
  dayBtnText: { 
    color: "#666", 
    fontWeight: "600", 
    fontSize: 14 
  },
  dayBtnTextActive: { 
    color: "#fff", 
    fontWeight: "600", 
    fontSize: 14 
  },
  quickDateContainer: { 
    flexDirection: "row", 
    gap: 10, 
    marginBottom: 15 
  },
  quickDateBtn: { 
    paddingVertical: 8, 
    paddingHorizontal: 15, 
    backgroundColor: "#e7f1ff", 
    borderRadius: 20, 
    borderWidth: 1, 
    borderColor: "#cfe2ff" 
  },
  quickDateText: { 
    color: "#0d6efd", 
    fontSize: 14, 
    fontWeight: "600" 
  },
  dateInput: { 
    borderWidth: 1, 
    borderColor: "#ced4da", 
    borderRadius: 8, 
    padding: 12, 
    fontSize: 16, 
    backgroundColor: "#fff", 
    marginBottom: 8 
  },
  selectedDateText: { 
    fontSize: 14, 
    color: "#28a745", 
    fontWeight: "600", 
    marginTop: 8 
  },
  returnDate: { 
    fontSize: 17, 
    fontWeight: "700", 
    color: "#4c77ff", 
    marginBottom: 5 
  },
  returnDateSub: { 
    fontSize: 14, 
    color: "#6c757d", 
    fontStyle: "italic" 
  },
  warningBox: { 
    backgroundColor: "#fff3cd", 
    padding: 18, 
    borderRadius: 12, 
    marginBottom: 30, 
    borderWidth: 1, 
    borderColor: "#ffeaa7" 
  },
  warningText: { 
    color: "#856404", 
    fontWeight: "600", 
    marginBottom: 6, 
    fontSize: 14 
  },
  confirmBtn: { 
    backgroundColor: "#4c77ff", 
    paddingVertical: 16, 
    borderRadius: 12, 
    alignItems: "center", 
    marginBottom: 30 
  },
  confirmBtnText: { 
    color: "#fff", 
    fontWeight: "bold", 
    fontSize: 17 
  },
  modalBg: { 
    flex: 1, 
    backgroundColor: "rgba(0,0,0,0.4)", 
    justifyContent: "center", 
    alignItems: "center" 
  },
  modalBox: { 
    backgroundColor: "#fff", 
    padding: 30, 
    borderRadius: 16, 
    alignItems: "center", 
    marginHorizontal: 25 
  },
  modalIcon: { 
    fontSize: 40, 
    marginBottom: 15 
  },
  modalText: { 
    textAlign: "center", 
    fontSize: 17, 
    fontWeight: "600", 
    color: "#333", 
    lineHeight: 26 
  },
});
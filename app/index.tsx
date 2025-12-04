import React, { useEffect } from "react";
import { 
  View, 
  Text, 
  Image, 
  StyleSheet, 
  ActivityIndicator 
} from "react-native";
import { router } from "expo-router";

export default function HomeSplash() {

  useEffect(() => {
    const timeout = setTimeout(() => {
      router.replace("/screens/LoginScreen"); // arahkan ke login
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/logo.png")}
        style={styles.logo}
      />

      <Text style={styles.appName}>PUSAT LITERASI STARBHAK</Text>

      <ActivityIndicator size="large" color="#000" style={{ marginTop: 20 }} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: "contain",
    marginBottom: 20,
  },
  appName: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1e90ff",
    textAlign: "center",
  },
});

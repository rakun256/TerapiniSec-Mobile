import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Switch,
  Alert,
  StyleSheet,
} from "react-native";
import { login } from "../utils/loginService";
import { useTheme } from "../utils/themeContext";
import { useRouter } from "expo-router";

const LoginScreen = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const { theme, headerFontSize, bodyFontSize } = useTheme();
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const { user } = await login(userName, password, rememberMe);
      Alert.alert("Başarılı Giriş", `Hoş geldiniz, ${user.firstName}`);
      router.replace("/"); // Login sonrası yönlendirme
    } catch (error) {
      Alert.alert("Giriş Hatası", error.message);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.backgroundLight }]}>
      <Text style={[styles.title, { fontSize: headerFontSize, color: theme.textDark }]}>
        Giriş Yap
      </Text>
      <TextInput
        style={[styles.input, { color: theme.textDark, borderColor: theme.accentDark }]}
        placeholder="Kullanıcı Adı"
        placeholderTextColor={theme.textLight}
        value={userName}
        onChangeText={setUserName}
      />
      <TextInput
        style={[styles.input, { color: theme.textDark, borderColor: theme.accentDark }]}
        placeholder="Şifre"
        placeholderTextColor={theme.textLight}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <View style={styles.switchContainer}>
        <Text style={[styles.label, { fontSize: bodyFontSize, color: theme.textDark }]}>
          Beni Hatırla
        </Text>
        <Switch
          value={rememberMe}
          onValueChange={setRememberMe}
          thumbColor={theme.accentDark}
          trackColor={{ false: theme.accentLight, true: theme.accentDark }}
        />
      </View>
      <TouchableOpacity style={[styles.button, { backgroundColor: theme.accentDark }]} onPress={handleLogin}>
        <Text style={[styles.buttonText, { fontSize: bodyFontSize, color: theme.textDark }]}>
          Giriş Yap
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  label: {
    fontWeight: "500",
  },
  button: {
    height: 45,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontWeight: "bold",
  },
});

export default LoginScreen;

import AsyncStorage from "@react-native-async-storage/async-storage";
import { usersData } from "./data/userData";

// Kullanıcı giriş işlemi
export const login = async (userName, password, rememberMe) => {
  const user = usersData.find(
    (u) => u.userName === userName && u.password === password
  );

  if (!user) {
    throw new Error("Geçersiz kullanıcı adı veya şifre");
  }

  // Mock bir token oluşturuyoruz (Gerçek bir sistemde burası API çağrısı ile alınır)
  const token = `mock-jwt-token-${user.id}`;

  // Token'ı kaydediyoruz
  await AsyncStorage.setItem("userToken", token);

  return { user, token };
};

// Kullanıcı çıkış işlemi
export const logout = async () => {
  await AsyncStorage.removeItem("userToken");
};

// Giriş durumunu kontrol eden fonksiyon
export const isAuthenticated = async () => {
  const token = await AsyncStorage.getItem("userToken");

  // Burada gerçek bir sistemde token doğrulama yapılabilir (örneğin süresi dolmuş mu?)
  return !!token;
};

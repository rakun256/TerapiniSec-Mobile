import AsyncStorage from "@react-native-async-storage/async-storage";
import { usersData } from "./data/userData";

export const login = async (userName, password, rememberMe) => {
  const user = usersData.find(
    (u) => u.userName === userName && u.password === password
  );

  if (!user) {
    throw new Error("Geçersiz kullanıcı adı veya şifre");
  }

  const token = `mock-jwt-token-${user.id}`;

  // Token her durumda kaydediliyor
  await AsyncStorage.setItem("userToken", token);

  return { user, token };
};

export const logout = async () => {
  await AsyncStorage.removeItem("userToken");
};

export const isAuthenticated = async () => {
  const token = await AsyncStorage.getItem("userToken");
  return !!token;
};

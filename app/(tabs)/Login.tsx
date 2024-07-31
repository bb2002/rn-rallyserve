import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import getAxios from "../common/getAxios";
import axios, { AxiosError } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

interface ILoginForm {
  username: string;
  password: string;
}

const LoginScreen = () => {
  const [login, setLoginForm] = useState<ILoginForm>({
    username: "",
    password: "",
  });

  const [loginProcess, setLoginProcess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onLoginCallback = async () => {
    setLoginProcess(true);
    try {
      const response = await (
        await getAxios()
      ).post("/auth/login", {
        id: login.username,
        password: login.password,
      });

      if (response.status === 200) {
        const { token } = response.data;
        if (token) {
          await AsyncStorage.setItem("Authorization", token);
          router.push("/OnBoarding");
        }
      }
    } catch (ex: any) {
      if (axios.isAxiosError(ex)) {
        const statusCode = ex.response?.status ?? 0;
        if (statusCode >= 500 && statusCode < 600) {
          setErrorMessage("내부 서버 오류가 발생했습니다.");
        } else if (statusCode >= 400 && statusCode < 500) {
          setErrorMessage("아이디 또는 비밀번호가 잘못되었습니다.");
        } else {
          setErrorMessage("네트워크 상태를 확인해주세요.");
        }
      }
    } finally {
      setLoginProcess(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("@/assets/flag.png")} style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="닉네임을 입력하세요"
        placeholderTextColor="#ccc"
        onChangeText={(text) => setLoginForm({ ...login, username: text })}
      />
      <Text style={styles.errorMessage}>{errorMessage}</Text>
      <TextInput
        style={styles.input}
        placeholder="비밀번호를 입력하세요"
        placeholderTextColor="#ccc"
        secureTextEntry={true}
        onChangeText={(text) => setLoginForm({ ...login, password: text })}
      />
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => onLoginCallback()}
        disabled={loginProcess}
      >
        <Text style={styles.loginButtonText}>로그인</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  icon: {
    width: 50, // adjust this size as necessary
    height: 50, // adjust this size as necessary
    marginBottom: 40,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 10,
    width: "80%",
    backgroundColor: "#f6f6f6",
  },
  loginButton: {
    backgroundColor: "#f39c12",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginTop: 20,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  errorMessage: {
    marginTop: 8,
    marginBottom: 8,
    color: "#d63031",
  },
});

export default LoginScreen;

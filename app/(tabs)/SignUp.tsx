import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import Checkbox from "expo-checkbox";
import getAxios from "../common/getAxios";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

interface IRegisterForm {
  username: string;
  password: string;
  passwordVerify: string;
  policyAgree: boolean;
}

const SignUpScreen = () => {
  const [registerForm, setRegisterForm] = useState<IRegisterForm>({
    username: "",
    password: "",
    passwordVerify: "",
    policyAgree: false,
  });
  const [errorMessage, setErrorMessage] = useState("");

  const onRegisterPressed = async () => {
    if (registerForm.username.length < 4 || registerForm.password.length < 4) {
      setErrorMessage("사용자 이름 또는 비밀번호는 4자리 이상 입력해야합니다.");
      return;
    }

    if (registerForm.password !== registerForm.passwordVerify) {
      setErrorMessage("비밀번호를 다시 확인해주세요.");
      return;
    }

    if (!registerForm.policyAgree) {
      setErrorMessage("개인정보 수집에 동의해주세요.");
      return;
    }

    try {
      const response = await (
        await getAxios()
      ).post("/auth/register", {
        id: registerForm.username,
        password: registerForm.password,
      });

      if (response.status == 200) {
        const { token } = response.data;
        if (token) {
          await AsyncStorage.setItem("Authorization", token);
          router.replace("/OnBoarding");
        }
      }
    } catch (ex) {
      if (axios.isAxiosError(ex)) {
        const statusCode = ex.response?.status ?? 0;
        if (statusCode >= 500 && statusCode < 600) {
          setErrorMessage("내부 서버 오류가 발생했습니다.");
        } else if (statusCode >= 400 && statusCode < 500) {
          setErrorMessage("이미 가입된 계정입니다.");
        } else {
          setErrorMessage("네트워크 상태를 확인해주세요.");
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require("@/assets/flag.png")} style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="닉네임을 입력하세요"
        placeholderTextColor="#ccc"
        onChangeText={(value) =>
          setRegisterForm({ ...registerForm, username: value })
        }
        value={registerForm.username}
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호를 입력하세요"
        placeholderTextColor="#ccc"
        secureTextEntry={true}
        onChangeText={(value) =>
          setRegisterForm({ ...registerForm, password: value })
        }
        value={registerForm.password}
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호를 다시 입력하세요"
        placeholderTextColor="#ccc"
        secureTextEntry={true}
        onChangeText={(value) =>
          setRegisterForm({ ...registerForm, passwordVerify: value })
        }
        value={registerForm.passwordVerify}
      />
      <View style={styles.checkboxContainer}>
        <Checkbox
          value={registerForm.policyAgree}
          onValueChange={(value) =>
            setRegisterForm({ ...registerForm, policyAgree: value })
          }
          style={styles.checkbox}
        />
        <Text style={styles.label}>개인정보 수집 동의</Text>
      </View>
      <Text style={styles.errorMessage}>{errorMessage}</Text>
      <TouchableOpacity style={styles.signUpButton} onPress={onRegisterPressed}>
        <Text style={styles.signUpButtonText}>회원가입</Text>
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
    marginBottom: 20,
    paddingHorizontal: 10,
    width: "80%",
    backgroundColor: "#f6f6f6",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
    color: "#333",
  },
  signUpButton: {
    backgroundColor: "#f39c12",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 20,
  },
  signUpButtonText: {
    color: "#ffffff",
    fontSize: 16,
  },
  errorMessage: {
    marginTop: 8,
    marginBottom: 8,
    color: "#d63031",
  },
});

export default SignUpScreen;

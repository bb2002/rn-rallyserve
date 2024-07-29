import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={require("@/assets/flag.png")} style={styles.icon} />
      <TextInput
        style={styles.input}
        placeholder="닉네임을 입력하세요"
        placeholderTextColor="#ccc"
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호를 입력하세요"
        placeholderTextColor="#ccc"
        secureTextEntry={true}
      />
      <TouchableOpacity style={styles.loginButton}>
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
    marginBottom: 20,
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
});

export default LoginScreen;

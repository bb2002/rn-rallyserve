import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import Checkbox from "expo-checkbox";

const SignUpScreen = () => {
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
      <TextInput
        style={styles.input}
        placeholder="비밀번호를 다시 입력하세요"
        placeholderTextColor="#ccc"
        secureTextEntry={true}
      />
      <View style={styles.checkboxContainer}>
        <Checkbox
          value={false}
          onValueChange={() => {}}
          style={styles.checkbox}
        />
        <Text style={styles.label}>개인정보 수집 동의</Text>
      </View>
      <TouchableOpacity style={styles.signUpButton}>
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
    marginBottom: 20,
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
});

export default SignUpScreen;

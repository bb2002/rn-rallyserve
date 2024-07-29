import { Link, router } from "expo-router";
import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const OnBoardingScreen = () => {
  return (
    <View style={styles.container}>
      <Image source={require("@/assets/flag.png")} style={styles.icon} />
      <Text style={styles.mainText}>봉사 랠리</Text>
      <Text style={styles.subText}>자원봉사 매치메이킹</Text>
      <Text style={styles.description}>
        나만의 자원봉사들을 찾고{"\n"}친구들과 함께 경쟁해볼까요?
      </Text>
      <TouchableOpacity
        style={styles.startButton}
        onPress={() => router.replace("/Register")}
      >
        <Text style={styles.startButtonText}>시작하기</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginButton}>
        <Link style={styles.loginText} href="/Login">
          이미 계정이 있나요? <Text style={styles.loginLink}>로그인</Text>
        </Link>
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
    marginBottom: 20,
  },
  mainText: {
    fontSize: 24,
    color: "#FFA500",
    marginBottom: 10,
  },
  subText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: "#333",
    textAlign: "center",
    marginBottom: 40,
  },
  startButton: {
    backgroundColor: "#FFA500",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginBottom: 20,
  },
  startButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  loginButton: {
    marginTop: 20,
  },
  loginText: {
    color: "#333",
    fontSize: 14,
  },
  loginLink: {
    color: "#FFA500",
    fontWeight: "bold",
  },
});

export default OnBoardingScreen;

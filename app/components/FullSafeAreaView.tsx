import React, { ReactNode } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView, StyleSheet } from "react-native";

type Props = {
  children: ReactNode;
};

export default function FullSafeAreaView({ children }: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={["#FFFEFF", "#F6F5F7", "#F6F5F7"]}
        style={styles.container}
      >
        {children}
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
});

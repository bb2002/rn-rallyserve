import Footer from "@/app/components/Footer";
import FullSafeAreaView from "@/app/components/FullSafeAreaView";
import Header from "@/app/components/Header";
import React from "react";
import { View, Text, ScrollView, StyleSheet, Image } from "react-native";

const events = [
  {
    rank: 1,
    title: "고양이 키우고 간식 받기",
    icon: require("@/assets/icons/gold_medal.png"),
  },
  {
    rank: 2,
    title: "미라클 모닝",
    icon: require("@/assets/icons/silver_medal.png"),
  },
  {
    rank: 3,
    title: "우리 아이에게 선물 보내기",
    icon: require("@/assets/icons/bronze_medal.png"),
  },
  {
    rank: 4,
    title: "친구에게 선물상자 보내기",
    icon: require("@/assets/icons/medal.png"),
  },
  {
    rank: 5,
    title: "오프라인 결제하고 30% 캐시백",
    icon: require("@/assets/icons/medal.png"),
  },
  {
    rank: 6,
    title: "나의 소비 아바타 만들기",
    icon: require("@/assets/icons/medal.png"),
  },
  {
    rank: 7,
    title: "놓친 CU 포인트 알아보기",
    icon: require("@/assets/icons/medal.png"),
  },
  {
    rank: 8,
    title: "주식 100만원 옮기고 혜택받기",
    icon: require("@/assets/icons/medal.png"),
  },
  {
    rank: 9,
    title: "통신 미션하고 포인트 받기",
    icon: require("@/assets/icons/medal.png"),
  },
  {
    rank: 10,
    title: "함께 토스 켜고 포인트 받기",
    icon: require("@/assets/icons/medal.png"),
  },
];

export default function App() {
  return (
    <FullSafeAreaView>
      <Header />
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>랭킹</Text>
          <Text style={styles.headerSubtitle}>현재 커뮤니티 랭킹이에요.</Text>
        </View>
        <View style={styles.tabContainer}>
          <Text style={styles.activeTab}> · 포인트순</Text>
          <Text style={styles.inactiveTab}> · 스타순</Text>
        </View>
        {events.map((event) => (
          <View key={event.rank} style={styles.eventContainer}>
            <Text style={styles.rankingText}>{event.rank}위</Text>
            <View style={styles.iconContainer}>
              <Image source={event.icon} style={styles.icon} />
            </View>
            <Text style={styles.score}>16,384P</Text>
            <Text style={styles.nickname}>{event.title}</Text>
          </View>
        ))}
      </ScrollView>
    </FullSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  eventContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    padding: 8,
  },
  iconContainer: {
    backgroundColor: "#f4f2f6",
    padding: 4,
    borderRadius: 8,
    width: 56,
    height: 56,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 8,
    marginRight: 8,
  },
  icon: {
    width: 32,
    height: 32,
  },
  rankingText: {
    fontSize: 16,
    fontWeight: "bold",
    width: 40,
    textAlign: "right",
    color: "#343c4a",
  },
  score: {
    color: "#f39c12",
    fontWeight: "bold",
    marginRight: 8,
    fontSize: 16,
  },
  nickname: {},
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#666",
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  activeTab: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFAA00",
    marginRight: 20,
  },
  inactiveTab: {
    fontSize: 16,
    color: "#888",
  },
});

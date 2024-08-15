import getAxios from "@/app/common/getAxios";
import Footer from "@/app/components/Footer";
import FullSafeAreaView from "@/app/components/FullSafeAreaView";
import Header from "@/app/components/Header";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";

export default function App() {
  const [ranking, setRanking] = useState<any[]>([]);
  const [mode, setMode] = useState("point");

  useEffect(() => {
    (async () => {
      let response;
      if (mode == "point") {
        response = await (await getAxios()).get("/ranking/point/all");
      }

      if (mode === "star") {
        response = await (await getAxios()).get("/ranking/star/all");
      }

      if (response?.data && Array.isArray(response.data)) {
        setRanking(response.data as any[]);
      }
    })();
  }, [mode]);

  return (
    <FullSafeAreaView>
      <Header />
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>랭킹</Text>
          <Text style={styles.headerSubtitle}>현재 커뮤니티 랭킹이에요.</Text>
        </View>
        <View style={styles.tabContainer}>
          <TouchableOpacity
            onPress={() => {
              setMode("point");
              setRanking([]);
            }}
            style={{ marginRight: 24 }}
          >
            <Text
              style={mode == "point" ? styles.activeTab : styles.inactiveTab}
            >
              {" "}
              · 포인트순
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setMode("star");
              setRanking([]);
            }}
          >
            <Text
              style={mode == "point" ? styles.inactiveTab : styles.activeTab}
            >
              {" "}
              · 스타순
            </Text>
          </TouchableOpacity>
        </View>
        {ranking.map((rank) => (
          <View key={rank.memberId} style={styles.eventContainer}>
            <Text style={styles.rankingText}>{rank.rank}위</Text>
            <View style={styles.iconContainer}>
              {rank.rank === 1 && (
                <Image
                  source={require("@/assets/icons/gold_medal.png")}
                  style={styles.icon}
                />
              )}
              {rank.rank === 2 && (
                <Image
                  source={require("@/assets/icons/silver_medal.png")}
                  style={styles.icon}
                />
              )}
              {rank.rank === 3 && (
                <Image
                  source={require("@/assets/icons/bronze_medal.png")}
                  style={styles.icon}
                />
              )}
              {rank.rank !== 1 && rank.rank !== 2 && rank.rank !== 3 && (
                <Image
                  source={require("@/assets/icons/medal.png")}
                  style={styles.icon}
                />
              )}
            </View>
            <Text style={styles.score}>
              {rank.total} {mode == "point" ? "P" : "★"}
            </Text>
            <Text style={styles.nickname}>{rank.userId}</Text>
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
  },
  inactiveTab: {
    fontSize: 16,
    color: "#888",
  },
});

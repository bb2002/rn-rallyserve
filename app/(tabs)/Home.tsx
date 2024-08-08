import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import Activity from "../components/Activity";
import { parseISO } from "date-fns";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FullSafeAreaView from "../components/FullSafeAreaView";
import getAxios from "../common/getAxios";
import { router } from "expo-router";

const categories = [
  { name: "재해·재난", icon: require("@/assets/icons/siren.png") },
  { name: "생활지원", icon: require("@/assets/icons/treasure.png") },
  { name: "환경보호", icon: require("@/assets/icons/leaf.png") },
  { name: "문화행사", icon: require("@/assets/icons/calendar.png") },
  { name: "보건·의료", icon: require("@/assets/icons/medical.png") },
  { name: "교육", icon: require("@/assets/icons/book.png") },
];

interface Information {
  point: number;
  ranking: number;
  star: number;
}

const HomeScreen = () => {
  useEffect(() => {
    (async () => {
      const response = await (await getAxios()).get("/member/all");
    })();
  }, []);

  const [information, setInformation] = useState<Information>({
    point: -1,
    ranking: -1,
    star: -1,
  });

  const gotoRanking = () => {
    router.push("/users/Ranking");
  };

  return (
    <FullSafeAreaView>
      <Header />
      <ScrollView>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>내 랠리</Text>
          <View style={styles.myRally}>
            <Text style={styles.rallyTextHeader}>랠리 스코어</Text>
            <Text style={styles.rallyText}>
              랠리 활동에 참여하면 점수를 높일 수 있어요.
            </Text>
            <View style={styles.rallyInfo}>
              <Text style={styles.rallyInfoText}>내 포인트</Text>
              <TouchableOpacity onPress={gotoRanking}>
                <Text style={styles.rallyInfoText}>커뮤니티</Text>
              </TouchableOpacity>
              <Text style={styles.rallyInfoText}>스타</Text>
            </View>
            <View style={styles.rallyInfo}>
              <Text style={{ ...styles.rallyInfoValue, color: "#f39c12" }}>
                <Image
                  source={require("@/assets/icons/coin.png")}
                  style={styles.pointIcon}
                />{" "}
                16,384
              </Text>
              <TouchableOpacity onPress={gotoRanking}>
                <Text style={{ ...styles.rallyInfoValue, color: "#F1C40F" }}>
                  1등
                </Text>
              </TouchableOpacity>

              <Text style={{ ...styles.rallyInfoValue, color: "#f66e5c" }}>
                <Image
                  source={require("@/assets/icons/star.png")}
                  style={styles.pointIcon}
                />{" "}
                1,024
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>카테고리</Text>
          <View style={styles.categories}>
            {categories.map((category, index) => (
              <TouchableOpacity key={index} style={styles.category}>
                <Image
                  source={category.icon}
                  style={{ width: 24, height: 24 }}
                />
                <Text style={styles.categoryText}>{category.name}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <Activity
            activityTitle="세계를 구하기"
            activitySubtitle="오버워치에 참여하여 세계를 구한다"
            activityStartAt={parseISO("2024-08-05T14:30:00Z")}
            activityEndAt={parseISO("2024-08-05T14:30:00Z")}
            recruitStartAt={parseISO("2024-08-05T14:30:00Z")}
            recruitEndAt={parseISO("2024-08-05T14:30:00Z")}
            activityStartTime={parseISO("2024-08-05T14:30:00Z")}
            activityEndTime={parseISO("2024-08-05T14:30:00Z")}
            activityTags={["재해·재난"]}
          />
          <Activity
            activityTitle="세계를 구하기"
            activitySubtitle="오버워치에 참여하여 세계를 구한다"
            activityStartAt={parseISO("2024-08-05T14:30:00Z")}
            activityEndAt={parseISO("2024-08-05T14:30:00Z")}
            recruitStartAt={parseISO("2024-08-05T14:30:00Z")}
            recruitEndAt={parseISO("2024-08-05T14:30:00Z")}
            activityStartTime={parseISO("2024-08-05T14:30:00Z")}
            activityEndTime={parseISO("2024-08-05T14:30:00Z")}
            activityTags={["재해·재난"]}
          />
          <Activity
            activityTitle="세계를 구하기"
            activitySubtitle="오버워치에 참여하여 세계를 구한다"
            activityStartAt={parseISO("2024-08-05T14:30:00Z")}
            activityEndAt={parseISO("2024-08-05T14:30:00Z")}
            recruitStartAt={parseISO("2024-08-05T14:30:00Z")}
            recruitEndAt={parseISO("2024-08-05T14:30:00Z")}
            activityStartTime={parseISO("2024-08-05T14:30:00Z")}
            activityEndTime={parseISO("2024-08-05T14:30:00Z")}
            activityTags={["재해·재난"]}
          />
        </View>
      </ScrollView>
      <Footer selectedIndex={0} />
    </FullSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f5f7",
  },
  section: {
    margin: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 8,
  },
  myRally: {
    borderRadius: 8,
    backgroundColor: "#fff",
    padding: 16,
  },
  rallyTextHeader: {
    fontWeight: "bold",
    fontSize: 16,
  },
  rallyText: {
    fontSize: 14,
    marginBottom: 16,
    color: "#a9a9aa",
  },
  rallyInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  rallyInfoText: {
    fontSize: 12,
    color: "#B8B8B8",
  },
  rallyInfoValue: {
    fontSize: 18,
    fontWeight: "bold",
  },
  categories: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 16,
  },
  category: {
    alignItems: "center",
  },
  categoryText: {
    marginTop: 4,
    fontSize: 12,
  },
  pointIcon: {
    width: 24,
    height: 24,
  },
});

export default HomeScreen;

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
import {
  Category,
  CULTURE,
  DISASTER,
  ENVIRONMENT,
  HEALTH,
  LIFE,
  MENTORING,
} from "../common/category";

const categories = [
  { category: DISASTER, icon: require("@/assets/icons/siren.png") },
  { category: LIFE, icon: require("@/assets/icons/treasure.png") },
  { category: ENVIRONMENT, icon: require("@/assets/icons/leaf.png") },
  { category: CULTURE, icon: require("@/assets/icons/calendar.png") },
  { category: HEALTH, icon: require("@/assets/icons/medical.png") },
  { category: MENTORING, icon: require("@/assets/icons/book.png") },
];

interface Information {
  point: number;
  ranking: number | string;
  star: number;
}

const HomeScreen = () => {
  const [information, setInformation] = useState<Information>({
    point: -1,
    ranking: -1,
    star: -1,
  });

  useEffect(() => {
    (async () => {
      const response = await (await getAxios()).get("/member/all");
      const { point, ranking, star } = response.data;
      setInformation({
        point: point ?? 0,
        ranking: ranking == -1 ? " - " : ranking,
        star: star ?? 0,
      });
    })();
  }, []);

  const [category, setCategory] = useState<Category | null>(null);
  const [volunteers, setVolunteers] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const response = await (
        await getAxios()
      ).get("/volunteer", {
        params: {
          ...(category ? { category: category.code } : {}),
        },
      });
      const { volunteers } = response.data;
      setVolunteers(volunteers);
    })();
  }, [category]);

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
                {information.point}
              </Text>
              <TouchableOpacity onPress={gotoRanking}>
                <Text style={{ ...styles.rallyInfoValue, color: "#F1C40F" }}>
                  {information.ranking}등
                </Text>
              </TouchableOpacity>

              <Text style={{ ...styles.rallyInfoValue, color: "#f66e5c" }}>
                <Image
                  source={require("@/assets/icons/star.png")}
                  style={styles.pointIcon}
                />{" "}
                {information.star}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>카테고리</Text>
          <View style={styles.categories}>
            {categories.map((category, index) => (
              <TouchableOpacity
                key={index}
                style={styles.category}
                onPress={() => setCategory(category.category)}
              >
                <Image
                  source={category.icon}
                  style={{ width: 24, height: 24 }}
                />
                <Text style={styles.categoryText}>
                  {category.category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {volunteers.map((volunteer) => (
            <Activity
              articleId={volunteer.id}
              activityTitle={volunteer.title.trim().substring(0, 18)}
              activitySubtitle={volunteer.text.trim().substring(0, 42) + "..."}
              activityStartAt={parseISO(volunteer.volunteerstartdate)}
              activityEndAt={parseISO(volunteer.volunteerenddate)}
              recruitStartAt={parseISO(volunteer.submitstartdate)}
              recruitEndAt={parseISO(volunteer.submitenddate)}
              activityStartTime={volunteer.volunteerstarttime.substring(0, 5)}
              activityEndTime={volunteer.volunteerendtime.substring(0, 5)}
              activityTags={["재해·재난"]}
              key={volunteer.id}
            />
          ))}
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

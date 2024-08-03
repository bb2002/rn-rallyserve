import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";

const categories = [
  { name: "재해·재난", icon: "closecircleo" },
  { name: "생활지원", icon: "closecircleo" },
  { name: "환경보호", icon: "closecircleo" },
  { name: "문화행사", icon: "closecircleo" },
  { name: "보건·의료", icon: "closecircleo" },
];

const HomeRenewalScreen = () => {
  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image source={require("@/assets/flag.png")} style={styles.icon} />
        <View style={styles.headerIcons}>
          <AntDesign
            name="search1"
            size={24}
            color="#000"
            style={styles.icon}
          />
          <AntDesign name="logout" size={24} color="#000" style={styles.icon} />
        </View>
      </View>

      {/* My Rally */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>내 랠리</Text>
        <View style={styles.myRally}>
          <Text style={styles.rallyTextHeader}>랠리 점수</Text>
          <Text style={styles.rallyText}>
            랠리 활동에 참여하면 점수를 높일 수 있어요.
          </Text>
          <View style={styles.rallyInfo}>
            <Text style={styles.rallyInfoText}>내 포인트</Text>
            <Text style={styles.rallyInfoText}>커뮤니티</Text>
            <Text style={styles.rallyInfoText}>스타</Text>
          </View>
          <View style={styles.rallyInfo}>
            <Text style={{ ...styles.rallyInfoValue, color: "#f39c12" }}>
              16,384{" "}
              <Image
                source={require("@/assets/icons/point.png")}
                style={styles.pointIcon}
              />
            </Text>
            <Text style={{ ...styles.rallyInfoValue, color: "#F1C40F" }}>
              1등
            </Text>
            <Text style={{ ...styles.rallyInfoValue, color: "#f66e5c" }}>
              1,024{" "}
              <Image
                source={require("@/assets/icons/star.png")}
                style={styles.pointIcon}
              />
            </Text>
          </View>
        </View>
      </View>

      {/* Categories */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>카테고리</Text>
        <View style={styles.categories}>
          {categories.map((category, index) => (
            <TouchableOpacity key={index} style={styles.category}>
              <AntDesign name={category.icon as any} size={24} color="#000" />
              <Text style={styles.categoryText}>{category.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Ad Banner */}
      <View style={styles.adBanner}>
        <Text style={styles.adText}>AD</Text>
      </View>

      {/* Volunteering Activities */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>봉사활동</Text>
        <View style={styles.activity}>
          <Text style={styles.activityTitle}>아름다운 가게 인천점</Text>
          <Text style={styles.activitySubtitle}>
            매장운영 지원 봉사 활동 모집
          </Text>
          <Text style={styles.activityDate}>[모집] 4월 2일 ~ 7월 2일</Text>
          <Text style={styles.activityTime}>
            [기간] 4월 2일 ~ 7월 2일 매일 10:00~14:00
          </Text>
          <View style={styles.activityTags}>
            <Text style={styles.activityTag}>재해·재난</Text>
            <Text style={styles.activityTag}>보건·의료</Text>
          </View>
        </View>
        <View style={styles.activity}>
          <Text style={styles.activityTitle}>아름다운 가게 인천점</Text>
          <Text style={styles.activitySubtitle}>
            매장운영 지원 봉사 활동 모집
          </Text>
          <Text style={styles.activityDate}>[모집] 4월 2일 ~ 7월 2일</Text>
          <Text style={styles.activityTime}>
            [기간] 4월 2일 ~ 7월 2일 매일 10:00~14:00
          </Text>
          <View style={styles.activityTags}>
            <Text style={styles.activityTag}>재해·재난</Text>
            <Text style={styles.activityTag}>보건·의료</Text>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <AntDesign name="closecircleo" size={24} color="#000" />
        <AntDesign name="closecircleo" size={24} color="#000" />
        <AntDesign name="closecircleo" size={24} color="#000" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f6f5f7",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#fff",
  },
  headerIcons: {
    flexDirection: "row",
  },
  icon: {
    marginLeft: 16,
    width: 24,
    height: 24,
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
  adBanner: {
    marginTop: 16,
    backgroundColor: "#ccc",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
  adText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  activity: {
    marginTop: 16,
    padding: 16,
    backgroundColor: "#fff",
    borderRadius: 8,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  activitySubtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  activityDate: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
  },
  activityTime: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
  },
  activityTags: {
    flexDirection: "row",
    marginTop: 8,
  },
  activityTag: {
    fontSize: 12,
    color: "#fff",
    backgroundColor: "#000",
    borderRadius: 4,
    padding: 4,
    marginRight: 4,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 16,
    backgroundColor: "#fff",
  },
  pointIcon: {
    width: 24,
    height: 24,
  },
});

export default HomeRenewalScreen;

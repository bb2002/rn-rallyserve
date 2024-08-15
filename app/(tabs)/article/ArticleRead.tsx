import getAxios from "@/app/common/getAxios";
import FullSafeAreaView from "@/app/components/FullSafeAreaView";
import Header from "@/app/components/Header";
import AntDesign from "@expo/vector-icons/AntDesign";
import { format } from "date-fns";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function ArticleReadPage() {
  const { id } = useLocalSearchParams();
  const [volunteer, setVolunteer] = useState<any>(null);

  useEffect(() => {
    (async () => {
      const response = await (await getAxios()).get("/volunteer?id=" + id);
      if (
        response.status !== 200 &&
        Array.isArray(response?.data?.volunteers) &&
        response?.data?.volunteers[0]
      ) {
        router.back();
        return;
      }

      setVolunteer(response?.data?.volunteers[0]);
    })();
  }, [id]);

  if (volunteer) {
    return (
      <FullSafeAreaView>
        <Header />
        {/* Header */}
        <ScrollView>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()}>
              <AntDesign name="back" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>봉사 상세</Text>
          </View>

          {/* Main Content */}
          <View style={styles.container}>
            <Text style={styles.organizationName}>
              {volunteer.volunteerorganization}
            </Text>
            <Text style={styles.activityTitle}>{volunteer.title}</Text>
            <View style={styles.activityTags}>
              <Text style={styles.activityTag}>{volunteer.category}</Text>
            </View>

            {/* Activity Details */}
            <View style={styles.detailsContainer}>
              <Text style={styles.detailItem}>
                모집기간: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                {format(volunteer.submitstartdate, "M월 d일")} ~{" "}
                {format(volunteer.submitenddate, "M월 d일")}
              </Text>
              <Text style={styles.detailItem}>
                봉사기간: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                {format(volunteer.volunteerstartdate, "M월 d일")} ~{" "}
                {format(volunteer.volunteerenddate, "M월 d일")} 매일{" "}
                {volunteer.volunteerstarttime.substring(0, 5)} ~{" "}
                {volunteer.volunteerendtime.substring(0, 5)}
              </Text>
              <Text style={styles.detailItem}>
                봉사요일: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                {volunteer.weekday}
              </Text>
              <Text style={styles.detailItem}>
                봉사위치: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                {volunteer.location}
              </Text>
              <Text style={styles.detailItem}>
                행정구역: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{" "}
                {volunteer.registrationauthority}
              </Text>
            </View>

            {/* Long Description */}
            <Text style={styles.longDescription}>{volunteer.text}</Text>

            {/* Bottom Button */}
            <TouchableOpacity
              style={styles.bottomButton}
              onPress={() => Linking.openURL(volunteer.url)}
            >
              <Text style={styles.buttonText}>1365에서 활동 신청</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </FullSafeAreaView>
    );
  } else {
    return <Text>Loading...</Text>;
  }
}

const styles = StyleSheet.create({
  container: {
    margin: 32,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginLeft: 32,
    marginRight: 32,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 24,
    color: "#2c2c2c",
  },
  content: {
    padding: 16,
  },
  organizationName: {
    fontSize: 16,
    marginBottom: 8,
    color: "#2c2c2c",
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  detailsContainer: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 8,
  },
  detailItem: {
    fontSize: 12,
    marginBottom: 8,
  },
  longDescription: {
    fontSize: 14,
    lineHeight: 22,
  },
  bottomButton: {
    backgroundColor: "#f39c12",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    color: "#fff",
  },
  activityTag: {
    fontSize: 12,
    color: "#000000",
    backgroundColor: "#fff",
    borderStyle: "solid",
    borderWidth: 1,
    borderColor: "#f2f2f2",
    borderRadius: 4,
    padding: 4,
    marginRight: 4,
    textAlign: "center",
  },
  activityTags: {
    flexDirection: "row",
    marginTop: 8,
    marginBottom: 8,
  },
});

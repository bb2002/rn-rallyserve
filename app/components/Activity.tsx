import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { format } from "date-fns";

type Props = {
  activityTitle: string;
  activitySubtitle: string;
  recruitStartAt: Date;
  recruitEndAt: Date;
  activityStartAt: Date;
  activityEndAt: Date;
  activityStartTime: Date;
  activityEndTime: Date;
  activityTags: string[];
};

export default function Activity({
  activityTitle,
  activitySubtitle,
  recruitStartAt,
  recruitEndAt,
  activityStartAt,
  activityEndAt,
  activityStartTime,
  activityEndTime,
  activityTags,
}: Props) {
  return (
    <View style={styles.activity}>
      <Text style={styles.activityTitle}>{activityTitle}</Text>
      <Text style={styles.activitySubtitle}>{activitySubtitle}</Text>
      <Text style={styles.activityDate}>
        [모집] {format(recruitStartAt, "M월 d일")} ~{" "}
        {format(recruitEndAt, "M월 d일")}
      </Text>
      <Text style={styles.activityTime}>
        [기간] {format(activityStartAt, "M월 d일")} ~{" "}
        {format(activityEndAt, "M월 d일")} 매일{" "}
        {format(activityStartTime, "HH:mm")}-{format(activityEndTime, "HH:mm")}
      </Text>
      <View style={styles.activityTags}>
        {activityTags.map((value, index) => (
          <Text style={styles.activityTag} key={index}>
            {value}
          </Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
});

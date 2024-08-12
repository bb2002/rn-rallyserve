import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import FullSafeAreaView from "../components/FullSafeAreaView";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Picker } from "@react-native-picker/picker";
import Activity from "../components/Activity";
import { format, parseISO } from "date-fns";
import DateTimePickerModal from "react-native-modal-datetime-picker";

interface ActivitiesForm {
  searchText: string;
  category: string | null;
  activityDate: Date | null;
  region: string | null;
}

export default function Activities() {
  const [form, setForm] = useState<ActivitiesForm>({
    searchText: "",
    category: null,
    activityDate: null,
    region: null,
  });

  const [dateSelecteModal, setDateSelectModal] = useState(false);

  const onDateSelected = (selectedDate: Date) => {
    setDateSelectModal(false);
    setForm({ ...form, activityDate: selectedDate });
  };

  return (
    <FullSafeAreaView>
      <Header />
      <ScrollView style={styles.container}>
        <Text style={styles.title}>활동 찾기</Text>
        <Text style={styles.subtitle}>
          등록된 전체 봉사활동을 찾아볼 수 있어요.
        </Text>
        <TextInput
          style={styles.searchInput}
          placeholder="봉사명, 모집 기관, 지역명으로 검색"
          placeholderTextColor="#999"
          value={form.searchText}
          onChangeText={(text) => setForm({ ...form, searchText: text })}
        />
        <View style={styles.filterContainer}>
          <Picker style={styles.filterButton}>
            <Picker.Item label="재해·재난" value="" />
            <Picker.Item label="생활지원" value="" />
            <Picker.Item label="환경보호" value="" />
            <Picker.Item label="문화행사" value="" />
            <Picker.Item label="보건·의료" value="" />
            <Picker.Item label="교육" value="" />
          </Picker>
          <Picker style={styles.filterButton}>
            <Picker.Item label="서울특별시" value="" />
            <Picker.Item label="경기도" value="" />
            <Picker.Item label="인천광역시" value="" />
            <Picker.Item label="대전광역시" value="" />
            <Picker.Item label="대구광역시" value="" />
            <Picker.Item label="광주광역시" value="" />
            <Picker.Item label="울산광역시" value="" />
            <Picker.Item label="부산광역시" value="" />
            <Picker.Item label="세종특별자치시" value="" />
            <Picker.Item label="충북·충남" value="" />
            <Picker.Item label="경북·경남" value="" />
            <Picker.Item label="전북·전남" value="" />
            <Picker.Item label="강원특별자치도" value="" />
            <Picker.Item label="제주특별자치도" value="" />
          </Picker>
        </View>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setDateSelectModal(true)}
        >
          <Text style={styles.filterButtonText}>
            {form.activityDate
              ? format(form.activityDate, "yyyy-MM-dd HH:mm:ss")
              : "활동기간/시간"}
          </Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={dateSelecteModal}
          mode="datetime"
          date={new Date()}
          onConfirm={onDateSelected}
          onCancel={() => setDateSelectModal(false)}
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
      </ScrollView>
      <Footer selectedIndex={2} />
    </FullSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
  },
  searchInput: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    marginBottom: 20,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  filterButton: {
    backgroundColor: "#f8f8f8",
    padding: 10,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
    marginHorizontal: 5,
  },
  filterButtonText: {
    fontSize: 14,
    color: "#666",
  },
  card: {
    backgroundColor: "#f8f8f8",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  store: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#4caf50",
    marginBottom: 5,
  },
  details: {
    fontSize: 12,
    color: "#666",
  },
  categories: {
    flexDirection: "row",
    marginTop: 10,
  },
  category: {
    fontSize: 12,
    color: "#666",
    backgroundColor: "#e0e0e0",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 5,
    marginRight: 5,
  },
});

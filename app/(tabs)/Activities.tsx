import React, { useEffect, useState } from "react";
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
import getAxios from "../common/getAxios";
import { categories, Category, DISASTER } from "../common/category";

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
  const [volunteers, setVolunteers] = useState<any[]>([]);

  const onDateSelected = (selectedDate: Date) => {
    setDateSelectModal(false);
    setForm({ ...form, activityDate: selectedDate });
  };

  useEffect(() => {
    (async () => {
      const response = await (
        await getAxios()
      ).get("/volunteer", {
        params: {
          ...(form.category ? { category: form.category } : {}),
          ...(form.region ? { location: form.region } : {}),
          ...(form.activityDate
            ? {
                date: format(form.activityDate, "yyyy-MM-dd"),
              }
            : {}),
          ...(form.searchText ? { search: form.searchText } : {}),
        },
      });

      setVolunteers(response?.data?.volunteers || []);
    })();
  }, [form]);

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
          <Picker
            style={styles.filterButton}
            onValueChange={(value: string) =>
              setForm({ ...form, category: value })
            }
            selectedValue={form.category || DISASTER.code}
          >
            {categories.map((category: Category) => (
              <Picker.Item label={category.name} value={category.code} />
            ))}
          </Picker>
          <Picker
            style={styles.filterButton}
            onValueChange={(value: string) =>
              setForm({ ...form, region: value })
            }
            selectedValue={form.region || "서울"}
          >
            <Picker.Item label="서울특별시" value="서울" />
            <Picker.Item label="경기도" value="경기" />
            <Picker.Item label="인천광역시" value="인천" />
            <Picker.Item label="대전광역시" value="대전" />
            <Picker.Item label="대구광역시" value="대구" />
            <Picker.Item label="광주광역시" value="광주" />
            <Picker.Item label="울산광역시" value="울산" />
            <Picker.Item label="부산광역시" value="부산" />
            <Picker.Item label="세종특별자치시" value="세종" />
            <Picker.Item label="충북·충남" value="충북" />
            <Picker.Item label="경북·경남" value="경북" />
            <Picker.Item label="전북·전남" value="전북" />
            <Picker.Item label="강원특별자치도" value="강원" />
            <Picker.Item label="제주특별자치도" value="제주" />
          </Picker>
        </View>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setDateSelectModal(true)}
        >
          <Text style={styles.filterButtonText}>
            {form.activityDate
              ? format(form.activityDate, "yyyy-MM-dd")
              : "활동기간/시간"}
          </Text>
        </TouchableOpacity>
        <DateTimePickerModal
          isVisible={dateSelecteModal}
          mode="date"
          date={new Date()}
          onConfirm={onDateSelected}
          onCancel={() => setDateSelectModal(false)}
        />

        {volunteers.length === 0 ? (
          <>
            <Text style={{ marginTop: 32, textAlign: "center" }}>
              적합한 봉사활동이 없습니다.
            </Text>
          </>
        ) : (
          <>
            {volunteers.map((volunteer) => (
              <Activity
                articleId={volunteer.id}
                activityTitle={volunteer.title.trim().substring(0, 18)}
                activitySubtitle={
                  volunteer.text.trim().substring(0, 42) + "..."
                }
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
          </>
        )}
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

import React, { useEffect, useState } from "react";
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Pressable,
  ToastAndroid,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import FullSafeAreaView from "../components/FullSafeAreaView";
import Header from "../components/Header";
import Footer from "../components/Footer";
import getAxios from "../common/getAxios";
import { format, parseISO } from "date-fns";
import Activity from "../components/Activity";

const App = () => {
  const [mode, setMode] = useState<"date" | "time" | "datetime">("date");
  const [startDateVisible, setStartDateVisible] = useState(false);
  const [startDate, setStartDate] = useState(new Date());

  const [endDateVisible, setEndDateVisible] = useState(false);
  const [endDate, setEndDate] = useState(new Date());

  const [startTimeVisible, setStartTimeVisible] = useState(false);
  const [startTime, setStartTime] = useState(new Date());

  const [endTimeVisible, setEndTimeVisible] = useState(false);
  const [endTime, setEndTime] = useState(new Date());

  const [userInput, setUserInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [volunteer, setVolunteer] = useState<any>(null);
  const [volunteerDetail, setVolunteerDetail] = useState<any>(null);

  const onPressStartDate = () => {
    setMode("date");
    setStartDateVisible(true);
  };
  const onPressEndDate = () => {
    setMode("date");
    setEndDateVisible(true);
  };
  const onPressStartTime = () => {
    setMode("time");
    setStartTimeVisible(true);
  };

  const onPressEndTime = () => {
    setMode("time");
    setEndTimeVisible(true);
  };

  const onStartConfirm = (selectedDate: Date) => {
    setStartDateVisible(false);
    setStartDate(selectedDate);
  };
  const onEndConfirm = (selectedDate: Date) => {
    setEndDateVisible(false);
    setEndDate(selectedDate);
  };
  const onStartTimeConfirm = (selectedDate: Date) => {
    setStartTimeVisible(false);
    setStartTime(selectedDate);
  };
  const onEndTimeConfirm = (selectedDate: Date) => {
    setEndTimeVisible(false);
    setEndTime(selectedDate);
  };

  const onStartCancel = () => {
    setStartDateVisible(false);
  };
  const onEndCancel = () => {
    setEndDateVisible(false);
  };
  const onStartTimeCancel = () => {
    setStartTimeVisible(false);
  };

  const onEndTimeCancel = () => {
    setEndTimeVisible(false);
  };
  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const addQuotes = (str: string) => {
    // 속성 이름에 쌍따옴표 추가
    str = str.replace(/([{,]\s*)(\w+)(\s*:)/g, '$1"$2"$3');
    // 속성 값이 문자열인 경우 쌍따옴표 추가, 이미 있는 경우는 제외
    str = str.replace(/:\s*'([^']*)'/g, ': "$1"');
    // 숫자와 이미 쌍따옴표가 있는 값은 그대로 두고, 나머지 값에 쌍따옴표 추가
    str = str.replace(/:\s*([^,\{\}\[\]\s]+)/g, ': "$1"');
    return str;
  };

  const onMatchmaking = async () => {
    setLoading(true);

    try {
      const response = await (
        await getAxios()
      ).post(
        "/matchmaking",
        {
          userStartDate: format(startDate, "yyyy-MM-dd"),
          userEndDate: format(startDate, "yyyy-MM-dd"),
          userStartTime: format(startTime, "HH:mm:ss"),
          userEndTime: format(endTime, "HH:mm:ss"),
          userMemo: userInput,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.id) {
        setVolunteer(response.data);
      } else {
        ToastAndroid.show(
          "일치하는 봉사활동을 찾을 수 없습니다.",
          ToastAndroid.BOTTOM
        );
      }
    } catch (ex) {
      console.error(ex);
      ToastAndroid.show(
        "서버 또는 네트워크에 문제가 발생했습니다.",
        ToastAndroid.BOTTOM
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (volunteer) {
      (async () => {
        const response = await (
          await getAxios()
        ).get("/volunteer", {
          params: {
            id: volunteer.id,
          },
        });

        setVolunteerDetail(response.data.volunteers[0]);
      })();
    }
  }, [volunteer]);

  return (
    <FullSafeAreaView>
      <Header />
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          {volunteer ? (
            <>
              <Text style={styles.headerTitle}>매치 성공!</Text>
              <Text style={styles.headerSubtitle}>
                아래 활동이 가장 적절해보여요.
              </Text>
            </>
          ) : (
            <>
              <Text style={styles.headerTitle}>매치메이킹</Text>
              <Text style={styles.headerSubtitle}>
                조건과 성향에 가장 알맞는 봉사 활동을 찾아요.
              </Text>
            </>
          )}
        </View>

        {volunteerDetail ? (
          <>
            <View style={styles.section}>
              <Activity
                articleId={volunteer.id}
                activityTitle={volunteerDetail.title.trim().substring(0, 18)}
                activitySubtitle={
                  volunteerDetail.text.trim().substring(0, 42) + "..."
                }
                activityStartAt={parseISO(volunteerDetail.volunteerstartdate)}
                activityEndAt={parseISO(volunteerDetail.volunteerenddate)}
                recruitStartAt={parseISO(volunteerDetail.submitstartdate)}
                recruitEndAt={parseISO(volunteerDetail.submitenddate)}
                activityStartTime={volunteerDetail.volunteerstarttime.substring(
                  0,
                  5
                )}
                activityEndTime={volunteerDetail.volunteerendtime.substring(
                  0,
                  5
                )}
                activityTags={["재해·재난"]}
                key={volunteerDetail.id}
              />
            </View>
          </>
        ) : (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>활동 기간</Text>
              <View style={styles.dateTimeContainer}>
                <View style={styles.dateTimeItem}>
                  <Pressable onPress={onPressStartDate}>
                    <Text style={styles.label}>시작 일</Text>
                    <Text style={styles.value}>
                      {startDate.toISOString().split("T")[0]}
                    </Text>
                  </Pressable>
                </View>
                <View style={styles.dateTimeItem}>
                  <Pressable onPress={onPressEndDate}>
                    <Text style={styles.label}>종료 일</Text>
                    <Text style={styles.value}>
                      {endDate.toISOString().split("T")[0]}
                    </Text>
                  </Pressable>
                </View>
              </View>
              <DateTimePickerModal
                isVisible={startDateVisible}
                mode={mode}
                date={startDate}
                onConfirm={onStartConfirm}
                onCancel={onStartCancel}
              />
              <DateTimePickerModal
                isVisible={endDateVisible}
                mode={mode}
                date={endDate}
                onConfirm={onEndConfirm}
                onCancel={onEndCancel}
              />
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>봉사 시간</Text>
              <View style={styles.dateTimeContainer}>
                <View style={styles.dateTimeItem}>
                  <Pressable onPress={onPressStartTime}>
                    <Text style={styles.label}>시작 시간</Text>
                    <Text style={styles.value}>{formatTime(startTime)}</Text>
                  </Pressable>
                </View>
                <View style={styles.dateTimeItem}>
                  <Pressable onPress={onPressEndTime}>
                    <Text style={styles.label}>종료 시간</Text>
                    <Text style={styles.value}>{formatTime(endTime)}</Text>
                  </Pressable>
                </View>
              </View>
              <DateTimePickerModal
                isVisible={startTimeVisible}
                mode={mode}
                date={startTime}
                onConfirm={onStartTimeConfirm}
                onCancel={onStartTimeCancel}
              />
              <DateTimePickerModal
                isVisible={endTimeVisible}
                mode={mode}
                date={endTime}
                onConfirm={onEndTimeConfirm}
                onCancel={onEndTimeCancel}
              />
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>어떤 봉사를 원하시나요?</Text>
              <Text style={styles.description}>
                내 성향, 장점, 잘하는 것 등을 자유롭게 적어 주시면 활동을
                매치메이킹 하는데 도움이 돼요.
              </Text>
              <TextInput
                style={styles.input}
                multiline
                numberOfLines={4}
                maxLength={300}
                placeholder="최대 300자 까지 적어주세요."
                placeholderTextColor="#999"
                onChangeText={setUserInput}
                value={userInput}
              />
            </View>

            {loading ? (
              <Text style={styles.buttonText}>매치메이킹 중...</Text>
            ) : (
              <TouchableOpacity style={styles.button} onPress={onMatchmaking}>
                <Text style={styles.buttonText}>매칭 시작</Text>
              </TouchableOpacity>
            )}
          </>
        )}

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            봉사활동 매치메이킹 프로그램은 사용자의 개인정보를 보호하며, 제공된
            정보를 바탕으로 봉사활동 기회를 연결해 드립니다. 본 서비스 이용 시
            발생하는 문제에 대해 법적 책임을 지지 않으며, 사용자는 자발적으로
            참여해야 합니다.
          </Text>
        </View>
      </ScrollView>
      <Footer selectedIndex={1} />
    </FullSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: "#666",
  },
  section: {
    backgroundColor: "#f8f8f8",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  dateTimeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dateTimeItem: {
    flex: 1,
    alignItems: "center",
    textAlign: "center",
  },
  label: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
  },
  datePicker: {
    flexDirection: "row",
    alignItems: "center",
  },
  value: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 5,
    textAlign: "center",
  },
  triangle: {
    fontSize: 16,
    color: "#ffa500",
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginTop: 10,
  },
  button: {
    backgroundColor: "#ffa500",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  footer: {
    marginBottom: 20,
  },
  footerText: {
    fontSize: 12,
    color: "#999",
    marginBottom: 16,
  },
  input: {
    height: 80,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 14,
    color: "#333",
    marginTop: 10,
  },
});

export default App;

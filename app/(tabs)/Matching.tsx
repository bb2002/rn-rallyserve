import React, { useState } from 'react';
import { TextInput, StyleSheet, Text, View, ScrollView, TouchableOpacity, Platform, Pressable } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker'

const App = () => {
  const [mode, setMode] = useState<"date" | "time" | "datetime">('date');
  const [startDateVisible, setStartDateVisible] = useState(false);
  const [startDate, setStartDate] = useState(new Date());

  const [endDateVisible, setEndDateVisible] = useState(false);
  const [endDate, setEndDate] = useState(new Date());

  const [startTimeVisible, setStartTimeVisible] = useState(false);
  const [startTime, setStartTime] = useState(new Date());

  const [endTimeVisible, setEndTimeVisible] = useState(false);
  const [endTime, setEndTime] = useState(new Date());

  const [userInput, setUserInput] = useState('');


  const onPressStartDate = () => {
    setMode('date');
    setStartDateVisible(true);
  }
  const onPressEndDate = () => {
    setMode('date');
    setEndDateVisible(true);
  }
  const onPressStartTime = () => {
    setMode('time');
    setStartTimeVisible(true);
  }

  const onPressEndTime = () => {
    setMode('time');
    setEndTimeVisible(true);
  }

  const onStartConfirm = (selectedDate: Date) => {
    setStartDateVisible(false);
    setStartDate(selectedDate);
  }
  const onEndConfirm = (selectedDate: Date) => {
    setEndDateVisible(false);
    setEndDate(selectedDate);
  }
  const onStartTimeConfirm = (selectedDate: Date) => {
    setStartTimeVisible(false);
    setStartTime(selectedDate);
  }
  const onEndTimeConfirm = (selectedDate: Date) => {
    setEndTimeVisible(false);
    setEndTime(selectedDate);
  }

  const onStartCancel = () => {
    setStartDateVisible(false);
  }
  const onEndCancel = () => {
    setEndDateVisible(false);
  }
  const onStartTimeCancel = () => {
    setStartTimeVisible(false);
  }

  const onEndTimeCancel = () => {
    setEndTimeVisible(false);
  }
  const formatTime = (date: Date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>매치메이킹</Text>
        <Text style={styles.headerSubtitle}>조건과 성향에 가장 알맞는 봉사 활동을 찾아요.</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>전체 기간</Text>
        <View style={styles.dateTimeContainer}>
          <View style={styles.dateTimeItem}>
            <Text style={styles.label}>시작 일</Text>
            <Pressable onPress={onPressStartDate} >
                <Text style={styles.value}>{startDate.toISOString().split('T')[0]}</Text>
            </Pressable>
          </View>
          <View style={styles.dateTimeItem}>
            <Text style={styles.label}>종료 일</Text>
            <Pressable onPress={onPressEndDate} >
                <Text style={styles.value}>{endDate.toISOString().split('T')[0]}</Text>
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
        <Text style={styles.sectionTitle}>전체 시간</Text>
        <View style={styles.dateTimeContainer}>
          <View style={styles.dateTimeItem}>
            <Text style={styles.label}>시작 시간</Text>
            <Pressable onPress={onPressStartTime} >
                <Text style={styles.value}>{formatTime(startTime)}</Text>
            </Pressable>
          </View>
          <View style={styles.dateTimeItem}>
            <Text style={styles.label}>종료 시간</Text>
            <Pressable onPress={onPressEndTime} >
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
          내 성향, 장점, 잘하는 것 등을 자유롭게 적어 주시면 활동을 매치메이킹 하는데 도움이 돼요.
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


      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>매칭 시작</Text>
      </TouchableOpacity>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          매칭 시작 버튼을 누르면 당신은 악마와의 계약이 성사 된 것으로 간주합니다. 
          당신의 몸과 마음은 봉사 정신이 가득하게 혁명적으로 변화할 것이며, 어쩌구 저쩌구 여기에 주의 사항과 안내 사항을 적어 두면 좋을 것 같다는것을 이렇게 길게 말하고 있습니다.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  section: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  dateTimeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dateTimeItem: {
    flex: 1,
    alignItems: 'center',
  },
  label: {
    fontSize: 14,
    color: '#666',
  },
  datePicker: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 5,
  },
  triangle: {
    fontSize: 16,
    color: '#ffa500',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#ffa500',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    marginBottom: 20,
  },
  footerText: {
    fontSize: 12,
    color: '#999',
  },
  input: {
    height: 80,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 14,
    color: '#333',
    marginTop: 10,
  },
});

export default App;
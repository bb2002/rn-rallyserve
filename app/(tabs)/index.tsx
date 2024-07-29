import React from 'react';
import { Image, StyleSheet, Text, View, ScrollView } from 'react-native';

const App = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>내 랠리</Text>
        <View style={styles.rallyScoreContainer}>
          <Text style={styles.rallyScoreText}>랠리 점수</Text>
          <Text style={styles.rallyScoreDescription}>봉사 활동에 참여 하면 점수를 높일 수 있어요.</Text>
          <View style={styles.pointsContainer}>
            <View style={styles.pointsItem}>
              <Text style={styles.points}>내 포인트</Text>
              <Text style={styles.pointsValue}>50,000 P</Text>
            </View>
            <View style={styles.pointsItem}>
              <Text style={styles.rank}>커뮤니티</Text>
              <Text style={styles.rankValue}>1등</Text>
            </View>
          </View>
        </View>
      </View>
      {/* TODO: array map으로 변경 할 것 */}
      <View style={styles.activitySection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>봉사활동</Text>
          <Text style={styles.more}>더보기 {">"}</Text>
        </View>
        <View style={styles.iconsContainer}>
          <View style={styles.iconItem}>
            <Image style={styles.icon} source={require('@/assets/disaster.png')} />
            <Text style={styles.iconText}>재난</Text>
          </View>
          <View style={styles.iconItem}>
            <Image style={styles.icon} source={require('@/assets/child.png')} />
            <Text style={styles.iconText}>장애아동</Text>
          </View>
          <View style={styles.iconItem}>
            <Image style={styles.icon} source={require('@/assets/elderly.png')} />
            <Text style={styles.iconText}>어르신</Text>
          </View>
          <View style={styles.iconItem}>
            <Image style={styles.icon} source={require('@/assets/physical.png')} />
            <Text style={styles.iconText}>신체활동</Text>
          </View>
          <View style={styles.iconItem}>
            <Image style={styles.icon} source={require('@/assets/tutoring.png')} />
            <Text style={styles.iconText}>튜터링</Text>
          </View>
        </View>
        {/* TODO: array map으로 변경 할 것 */}
        <View style={styles.volunteerList}>
          <View style={styles.volunteerItem}>
            <Text style={styles.volunteerTitle}>아름다운 가게 인천점</Text>
            <Text style={styles.volunteerSubTitle}>매장운영 지원 봉사 활동 모집</Text>
            <Text style={styles.volunteerDetails}>[모집] 4월 2일 ~ 7월 2일</Text>
            <Text style={styles.volunteerDetails}>[기간] 4월 2일 ~ 7월 2일 매일 10:00~14:00</Text>
          </View>
          <View style={styles.volunteerItem}>
            <Text style={styles.volunteerTitle}>아름다운 가게 인천점</Text>
            <Text style={styles.volunteerSubTitle}>매장운영 지원 봉사 활동 모집</Text>
            <Text style={styles.volunteerDetails}>[모집] 4월 2일 ~ 7월 2일</Text>
            <Text style={styles.volunteerDetails}>[기간] 4월 2일 ~ 7월 2일 매일 10:00~14:00</Text>
          </View>
          <View style={styles.volunteerItem}>
            <Text style={styles.volunteerTitle}>아름다운 가게 인천점</Text>
            <Text style={styles.volunteerSubTitle}>매장운영 지원 봉사 활동 모집</Text>
            <Text style={styles.volunteerDetails}>[모집] 4월 2일 ~ 7월 2일</Text>
            <Text style={styles.volunteerDetails}>[기간] 4월 2일 ~ 7월 2일 매일 10:00~14:00</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  rallyScoreContainer: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },
  rallyScoreText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  rallyScoreDescription: {
    fontSize: 14,
    color: '#888',
    marginVertical: 5,
  },
  pointsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  pointsItem: {
    alignItems: 'center',
  },
  points: {
    fontSize: 16,
    color: '#555',
  },
  pointsValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f60',
  },
  rank: {
    fontSize: 16,
    color: '#555',
  },
  rankValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#f60',
  },
  activitySection: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  more: {
    fontSize: 14,
    color: '#888',
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  iconItem: {
    alignItems: 'center',
  },
  icon: {
    width: 40,
    height: 40,
  },
  iconText: {
    marginTop: 5,
    fontSize: 14,
  },
  volunteerList: {
    marginTop: 10,
  },
  volunteerItem: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
  },
  volunteerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  volunteerSubTitle: {
    fontSize: 14,
    marginVertical: 5,
  },
  volunteerDetails: {
    fontSize: 12,
    color: '#888',
  },
});

export default App;
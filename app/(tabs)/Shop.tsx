import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Modal, TouchableWithoutFeedback, Image } from 'react-native';

/* 대충 백에서 받아올 규격... */
interface Item {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

/* 대충 백에서 받아올 아이템들.. */
const items: Item[] = Array.from({ length: 17 }, (_, i) => ({
  id: i,
  name: `아이템${i}`,
  description: `아이템${i} 설명입니다`,
  price: 10,
  image: `https://via.placeholder.com/60?text=ITEM${i}`, // 임시 이미지 URL
}));

const App: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.headerTitle}>상점</Text>
      <Text style={styles.subtitle}>내 포인트로 물품을 구매할 수 있어요</Text>
      <View style={styles.pointsContainer}>
        <Text style={styles.pointsLabel}>내 포인트</Text>
        <Text style={styles.pointsValue}>10,013 P</Text>
      </View>
      <View style={styles.itemsContainer}>
        {items.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.item}
            onPress={() => setSelectedItem(item)}
          >
            <Image source={{ uri: item.image }} style={styles.itemImage} />
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>{item.price} P</Text>
          </TouchableOpacity>
        ))}
      </View>
      {selectedItem && (
        <Modal
          transparent={true}
          animationType="fade"
          visible={selectedItem !== null}
          onRequestClose={() => setSelectedItem(null)}
        >
          <TouchableWithoutFeedback onPress={() => setSelectedItem(null)}>
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                <Image source={{ uri: selectedItem.image }} style={styles.modalItemImage} />
                <Text style={styles.modalItemName}>{selectedItem.name}</Text>
                <Text style={styles.modalItemPrice}>{selectedItem.price} P</Text>
                <Text style={styles.modalItemDescription}>{selectedItem.description}</Text>
                <View style={styles.modalButtons}>
                  <TouchableOpacity style={styles.modalButton} onPress={() => setSelectedItem(null)}>
                    <Text style={styles.modalButtonText}>구매하기</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={[styles.modalButton, styles.cancelButton]} onPress={() => setSelectedItem(null)}>
                    <Text style={[styles.modalButtonText, styles.cancelButtonText]}>취소</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
    marginBottom: 20,
  },
  pointsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  pointsLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  pointsValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
  },
  item: {
    width: '30%',
    backgroundColor: '#fff',
    borderColor: '#ffa500',
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
    marginBottom: 20,
    marginRight: '3.3%',
    alignItems: 'center',
  },
  itemImage: {
    width: 60,
    height: 60,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 10,
  },
  itemName: {
    fontSize: 14,
    marginBottom: 5,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffa500',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalItemImage: {
    width: 60,
    height: 60,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 10,
  },
  modalItemName: {
    fontSize: 14,
    marginBottom: 5,
  },
  modalItemPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffa500',
  },
  modalItemDescription: {
    fontSize: 14,
    color: '#888',
    marginVertical: 10,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  modalButton: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    backgroundColor: '#ffa500',
    marginHorizontal: 5,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  cancelButton: {
    backgroundColor: '#ccc',
  },
  cancelButtonText: {
    color: '#000',
  },
});

export default App;
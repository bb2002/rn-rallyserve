import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AntDesign from "@expo/vector-icons/AntDesign";

interface RecentSearchItem {
  id: string;
  term: string;
}

const SearchScreen: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [recentSearches, setRecentSearches] = useState<RecentSearchItem[]>([]);

  useEffect(() => {
    loadRecentSearches();
  }, []);

  const loadRecentSearches = async () => {
    try {
      const searches = await AsyncStorage.getItem("recentSearches");
      if (searches !== null) {
        setRecentSearches(JSON.parse(searches));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const saveSearchTerm = async (term: string) => {
    try {
      const newSearchItem: RecentSearchItem = {
        id: Date.now().toString(),
        term,
      };
      const updatedSearches = [
        newSearchItem,
        ...recentSearches.filter((item) => item.term !== term),
      ];
      setRecentSearches(updatedSearches);
      await AsyncStorage.setItem(
        "recentSearches",
        JSON.stringify(updatedSearches)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      saveSearchTerm(searchTerm.trim());
      setSearchTerm("");
    }
  };

  const removeSearchTerm = async (id: string) => {
    try {
      const updatedSearches = recentSearches.filter((item) => item.id !== id);
      setRecentSearches(updatedSearches);
      await AsyncStorage.setItem(
        "recentSearches",
        JSON.stringify(updatedSearches)
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="봉사명, 모집 기관, 지역명으로 검색"
            value={searchTerm}
            onChangeText={setSearchTerm}
            onSubmitEditing={handleSearch}
          />
          <TouchableOpacity onPress={handleSearch}>
            <AntDesign name="search1" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <Text style={styles.recentSearchesTitle}>최근 검색어</Text>
      <View style={styles.recentSearchesContainer}>
        {recentSearches.map((item) => (
          <View key={item.id} style={styles.searchItem}>
            <Text style={styles.searchItemText}>{item.term}</Text>
            <TouchableOpacity onPress={() => removeSearchTerm(item.id)}>
              <Text style={styles.removeIcon}>✕</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  searchSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backIcon: {
    fontSize: 24,
    color: "#888",
    marginRight: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 25,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  searchIcon: {
    fontSize: 20,
    color: "#888",
  },
  recentSearchesTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  recentSearchesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  searchItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  searchItemText: {
    marginRight: 10,
  },
  removeIcon: {
    fontSize: 16,
    color: "#888",
  },
});

export default SearchScreen;

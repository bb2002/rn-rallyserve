import AntDesign from "@expo/vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Image, StyleSheet, View } from "react-native";

export default function Header() {
  const onLogout = async () => {
    await AsyncStorage.clear();
    router.replace("/OnBoarding");
  };

  const onSearch = () => {
    router.push("/Search");
  };

  return (
    <View style={styles.header}>
      <Image source={require("@/assets/flag.png")} style={styles.icon} />
      <View style={styles.headerIcons}>
        <AntDesign
          name="search1"
          size={24}
          color="#000"
          style={styles.icon}
          onPress={onSearch}
        />
        <AntDesign
          name="logout"
          size={24}
          color="#000"
          style={styles.icon}
          onPress={onLogout}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
});

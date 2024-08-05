import { router } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {
  selectedIndex: number;
};

const menu = [
  {
    text: "홈",
    selected: require("@/assets/icons/home_orange.png"),
    unselected: require("@/assets/icons/home_black.png"),
    router: "/Home",
  },
  {
    text: "매치메이킹",
    selected: require("@/assets/icons/handshake_orange.png"),
    unselected: require("@/assets/icons/handshake_black.png"),
    router: "/MatchMaking",
  },
  {
    text: "활동찾기",
    selected: require("@/assets/icons/list_orange.png"),
    unselected: require("@/assets/icons/list_black.png"),
    router: "/Activities",
  },
];

export default function Footer({ selectedIndex }: Props) {
  return (
    <View style={styles.footer}>
      {menu.map((value, index) => (
        <TouchableOpacity
          key={index}
          style={styles.container}
          onPress={() => router.replace(value.router)}
        >
          <Image
            source={index === selectedIndex ? value.selected : value.unselected}
            style={styles.icon}
          />
          <Text
            style={{
              ...styles.text,
              color: index === selectedIndex ? "#F39C12" : "#2c2c2c",
            }}
          >
            {value.text}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 8,
    backgroundColor: "#fff",
  },
  container: {
    alignItems: "center",
  },
  icon: {
    width: 24,
    height: 24,
  },
  text: {
    fontSize: 12,
  },
});

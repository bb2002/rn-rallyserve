import { View } from "react-native";
import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaView>
      <View>
        <Link href="/Home">Home</Link>
        <Link href="/OnBoarding">OnBoarding</Link>
      </View>
    </SafeAreaView>
  );
}

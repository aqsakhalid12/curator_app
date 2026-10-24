import { COLORS } from "@/components/constants/theme";
import { Feather } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { Pressable, View } from "react-native";

const ICON_MAP = {
  home: "home",
  dashboard: "briefcase",
  insights: "bar-chart-2",
  subscriptions: "settings",
} as const;

type TabName = keyof typeof ICON_MAP;

function CustomTabBar({ state, navigation }: any) {
  return (
    <View
      style={{
        position: "absolute",
        bottom: 24,
        left: 20,
        right: 20,
        height: 64,
        borderRadius: 32,
        backgroundColor: "#202020",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        paddingHorizontal: 8,
      }}
    >
      {state.routes.map((route: any, index: number) => {
        const focused = state.index === index;
        const iconName = ICON_MAP[route.name as TabName] ?? "settings";

        return (
          <Pressable
            key={route.key}
            onPress={() => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });

              if (!focused && !event.defaultPrevented) {
                navigation.navigate(route.name, route.params);
              }
            }}
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              height: 64,
            }}
          >
            <Feather
              name={iconName}
              size={24}
              color={focused ? COLORS.white : "rgba(255,255,255,0.45)"}
            />
          </Pressable>
        );
      })}
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tabs.Screen name="home" />
      <Tabs.Screen name="dashboard" />
      <Tabs.Screen name="insights" />
      <Tabs.Screen name="subscriptions" />
    </Tabs>
  );
}

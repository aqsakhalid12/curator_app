import { ANIMATION } from "@/components/constants/animations";
import { COLORS } from "@/components/constants/theme";
import HomeHeader from "@/components/HomeHeader";
import ThemedText from "@/components/ThemedText";
import {
  AI_SUBSCRIPTIONS,
  STREAMING_SUBSCRIPTIONS,
} from "@/services/dummyData";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useMemo } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import Animated from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const SubscriptionScreen = () => {
  const router = useRouter();
  const allSubs = useMemo(() => {
    return [...AI_SUBSCRIPTIONS, ...STREAMING_SUBSCRIPTIONS]
      .filter((s) => s.status === "active" || s.status === "trial")
      .sort((a, b) => b.price - a.price); // Highest price first for the highlight banner
  }, []);
  return (
    <SafeAreaView
      edges={["top"]}
      className="flex-1"
      style={{ backgroundColor: COLORS.background }}
    >
      <HomeHeader />
      <ScrollView
        contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 140 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="gap-5">
          {allSubs.map((sub, index) => {
            const isHighlighted = index === 0;

            if (isHighlighted) {
              return (
                <Animated.View
                  key={index}
                  entering={ANIMATION.fadeInDown(index * 100)}
                >
                  <TouchableOpacity
                    activeOpacity={0.9}
                    className="overflow-hidden p-6 ounded-bl-[20px] rounded-tl-[20px] rounded-tr-[20px] bg-navActive"
                  >
                    {/* Header Row */}
                    <View className="flex-row justify-between items-center mb-6">
                      <View className="flex-row items-center gap-4">
                        <View
                          className="w-14 h-14 rounded-xl items-center justify-center p-2 shadow-sm"
                          style={{
                            backgroundColor: COLORS.white,
                            shadowColor: "rgba(0,0,0,0.1)",
                          }}
                        >
                          <View
                            className="w-full h-full items-center justify-center rounded-xl"
                            style={{ backgroundColor: "rgba(255,255,255,0.5)" }}
                          >
                            {sub.Logo ? (
                              <sub.Logo size={32} />
                            ) : (
                              <MaterialIcons
                                name={sub.icon as any}
                                size={32}
                                color={COLORS.textNav}
                              />
                            )}
                          </View>
                        </View>
                        <View className="gap-1">
                          <ThemedText
                            variant="heading3"
                            className="text-textNav"
                          >
                            {sub.name}
                          </ThemedText>
                          <ThemedText
                            variant="bodySmall"
                            className="font-semibold text-textNavMuted"
                          >
                            Pro Business
                          </ThemedText>
                        </View>
                      </View>
                      <View className="items-end gap-1">
                        <ThemedText variant="heading3" className="text-textNav">
                          ${sub.price.toFixed(2)}
                        </ThemedText>
                        <ThemedText
                          variant="bodySmall"
                          className="font-semibold text-textNavMuted"
                        >
                          1 month
                        </ThemedText>
                      </View>
                    </View>
                    {/* Deatils Row */}
                    <View className="gap-5 pb-4 border-b border-textNav/10 mb-4">
                      <View className="flex-row justify-between items-center">
                        <View className="flex-row gap-2">
                          <ThemedText
                            variant="body"
                            className="font-semibold text-textNavMuted"
                          >
                            Payment info:
                          </ThemedText>
                          <ThemedText
                            variant="body"
                            className="font-bold text-textNav"
                          >
                            *****8530
                          </ThemedText>
                        </View>
                        <TouchableOpacity className="border border-textNav rounded-full px-4 py-1.5">
                          <ThemedText
                            variant="bodySmall"
                            className="font-bold text-textNav"
                          >
                            Manage
                          </ThemedText>
                        </TouchableOpacity>
                      </View>
                      <View className="flex-row justify-between items-center">
                        <View className="flex-row gap-2">
                          <ThemedText
                            variant="body"
                            className="font-semibold text-textNavMuted"
                          >
                            Plan details:
                          </ThemedText>
                          <ThemedText
                            variant="body"
                            className="font-bold text-textNav"
                          >
                            Premium
                          </ThemedText>
                        </View>
                        <TouchableOpacity className="border border-textNav rounded-full px-4 py-1.5">
                          <ThemedText
                            variant="bodySmall"
                            className="font-bold text-textNav"
                          >
                            Change
                          </ThemedText>
                        </TouchableOpacity>
                      </View>
                    </View>
                    {/* Cancel Button */}
                    <TouchableOpacity
                      activeOpacity={0.8}
                      className="bg-textNav rounded-full py-4 items-center justify-center"
                    >
                      <ThemedText
                        variant="body"
                        className="font-bold text-white tracking-wide"
                      >
                        Cancel Subscription
                      </ThemedText>
                    </TouchableOpacity>
                  </TouchableOpacity>
                </Animated.View>
              );
            }
            // Standard List item
            return (
              <Animated.View
                key={sub.id}
                entering={ANIMATION.fadeInDown(index * 100)}
              >
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => router.push(`/details/${sub.id}` as any)}
                  className="flex-row items-center justify-between px-4 py-5 rounded-2xl mb-3"
                  style={{
                    backgroundColor: COLORS.white,
                    shadowColor: "rgba(0,0,0,0.05)",
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 1,
                    shadowRadius: 8,
                  }}
                >
                  <View className="flex-row items-center gap-4">
                    <View className="w-14 h-14 bg-navCard rounded-xl items-center justify-center p-2 border border-borderSecondary/50 overflow-hidden">
                      <View className="w-full h-full items-center justify-center">
                        {sub.Logo ? (
                          <sub.Logo size={28} />
                        ) : (
                          <MaterialIcons
                            name={sub.icon as any}
                            size={28}
                            color={COLORS.textNav}
                          />
                        )}
                      </View>
                    </View>
                    <View className="gap-1">
                      <ThemedText variant="title" className="text-textNav">
                        {sub.name}
                      </ThemedText>
                      <ThemedText
                        variant="bodySmall"
                        className="font-semibold text-textNavMuted"
                      >
                        Family Plan
                      </ThemedText>
                    </View>
                  </View>
                  <View className="items-end gap-1">
                    <ThemedText variant="title" className="text-textNav">
                      ${sub.price.toFixed(2)}
                    </ThemedText>
                    <ThemedText
                      variant="bodySmall"
                      className="font-semibold text-textNavMuted"
                    >
                      {sub.billingCycle === "monthly" ? "1 month" : "1 year"}
                    </ThemedText>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SubscriptionScreen;
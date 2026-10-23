import { Card } from "@/components/Card";
import CommonHeader from "@/components/CommonHeader";
import { ANIMATION } from "@/components/constants/animations";
import { COLORS } from "@/components/constants/theme";
import ThemedText from "@/components/ThemedText";
import {
  AI_SUBSCRIPTIONS,
  STREAMING_SUBSCRIPTIONS,
} from "@/services/dummyData";
import { MaterialIcons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import Animated, { FadeInLeft } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

const ItemDetailsScreen = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const sub = [...AI_SUBSCRIPTIONS, ...STREAMING_SUBSCRIPTIONS].find(
    (s) => s.id === id,
  );

  const [isYearly, setIsYearly] = useState(false);

  const MONTHLY_FEATURES = [
    "Full access to premium features",
    "Cancel anytime, completely hassle-free",
    "Seamless ad-free experience natively",
    "Watch on 2 supported devices at a time",
    "Standard HD (1080p) streaming resolution",
    "Unlimited movies and mobile games",
    "Download content to watch offline",
  ];

  const YEARLY_FEATURES = [
    ...MONTHLY_FEATURES,
    "Ultra HD (4K) and HDR available",
    "Watch on 4 supported devices",
    "Spatial audio immersive listening",
  ];

  const displayedFeatures = isYearly ? YEARLY_FEATURES : MONTHLY_FEATURES;

  if (!sub) {
    return (
      <SafeAreaView
        edges={["top"]}
        className="flex-1 justify-center items-center"
        style={{ backgroundColor: COLORS.background }}
      >
        <Stack.Screen options={{ headerShown: false }} />
        <View className="p-10 items-center justify-center">
          <ThemedText variant="heading3" color="secondary">
            Subscription Not Found
          </ThemedText>
          <TouchableOpacity
            onPress={() => router.back()}
            className="mt-4 px-6 py-3 bg-primary rounded-md"
          >
            <ThemedText variant="body" className="font-semibold text-white">
              Go Back
            </ThemedText>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      edges={["top"]}
      className="flex-1"
      style={{ backgroundColor: COLORS.background }}
    >
      <CommonHeader title={sub.name} showAvatar={true} />
      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}
      >
        <View className="px-6 mt-4 gap-10">
          {/* Hero section */}
          <Animated.View
            entering={ANIMATION.fadeInDown(0)}
            className="items-center"
          >
            <View className="w-32 h-32 rounded-[28px] flex items-center justify-center p-5 mb-6 shadow-xl">
              <View
                className="w-full h-full rounded-[20px] items-center justify-center shadow-inner"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.25)" }}
              >
                {sub.Logo ? (
                  <sub.Logo size={55} />
                ) : (
                  <MaterialIcons
                    name={sub.icon as any}
                    size={55}
                    color={COLORS.white}
                  />
                )}
              </View>
            </View>
            <ThemedText variant="heading1" color="secondary">
              {sub.name}
            </ThemedText>
            {/* Billing Toogle */}
            <View
              className="flex-row p-1.5 rounded-full m-6 border border-borderLight"
              style={{
                width: "100%",
                maxWidth: 300,
                backgroundColor: COLORS.background,
                shadowColor: "rgba(0,0,0,0.06)",
                shadowOffset: { width: 0, height: 3 },
                shadowRadius: 8,
              }}
            >
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setIsYearly(false)}
                className={`flex-1 py-3.5 items-center justify-center rounded-full ${!isYearly ? "bg-primary shadow-md" : "bg-transparent"}`}
                style={
                  !isYearly
                    ? {
                        shadowColor: COLORS.primary,
                        shadowOpacity: 0.3,
                        shadowRadius: 5,
                        shadowOffset: { width: 0, height: 2 },
                      }
                    : undefined
                }
              >
                <ThemedText
                  className={`text-[15px] ${!isYearly ? "font-extrabold text-white" : "font-bold"}`}
                  color={!isYearly ? undefined : "tertiary"}
                >
                  Monthly
                </ThemedText>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => setIsYearly(true)}
                className={`flex-1 py-3.5 flex-row items-center justify-center rounded-full gap-1.5 ${isYearly ? "bg-primary shadow-md" : "bg-transparent"}`}
                style={
                  isYearly
                    ? {
                        shadowColor: COLORS.primary,
                        shadowOpacity: 0.3,
                        shadowRadius: 5,
                        shadowOffset: { width: 0, height: 2 },
                      }
                    : undefined
                }
              >
                <ThemedText
                  className={`text-[15px] ${isYearly ? "font-extrabold text-white" : "font-bold"}`}
                  color={isYearly ? undefined : "tertiary"}
                >
                  Yearly
                </ThemedText>
                <View
                  className={`px-1.5 py-0.5 rounded-full ${isYearly ? "bg-white/20" : "bg-primary/10"}`}
                >
                  <ThemedText
                    className={`font-extrabold text-[9px] uppercase tracking-wider ${isYearly ? "text-white" : "text-primary"}`}
                  >
                    -5%
                  </ThemedText>
                </View>
              </TouchableOpacity>
            </View>
          </Animated.View>
          {/* Subcription Details Card */}
          <Animated.View entering={ANIMATION.fadeInDown(150)}>
            <Card className="gap-8 py-8 shadow-sm shadow-black/5 bg-white border-0">
              <View className="flex-row justify-between items-center">
                <View>
                  <ThemedText
                    className="text-xs font-extrabold mb-1 uppercase tracking-wider"
                    color="tertiary"
                  >
                    Total Price
                  </ThemedText>
                  <View className="flex-row items-end">
                    <ThemedText
                      variant="heading3"
                      className="text-5xl font-black"
                      color="secondary"
                    >
                      $
                      {(() => {
                        const baseMonthly =
                          sub.billingCycle === "yearly"
                            ? sub.price / 12
                            : sub.price;
                        return isYearly
                          ? (baseMonthly * 12 * 0.95).toFixed(2)
                          : baseMonthly.toFixed(2);
                      })()}
                    </ThemedText>
                    <ThemedText
                      className="text-base font-bold ml-1 mb-1.5"
                      color="primary"
                    >
                      / {isYearly ? "yr" : "mo"}
                    </ThemedText>
                  </View>
                </View>
                <View className="flex-row items-center gap-2 px-4 py-2 rounded-full bg-successBackground">
                  <MaterialIcons
                    name="local-fire-department"
                    color={COLORS.success}
                    size={16}
                  />
                  <ThemedText>Popular</ThemedText>
                </View>
              </View>
              <View className="gap-5 pt-6 border-t border-borderLight">
                {displayedFeatures.map((feature, idx) => (
                  <Animated.View
                    key={`${isYearly ? "y" : "m"} - ${idx}`}
                    entering={FadeInLeft.delay(idx * 75).duration(400)}
                    className="flex-row items-center gap-3.5"
                  >
                    <View className="w-6 h-6 rounded-full bg-successBackground items-center justify-center">
                      <MaterialIcons
                        name="done"
                        size={14}
                        color={COLORS.success}
                      />
                    </View>
                    <ThemedText>{feature}</ThemedText>
                  </Animated.View>
                ))}
              </View>
            </Card>
          </Animated.View>
          {/* Action Buttons */}
          <Animated.View
            entering={ANIMATION.fadeInDown(450)}
            className="gap-3 pt-4"
          >
            <TouchableOpacity
              onPress={() => router.push("/(auth)/sign-in")}
              className="w-full py-4 rounded-2xl flex-row items-center justify-center gap-2 shadow-lg bg-primary border border-white/20"
              style={{
                shadowColor: COLORS.primary,
                shadowOpacity: 0.3,
                shadowRadius: 10,
                shadowOffset: { width: 0, height: 5 },
              }}
            >
              <MaterialIcons name="bolt" size={24} color={COLORS.white} />
              <ThemedText className="font-extrabold text-white" variant="title">
                Get Subscription
              </ThemedText>
            </TouchableOpacity>
          </Animated.View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ItemDetailsScreen;
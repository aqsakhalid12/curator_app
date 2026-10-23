import React from "react";
import { Image, StyleSheet, View } from "react-native";

interface GlobalLogoProps {
  size?: number;
  color?: string;
  variant?: "primary" | "monochrome" | "dark";
}

const Logo = ({ size = 32, color, variant = "primary" }: GlobalLogoProps) => {
  return (
    <View
      style={{
        width: size,
        height: size,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Image
        source={require("../../assets/images/icon.png")}
        style={styles.logo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});

export default Logo;
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
export const HeaderModal = ({route, setValue}) => {
  return (
    <View style={[styles.container, { elevation: 10 }]}>
      <Ionicons
        onPress={() => setValue(false)}
        name="arrow-back"
        size={35}
        color="white"
      />
      <Text style={styles.text}>{route}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 70,
    backgroundColor: "#6464f8",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    paddingHorizontal: 10,
  },
  text: {
    color: "white",
    textTransform: "uppercase",
    fontSize: 20,
    fontWeight: "bold",
  },
});

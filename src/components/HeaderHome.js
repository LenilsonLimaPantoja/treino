import React, { useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ContextGlobal } from "../context/GlobalContext";
export const HeaderHome = () => {
  const {handleRedirect} = useContext(ContextGlobal);
  return (
    <View style={[styles.container, { elevation: 10 }]}>
      <Text style={styles.text}>Home</Text>
      <TouchableOpacity onPress={() => handleRedirect('CadastrarTreinos')}>
        <Ionicons name="add" size={35} color="white" />
      </TouchableOpacity>
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
    width: "100%",
  },
  text: {
    color: "white",
    textTransform: "uppercase",
    fontSize: 20,
    fontWeight: "bold",
  },
});

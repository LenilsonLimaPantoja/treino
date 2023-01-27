import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export const Button = ({backgroundColor, color, text, funcao}) => {
  return (
    <TouchableOpacity activeOpacity={0.5} style={[styles.btn,{backgroundColor: backgroundColor ? backgroundColor : '#fff'}]} onPress={funcao}>
      <Text style={[styles.textBtn,{color: color ? color : '#fff'}]}>{text}</Text>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  btn: {
    height: 50,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginBottom: 10,
  },
  textBtn:{
    color: "#fff",
    fontWeight: "bold",
  }
});

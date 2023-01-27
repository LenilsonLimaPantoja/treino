import React from "react";
import { StyleSheet, TextInput, TouchableOpacity } from "react-native";

export const Input = ({ placeholder, validate, setValue, value }) => {
  return (
    <TouchableOpacity
      style={[
        styles.input,
        { borderColor: "red", borderWidth: validate ? 1 : 0 },
      ]}
    >
      <TextInput
        placeholder={placeholder}
        onChangeText={setValue}
        value={value}
      />
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  input: {
    width: "100%",
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    elevation: 10,
  },
});

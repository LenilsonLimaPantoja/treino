import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { HeaderSimples } from "../../../components/HeaderSimples";
export const CadastrarTreinos = () => {
  return (
    <View style={styles.container}>
      <HeaderSimples route="Cadastrar Treino" />
      <View style={styles.areaTreino}>
        <Text style={{ color: "#fff" }}>Cadastro de Treino</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6464f8",
  },
  areaTreino: {
    padding: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useContext, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HeaderSimples } from "../../../components/HeaderSimples";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { ContextGlobal } from "../../../context/GlobalContext";
import FabButtons from "../../../components/FabButtons";
import { removeEquipamentosDb } from "../../../database/ServicesEquipamentos";
const Equipamento = ({ item }) => (
  <TouchableOpacity activeOpacity={0.5} style={[styles.item, { elevation: 5 }]}>
    <MaterialCommunityIcons
      style={[styles.icone, { elevation: 5 }]}
      name="dumbbell"
    />
    <Text style={styles.textItem}>{item.descricao}</Text>
  </TouchableOpacity>
);
export const ListarEquipamentos = () => {
  const { handleEquipamentos, equipamentos, handleRedirect } =
    useContext(ContextGlobal);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  useFocusEffect(
    useCallback(() => {
      const hnadleDataBd = async () => {
        setLoading(true);
        await handleEquipamentos();
        setLoading(false);
      };
      hnadleDataBd();
    }, [refreshing])
  );
  const handleConfirmeLimparDados = () => {
    Alert.alert(
      "Limpar Dados",
      "Deseja limpar todos os dados?",
      [
        {
          text: "Não",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "Sim",
          onPress: () => handleRemoveEquipamentos(),
        },
      ],
      { cancelable: false }
    );
  };

  const handleRemoveEquipamentos = async () => {
    setLoading(true);
    await removeEquipamentosDb()
      .then((resp) => {
        Alert.alert("SUCESSO", resp, [
          {
            text: "Fechar",
            onPress: () => setLoading(false),
          },
        ]);
        handleEquipamentos();
      })
      .catch((err) => {
        Alert.alert("ERRO", err, [
          {
            text: "Fechar",
            onPress: () => setLoading(false),
          },
        ]);
      });
  };

  return (
    <View style={styles.container}>
      <HeaderSimples route="Listagem de Equipamentos" />
      {loading ? (
        <View style={styles.nenhumEquipamente}>
          <ActivityIndicator size={25} />
        </View>
      ) : equipamentos.length === 0 ? (
        <View style={styles.nenhumEquipamente}>
          <Text style={{ color: "#fff" }}>Nenhum equipamento cadastrado</Text>
        </View>
      ) : (
        <SafeAreaView style={styles.areaItens}>
          <FlatList
            data={equipamentos}
            renderItem={({ item }) => <Equipamento item={item} />}
            keyExtractor={(item) => item.id}
          />
        </SafeAreaView>
      )}
      <FabButtons
        add={() => handleRedirect("CadastrarEquipamento")}
        recarregar={() => setRefreshing(!refreshing)}
        excluir={() => handleConfirmeLimparDados()}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#6464f8",
    flex: 1,
  },
  nenhumEquipamente: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  areaItens: {
    padding: 10,
  },
  item: {
    backgroundColor: "#fff",
    height: 70,
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  icone: {
    backgroundColor: "#174c4f",
    color: "#fff",
    fontSize: 40,
    padding: 10,
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  textItem: {
    marginLeft: 10,
    color: "#174c4f",
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});

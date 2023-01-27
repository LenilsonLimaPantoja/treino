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
import {
  readExerciciosDb,
  removerExercicioDb,
} from "../../../database/ServicesExercicios";
const Exercicio = ({ item }) => (
  <TouchableOpacity activeOpacity={0.5} style={[styles.item, { elevation: 5 }]}>
    <MaterialCommunityIcons
      style={[styles.icone, {elevation: 5}]}
      name="arm-flex"
    />
    <View>
      <Text style={styles.textItem}>{item.descricao}</Text>
      <Text
        style={[
          styles.textItem,
          { textTransform: "capitalize", fontWeight: "normal", color: "gray" },
        ]}
      >
        Equipamento: {item.descricao_eq}
      </Text>
    </View>
  </TouchableOpacity>
);
export const ListarExercicios = () => {
  const { handleRedirect } = useContext(ContextGlobal);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [exercicios, setExercicios] = useState([]);
  useFocusEffect(
    useCallback(() => {
      const hnadleDataBd = async () => {
        setLoading(true);
        await readExerciciosDb()
          .then((resp) => {
            setExercicios(resp);
          })
          .catch((err) => {
            console.log(err);
          });
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
    await removerExercicioDb()
      .then((resp) => {
        Alert.alert("SUCESSO", resp, [
          {
            text: "ok",
            onPress: () => setLoading(false),
          },
        ]);
        setRefreshing(!refreshing);
      })
      .catch((err) => {
        Alert.alert("ERRO", err, [
          {
            text: "ok",
            onPress: () => setLoading(false),
          },
        ]);
      });
  };

  return (
    <View style={styles.container}>
      <HeaderSimples route="Listagem de Exercicio" />
      {loading ? (
        <View style={styles.nenhumExercicio}>
          <ActivityIndicator size={25} />
        </View>
      ) : exercicios.length === 0 ? (
        <View style={styles.nenhumExercicio}>
          <Text style={{ color: "#fff" }}>Nenhum exercicio cadastrado</Text>
        </View>
      ) : (
        <SafeAreaView style={styles.areaItens}>
          <FlatList
            data={exercicios}
            renderItem={({ item }) => <Exercicio item={item} />}
            keyExtractor={(item) => item.id}
          />
        </SafeAreaView>
      )}
      <FabButtons
        add={() => handleRedirect("CadastrarExercicio")}
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
  nenhumExercicio: {
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

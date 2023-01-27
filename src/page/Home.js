import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useContext } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { HeaderHome } from "../components/HeaderHome";
import { ContextGlobal } from "../context/GlobalContext";
import {
  createTableEquipamentos,
  createTableExercicios,
  createTableTreinos,
} from "../database/CreateTables";
export default function Home() {
  const { handleRedirect } = useContext(ContextGlobal);
  useFocusEffect(
    useCallback(() => {
      createTableEquipamentos();
      createTableExercicios();
      createTableTreinos();
    }, [])
  );
  return (
    <>
      <View style={styles.container}>
        <HeaderHome />
        <View style={styles.areaHome}>
          <TouchableOpacity
            style={[styles.card, { elevation: 10 }]}
            activeOpacity={0.5}
            onPress={() => handleRedirect("ListarEquipamentos")}
          >
            <Text style={styles.textCard}>
              Visualizar Todos os Equipamentos
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.card, { elevation: 10 }]}
            activeOpacity={0.5}
            onPress={() => handleRedirect("ListarExercicios")}
          >
            <Text style={styles.textCard}>
              Visualizar Todos os Exercicios
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#6464f8",
    flex: 1,
  },
  areaHome: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    minHeight: "100%",
  },
  card: {
    backgroundColor: "#fff",
    height: 70,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
    marginTop: 10,
  },
  textCard: {
    color: "#f66",
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});

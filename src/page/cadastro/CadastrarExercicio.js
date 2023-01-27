import React, { useCallback, useContext } from "react";
import {
  Alert,
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Button } from "../../components/Button";
import { HeaderSimples } from "../../components/HeaderSimples";
import { Input } from "../../components/Input";
import { ModalTelaCheia } from "../../components/ModalTelaCheia";
import { ContextGlobal } from "../../context/GlobalContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { addExercicioDb } from "../../database/ServicesExercicios";
import { useFocusEffect } from "@react-navigation/native";
const Equipamento = ({ item, funcao }) => (
  <TouchableOpacity
    activeOpacity={0.5}
    style={[styles.item, { elevation: 5 }]}
    onPress={funcao}
  >
    <MaterialCommunityIcons
      style={[styles.icone, { elevation: 5 }]}
      name="dumbbell"
    />
    <Text style={styles.textItem}>{item.descricao}</Text>
  </TouchableOpacity>
);
export const CadastrarExercicio = () => {
  const [descricao, setDescricao] = React.useState("");
  const [openCloseModal, setOpenCloseModal] = React.useState(false);
  const { equipamentos, handleEquipamentos, handleGoBack } =
    useContext(ContextGlobal);
  const [equipamentoSelecionado, setEquipamentoSelecionado] = React.useState(
    {}
  );

  useFocusEffect(
    useCallback(() => {
      handleEquipamentos();
    }, [])
  );
  const handleGravarExercicio = async () => {
    let dados = {
      equipamento_id: equipamentoSelecionado.id,
      descricao: descricao,
    };

    if (dados.equipamento_id === undefined || dados.descricao === "") {
      return Alert.alert("Atenção", "Todos os campos devem ser preenchidos");
    }
    await addExercicioDb(dados)
      .then((res) => {
        console.log(res);
        Alert.alert("Atenção", res, [
          {
            text: "OK",
            onPress: () => handleGoBack(),
          },
        ]);

        setEquipamentoSelecionado({});
        setDescricao("");
      })
      .catch((err) => {
        console.log(err);
        Alert.alert("Atenção", err);
      });
  };

  const handleSelecionarEquipamento = (item) => {
    console.log(item);
    if (item) {
      setEquipamentoSelecionado(item);
    }
    setOpenCloseModal(false);
  };

  return (
    <View style={styles.container}>
      <HeaderSimples route="Cadastrar Exercicio" />
      <View style={styles.areaExercicio}>
        <Input
          placeholder="Informe a descrição do exercicio"
          setValue={setDescricao}
          value={descricao}
          validate={descricao === "" ? true : false}
        />
        {equipamentoSelecionado.id && (
          <Input
            value={`${equipamentoSelecionado?.id} - ${equipamentoSelecionado?.descricao}`}
          />
        )}
        <Button
          backgroundColor="#f66"
          text={
            equipamentoSelecionado.id
              ? "Alterar Equipamento"
              : "Selecionar Equipamento"
          }
          funcao={() => setOpenCloseModal(true)}
        />
        <Button
          backgroundColor="orange"
          text="Salvar"
          funcao={handleGravarExercicio}
        />
      </View>
      <ModalTelaCheia
        rota="Selecionar Equipamento"
        value={openCloseModal}
        setValue={setOpenCloseModal}
      >
        {equipamentos.length === 0 ? (
          <View style={styles.nenhumEquipamente}>
            <Text style={{ color: "#fff" }}>Nenhum equipamento cadastrado</Text>
          </View>
        ) : (
          <SafeAreaView style={styles.areaItens}>
            <FlatList
              data={equipamentos}
              renderItem={({ item }) => (
                <Equipamento
                  item={item}
                  funcao={() => handleSelecionarEquipamento(item)}
                />
              )}
              keyExtractor={(item) => item.id}
            />
          </SafeAreaView>
        )}
      </ModalTelaCheia>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6464f8",
  },
  areaExercicio: {
    padding: 10,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  nenhumEquipamente: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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

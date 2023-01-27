import { useContext, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { Button } from "../components/Button";
import { HeaderSimples } from "../components/HeaderSimples";
import { Input } from "../components/Input";
import { ContextGlobal } from "../context/GlobalContext";
import { addEquipamentoDb } from "../database/ServicesEquipamentos";
export default function CadastrarEquipamento() {
  const [descricao, setDescricao] = useState("");
  const { handleGoBack } = useContext(ContextGlobal);
  const addEquipamento = async () => {
    if (descricao === "") {
      return Alert.alert("ATENÇÃO", "Todos os campos devem ser preenchidos");
    }

    await addEquipamentoDb(descricao)
      .then((res) => {
        Alert.alert("SUCESSO", res, [
          {
            text: "OK",
            onPress: () => handleGoBack(),
          },
        ]);
        setDescricao("");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <View style={styles.container}>
        <HeaderSimples route="Cadastro de Equipamento" />
        <View style={styles.areaCadastrarEquipamento}>
          <Input
            placeholder="Informe a descrição do equipamento"
            value={descricao}
            setValue={setDescricao}
            validate={descricao === "" ? true : false}
          />
          <Button
            backgroundColor="orange"
            color="#fff"
            text="Salvar"
            funcao={addEquipamento}
          />
        </View>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6464f8",
  },
  areaCadastrarEquipamento: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    minHeight: "100%",
  },
});

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../page/Home";
import CadastrarEquipamento from "../page/CadastrarEquipamento";
import { ListarEquipamentos } from "../page/listagem/equipamentos/ListarEquipamentos";
import { CadastrarExercicio } from "../page/cadastro/CadastrarExercicio";
import { ListarExercicios } from "../page/listagem/exercicios/ListarExercicios";
import { CadastrarTreinos } from "../page/cadastro/treinos/CadastrarTreinos";

const Stack = createNativeStackNavigator();

export default function Rotas() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen
        name="CadastrarEquipamento"
        component={CadastrarEquipamento}
      />
      <Stack.Screen name="CadastrarExercicio" component={CadastrarExercicio} />
      <Stack.Screen name="CadastrarTreinos" component={CadastrarTreinos} />
      <Stack.Screen name="ListarEquipamentos" component={ListarEquipamentos} />
      <Stack.Screen name="ListarExercicios" component={ListarExercicios} />
    </Stack.Navigator>
  );
}

import { NavigationContainer } from "@react-navigation/native";
import Rotas from "./src/rotas/Rotas";
import { GlobalContext } from "./src/context/GlobalContext";
import { StatusBar } from "react-native";
export default function App() {
  return (
    <NavigationContainer>
      <GlobalContext>
        <Rotas />
      </GlobalContext>
      <StatusBar backgroundColor="#6464f8" />
    </NavigationContainer>
  );
}

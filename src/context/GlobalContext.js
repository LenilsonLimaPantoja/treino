import { useNavigation } from "@react-navigation/native";
import { createContext, useState } from "react";
import { readEquipamentoDb } from "../database/ServicesEquipamentos";
export const ContextGlobal = createContext();
export function GlobalContext({ children }) {
  const [equipamentos, setEquipamentos] = useState([]);
  const navigation = useNavigation();
  const handleRedirect = (route) => {
    navigation.navigate(route);
  };
  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleEquipamentos = async () => {
    await readEquipamentoDb()
      .then((res) => {
        setEquipamentos(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <ContextGlobal.Provider
      value={{
        handleRedirect,
        handleGoBack,
        handleEquipamentos,
        navigation,
        equipamentos,
        setEquipamentos
      }}
    >
      {children}
    </ContextGlobal.Provider>
  );
}

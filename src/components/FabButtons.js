import React, { useState } from "react";
import { FAB, Portal, Provider } from "react-native-paper";
const style = { backgroundColor: "#fff", borderRadius: 50 };
const FabButtons = ({ recarregar, excluir, add }) => {
  const [state, setState] = useState(false);

  const onStateChange = ({ open }) => setState({ open });

  const { open } = state;

  return (
    <FAB.Group
      open={open}
      visible
      icon={open ? "close" : "menu"}
      actions={[
        {
          icon: "refresh",
          onPress: () => recarregar(),
          style,
          size: 25,
          color: "green",
        },
        {
          icon: "delete",
          onPress: () => excluir(),
          style,
          size: 25,
          color: "red",
        },
        {
          icon: "plus",
          onPress: () => add(),
          style,
          size: 25,
          color: "orange",
        },
      ]}
      onStateChange={onStateChange}
      backdropColor="transparent"
      fabStyle={{ backgroundColor: "#fff", borderRadius: 50 }}
    />
  );
};

export default FabButtons;

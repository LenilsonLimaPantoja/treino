import React from "react";
import { Modal, SafeAreaView, StyleSheet, View } from "react-native";
import { HeaderModal } from "./HeaderModal";

export const ModalTelaCheia = ({ children, rota, value,setValue }) => {
  return (
    <Modal
      animationType="slide"
      transparent
      visible={value}
      onRequestClose={() => setValue(false)}
    >
      <HeaderModal route={rota} setValue={setValue}/>
      <SafeAreaView style={styles.container}>
        <View style={styles.areaModal}>{children}</View>
      </SafeAreaView>
    </Modal>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#6464f8",
  },
  areaModal: {
    width: "100%",
    height: "100%",
    padding: 10,
  },
});

import db from "./open";

export const addEquipamentoDb = async (equipamento) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO equipamentos (descricao) VALUES (?)",
        [equipamento],
        (txObj, results) => {
          resolve(`Equipamento ${equipamento} cadastrado com sucesso!`);
        },
        (txObj, error) => {
          reject("Erro ao inserir equipamento");
          console.log(error);
        }
      );
    });
  });
};

export const readEquipamentoDb = async () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "select * from equipamentos",
        [],
        (txObj, resultSet) => {
          resolve(resultSet.rows._array);
        },
        (txObj, error) => {
          reject("Erro ao ler equipamentos");
          console.log(error);
        }
      );
    });
  });
};


export const removeEquipamentosDb = async () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "delete from equipamentos",
        [],
        (txObj, results) => {
          resolve("Equipamentos removido com sucesso!");
        },
        (txObj, error) => {
          reject("Erro ao remover equipamentos");
          console.log(error);
        }
      );
    });
  });
};

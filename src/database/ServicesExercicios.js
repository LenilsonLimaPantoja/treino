import db from "./open";

export const addExercicioDb = (exercicio) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "INSERT INTO exercicios (descricao, equipamento_id) VALUES (?, ?)",
        [exercicio.descricao, exercicio.equipamento_id],
        (tx, results) => {
          resolve(`Exercício ${exercicio.descricao} adicionado com sucesso!`);
        },
        (tx, err) => {
          reject(`Erro ao adicionar o exercício ${exercicio.descricao}`);
          console.log(err);
        }
      );
    });
  });
};

export const readExerciciosDb = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT exercicios.id, exercicios.descricao, exercicios.equipamento_id, equipamentos.descricao AS descricao_eq FROM exercicios INNER JOIN equipamentos ON exercicios.equipamento_id = equipamentos.id",
        [],
        (tx, results) => {
          console.log(results.rows._array);
          resolve(results.rows._array);
        },
        (tx, err) => {
          reject("Erro ao buscar os exercícios");
          console.log(err);
        }
      );
    });
  });
};

export const removerExercicioDb = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "DELETE FROM exercicios",
        [],
        (tx, results) => {
          resolve(`Todos os exercícios foram removidos com sucesso!`);
        },
        (tx, err) => {
          reject(`Erro ao remover os exercícios`);
          console.log(err);
        }
      );
    });
  });
};

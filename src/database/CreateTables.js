import db from "./open";
export const createTableEquipamentos = async () => {
  db.transaction(async (tx) => {
    tx.executeSql(
      "CREATE TABLE IF NOT EXISTS equipamentos (id INTEGER PRIMARY KEY AUTOINCREMENT, descricao TEXT)"
    );
  });
};

export const createTableExercicios = async () => {
  db.transaction(async (tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS exercicios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        descricao TEXT, 
        equipamento_id INTEGER,
        FOREIGN KEY(equipamento_id) REFERENCES equipamentos(id) ON DELETE CASCADE ON UPDATE CASCADE
      )`
    );
  });
};

export const createTableTreinos = async () => {
  db.transaction(async (tx) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS treinos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
         descricao TEXT, 
         exercicio_id INTEGER,
        FOREIGN KEY(exercicio_id) REFERENCES exercicios(id) ON DELETE CASCADE ON UPDATE CASCADE
      )`
    );
  });
};

import * as Sqlite from "expo-sqlite";
const db = Sqlite.openDatabase("gestor_treino.db", "1.0");
export default db;

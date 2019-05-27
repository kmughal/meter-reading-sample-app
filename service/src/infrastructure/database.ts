import * as sqlite3 from 'sqlite3';

let connection: sqlite3.Database = null;
export const getDatabasePool = () => {

  if (connection === null) connection = new sqlite3.Database(':memory:');
  connection.on("close" , () => connection = null);
  return connection;
  
};

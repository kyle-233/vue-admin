const mysql = require("mysql");

class Connect {
  // 构造函数
  constructor(options) {
    this.host = options.host;
    this.user = options.user;
    this.password = options.password;
    this.database = options.database;
  }

  // 连接数据库
  _connect() {
    return new Promise((resolve, reject) => {
      var connection = mysql.createConnection({
        host: this.host,
        user: this.user,
        password: this.password,
        database: this.database,
      });

      connection.connect((err) => {
        if (err) {
          reject(err);
          console.log(err);
        } else {
          resolve(connection);
          console.log("Successfully");
        }
      });
    });
  }

  // 查询数据
  /**
   * @description: 查询数据
   * @param {{email: string, password: string}} options
   * @return {object} Promise对象
   */
  _query(options) {
    return new Promise((resolve, reject) => {
      this._connect()
        .then((connection) => {
          let sql = options.password.length === 0 ? "SELECT * from users WHERE Email = '" + options.email + "'" : "SELECT * from users WHERE Email = '" + options.email + "'" + " AND Password = '" + options.password + "'";
          // console.log(sql);
          connection.query(sql, function (
            error,
            results,
            fields
          ) {
            if (error) {
              reject('Failed')
            } else {
              if (results.length === 1) {
                // console.log("The solution is: ", results);
                resolve(results);
              } else {
                // console.log("111111", results);
                reject();
              }
            }
          });
        })
        .catch(err => {
          console.log(err);
          reject();
        });
    })
  }

  // 添加数据
  _insert(email, password) {
    return new Promise((resolve, reject) => {
      this._connect()
        .then((connection) => {
          var sql = "INSERT INTO `users`(`Email`, `Password`) VALUES('" + email + "', '" + password + "')";
          connection.query(sql, function (err, result) {
            if (err) {
              console.log('[INSERT ERROR] - ', err.message);
              reject();
              return;
            } else {
              // console.log(result);
              if (result.affectedRows === 1) {
                // console.log(result.affectedRows);
                resolve();
              }
            }
          })
        })
        .catch((err) => {
          console.log(err);
          reject();
        });
    })
  }

  // 更新数据库
  _update(email, password) {
    return new Promise((resolve, reject) => {
      this._connect().then(connection => {
        var sql = "UPDATE users SET Password = '" + password + "' WHERE Email = '" + email + "'";
        connection.query(sql, function (err, result) {
          if (err) {
            console.log('[UPDATE ERROR] - ', err.message);
            reject();
            return;
          } else {

            if (result.changedRows === 1) {
              resolve();
            } else {
              reject();
              // console.log('UPDATE affectedRows', result.changedRows);
            }
          }
        });
      }).catch(err => {
        console.log("err");
        reject();
      })
    })
  }

  // 删除数据
  _delete(email) {
    return new Promise((resolve, reject) => {
      this._connect().then(connection => {
        var sql = "DELETE FROM users where Email = '" + email + "'";
        connection.query(sql, function (err, result) {
          if (err) {
            console.log('[DELETE ERROR] - ', err.message);
            reject();
            return;
          } else {
            if (result.affectedRows === 1) {
              resolve();
            } else {
              // console.log('DELETE affectedRows', result.affectedRows);
              reject();
            }
          }
        });
      }).catch(err => {
        console.log(err);
        reject();
      })
    })
  }
}

var server = {
  host: "192.168.0.105",
  user: "root",
  password: "DeiJDrL0mgt85URY",
  database: "vue_admin",
};

let _mysql = new Connect(server);
_mysql._connect();
// let sqlData = {
//   email: '111111111',
//   password: 'gdfgfdgfadfg'
// }
// _mysql._query()
// c1._insert();
// c1._update();
// c1._delete();

// module.exports = _mysql;

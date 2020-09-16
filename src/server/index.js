const http = require("http");
const url = require("url");
const querystring = require("querystring");

const mysql = require("./mysql");
const { user } = require("./mysql");

// _mysql._connect();

const app = http.createServer((req, res) => {
  // url 转换对象
  var url_obj = url.parse(req.url);

  // 处理 Request 请求
  if (url_obj.pathname === "/request" && req.method === "POST") {
    var user_info = '';
    req.on("data", (chunk) => {
      user_info += chunk;
      // console.log(chunk);
    });
    req.on("end", (error) => {
      res.setHeader('content-type', 'text/html; charset=utf-8');
      if (!error) {
        // var user_obj = querystring.parse(user_info);
        user_obj = JSON.parse(user_info);
        // console.log(user_obj.email);
        var password = getPasswprd();
        // ...
        // 判断数据库是否有这个数据
        let sqlData = {
          email: user_obj.email,
          password: ''
        }
        mysql._query(sqlData).then(result => {
          res.write('{"status": 1, "message":"邮箱已注册"}');
          res.end();
          return;
        }).catch(err => {
          mysql._insert(user_obj.email, password).then(result => {
            // console.log("res: " + result);
            res.write('{"status": 0, "message":"注册成功", "email":"' + user_obj.email + '", "password": "' + password + '"}');
            res.end();
            return;
          }).catch(err => {
            // console.log(err);
            res.write('{"status": 1, "message":"注册失败"}');
            res.end();
            return;
          })
          // res.write('{"status": 1, "message":"查无此邮箱"}');
          // res.end();
          // return;
        })
      } else {
        res.write('{"status": 1, "message":"服务器错误"}');
        res.end();
        return;
      }
    });
    return;
  }

  // 处理 Signin 请求
  if (url_obj.pathname === "/signin" && req.method === "POST") {
    var user_info = "";
    req.on("data", (chunk) => {
      user_info += chunk;
    });
    req.on("end", (error) => {
      if (!error) {
        var user_obj = JSON.parse(user_info);
        // ...
        // console.log(user_obj);
        let sqlData = {
          email: user_obj.email,
          password: user_obj.password
        }
        mysql._query(sqlData).then(result => {
          res.write('{"status": 0, "message":"登录成功", "storage": true}');
          res.end();
          return;
        }).catch(err => {
          res.write('{"status": 1, "message":"输入有误，请重新输入!"}');
          res.end();
          return;
        })
        // res.write("signin call");
        // res.end();
      }
    });

  }

  // 处理 Logout 请求
  if (url_obj.pathname === "/logout" && req.method === "POST") {
    res.write('{"status": 0, "message":"登出成功", "storage": ""}');
    res.end();
    return;
  }

  // 处理 Recover 请求
  if (url_obj.pathname === "/recover" && req.method === "POST") {
    var user_info = "";
    req.on("data", (chunk) => {
      user_info += chunk;
    });
    req.on("end", (error) => {
      if (!error) {
        var user_obj = JSON.parse(user_info);
        // ...
        let sqlData = {
          email: user_obj.email,
          password: ''
        }
        mysql._query(sqlData).then(result => {
          // console.log(result[0].Password);
          res.write('{"status": 0, "message": "成功找回密码", "password": ' + result[0].Password + '}');
          res.end();
          return;
        }).catch(err => {
          res.write('{"status": 1, "message":"查无此邮箱!"}');
          res.end();
          return;
        })
        // res.write("recover call");
        // res.end();
      }
    });
  }
  // let password = getPasswprd();
  // res.write(password);
  // res.end();
});

app.listen(3000, (error) => {
  if (!error) {
    console.log("Listening at 3000 Port");
  }
});

/**
 * 生成密码
 */
function getPasswprd() {
  var passArr = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "@",
    "$",
  ];
  let password = "";
  var passArrLen = passArr.length;
  for (let i = 0; i < 8; i++) {
    var x = Math.floor(Math.random() * passArrLen);
    password += passArr[x];
  }
  return password;
}

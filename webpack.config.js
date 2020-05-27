/* eslint-disable quotes,no-undef */
const MomentLocalesPlugin = require("moment-locales-webpack-plugin");
const path = require("path");

module.exports = {
  mode: "development", // режим сборки
  entry: "./src/main.js", // точка входа приложения
  output: { // настройка выходного файла
    filename: "bundle.js",
    path: path.join(__dirname, "public"),
  },
  devtool: "source-map", // подключаем sourcemaps
  devServer: {
    contentBase: path.join(__dirname, "public"), // где искать сборку
    // publicPath: 'http://localhost:8080/', //веб адрес сбоки
    // compress: true, // сжатие
    // автоматическая перезагрузка стр
    // если не работает по стандартному url в браузере: http://localhost:8080/, то добавить к нему http://localhost:8080/webpack-dev-server/
    watchContentBase: true,
  },
  plugins: [
    new MomentLocalesPlugin()
  ]
};

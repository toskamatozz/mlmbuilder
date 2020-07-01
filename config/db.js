// конфигурация базы данных
module.exports = {
  db: {
    uri: 'mongodb://localhost:27017/mlm',
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    },
  },
};

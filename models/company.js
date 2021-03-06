const path = require('path');
const mongoose = require('mongoose');

const { Schema } = mongoose;

const generalSchema = new Schema({ // Схема
  name: { type: Schema.Types.String },
  users: [{
    type: Schema.Types.String,
    ref: 'user',
  }],
  treeType: {
    type: Schema.Types.String,
    enum: ['uniLevel', 'matrix', 'binary', 'stairStep'],
  },
}, { timestamps: true }); // Настройки схемы, в данном случае добавить поле createdAt, updatedAt (когда создали документ, когда обновили документ)


const modelname = path.basename(__filename, '.js'); // Название модели совпадает с названием файла модели. Тут мы получаем имя файла без расширения .js
const model = mongoose.model(modelname, generalSchema); // собственно создаем модель
module.exports = model;

const UserModel = require('models/user');
const CompanyModel = require('models/company');
const TreeModel = require('models/tree');

const createCompany = async (companyName, treeType) => {
  const doc = new CompanyModel({ companyName, treeType });
  const company = await doc.save();
  const companyId = company.id;
  return companyId;
};

const createTree = async (referId, companyId) => {
  console.log(referId, companyId);
  const doc = await new TreeModel({
    referTree: [],
    user: referId,
    company: companyId,
  });
  await doc.save();
};

const createProfile = async (profile) => {
  const bio = {
    bio: {
      fullname: profile.fullname,
      birthdate: profile.birthdate,
    },
  };
  const doc = new UserModel(bio);
  const user = await doc.save();
  const userId = user.id;
  return userId;
};

const createReferal = async (userId, referId, companyId) => {
  // Нужен будеть чтобы узнать как распределить реферала в структуре. Пока делаем ток линейный.
  // const { treeType } = await CompanyModel.findById(companyId, 'treeType');

  // находим родителя в структуре
  const parentDoc = await TreeModel.findOne({ user: referId }, '_id referTree');
  // берем реферТрее от родителя, добавляем к нему айди родителя и получим рефер трии для регистрируемого реферала
  const childTree = [...parentDoc.referTree, parentDoc.id];

  // Добавим информацио о человеке в пользователе в компанию
  await CompanyModel.updateOne(
    { _id: companyId },
    { $push: { users: userId } },
  );

  // создаем реферала
  const childDoc = new TreeModel({
    referTree: childTree,
    user: userId,
    company: companyId,
  });
  // await childDoc.save();

  const childId = childDoc.id;
  return childId;
};

module.exports = {
  createTree,
  createCompany,
  createProfile,
  createReferal,
};

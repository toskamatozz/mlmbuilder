const express = require('express');
const controller = require('controllers/users');

const router = express.Router();

router.get('/', (req, res) => {
  res.render('index');
});

router.post('/register', async (req, res) => {
  const { createProfile } = controller;
  const referId = await createProfile(req.body);
  const { createCompany } = controller;
  const companyId = await createCompany(req.body.companyName, req.body.treeType);
  const { createTree } = controller;
  createTree(referId, companyId);
  res.send(`http://localhost:8000/${referId}/${companyId}`);
});

router.get('/:referId/:companyId', async (req, res) => {
  res.render('refer', { referId: req.params.referId, companyId: req.params.companyId });
});

router.post('/referal', async (req, res) => {
  const { createProfile } = controller;
  const userId = await createProfile(req.body);
  const { createReferal } = controller;
  await createReferal(userId, req.body.referId, req.body.companyId);
  res.send(`http://localhost:8000/${userId}/${req.body.companyId}`);
});


module.exports = router;

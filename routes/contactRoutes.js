const express = require('express');
const router = express.Router();
const cookieParser = require('cookie-parser');
const checkLogin = require('../middlewares/checkLogin');
const {
  getAllContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
  addContactForm,
} = require('../controllers/contactController');

router.use(cookieParser());

// 모든 연락처 가져오기, 새 연락처 추가하기기
router.route('/').get(checkLogin, getAllContacts);
router
  .route('/add')
  .get(checkLogin, addContactForm)
  .post(checkLogin, createContact);

// 연락처 상세보기, 수정하기, 삭제하기기
router
  .route('/:id')
  .get(checkLogin, getContact)
  .put(checkLogin, updateContact)
  .delete(checkLogin, deleteContact);

module.exports = router;

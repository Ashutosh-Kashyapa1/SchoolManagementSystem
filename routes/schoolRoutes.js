const express = require('express');
const router = express.Router();
const schoolController =require('../controllers/schoolController')

router.post('/addSchool',schoolController.addSchool);
router.get('/getSchoolList',schoolController.getSchoolList);


module.exports = router;



const express = require('express')
const router = express.Router()
const multer = require('multer')

const storage = multer.diskStorage({
  // setting the upload path
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  // renname the uploaded file and 
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({
  storage: storage
})

router.post('/upload', upload.single('file'), (req, res, next) => {
  // console.log('s')
  console.log(req.file)
  res.json({
    success: true
  })
})

module.exports = router

const multer = require('multer')

const path = require('path')

const directory = path.join(__dirname,'../../uploads')

// -> Multer Upload Storage
const storage = multer.diskStorage({

  destination: (req, file, cb) => {
  
      cb(null, directory)
  },
  filename: (req, file, cb) => {
      cb(null, file.originalname)
  }
});

//csv|xlsx

const upload = multer({

    storage: storage,
    
    fileFilter(req, file, cb) {
    
      cb(undefined, true)
    }
})

module.exports = upload
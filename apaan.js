const multer = require('multer');
const md5 = require('md5');
const path = require('path');

exports.uploadFile = (image, audio) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, '/uploads');
    },
    filename: (req, file, cb) => {
      const filename = md5(new Date()) + Math.floor(Math.random() * 1000) + path.extname(file.originalname);
      cb(null, filename);
    },
  });

  //Seleksi extension file
  const fileFilter = (req, file, cb) => {
    if (file.fieldName === audio) {
      if (!file.originalname.match(/\.(mp3|MP3|ogg|OGG|flac|FLAC)$/)) {
        req.fileValidationError = {
          message: 'Please select audio files only',
        };
        return cb(new Error('Please select audio files only'), false);
      }
    }
    if (file.fieldName === image) {
      if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|svg|SVG)$/)) {
        req.errorMessege = {
          message: 'Please select image files only',
        };
        return cb(new Error('Please select image files only'), false);
      }
    }
    cb(null, true);
  };

  //Upload Multer
  const upload = multer({
    storage,
    fileFilter,
    limits: {
      fileSize: 5242880, //(Mb) => 5 x 1024 x 1024
    },
  }).fields([
    { name: image, maxCount: 1 },
    { name: audio, maxCount: 1 },
  ]);

  return (req, res, next) => {
    // console.log(upload);
    upload(req, res, (error) => {
      if (req.errorMessege) {
        return res.status(400).send(req.fileValidationError);
      }
      if (!req.files && !error) {
        return res.status(400).send({ message: 'No file selected' });
      }

      if (error) {
        if (error.code === 'LIMIT_FILE_SIZE') {
          return res.status(400).send({ message: 'The file must be less than 5 Mb' });
        }
      }
      return next();
    });
  };
};

import multer from "multer";

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, "assets/CVs");
  },
  filename: (_req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname.split(" ").join("-"));
  },
});

export const upload = multer({ storage });

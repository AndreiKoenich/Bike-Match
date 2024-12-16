import multer from "multer";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log("entrou aqui");
        cb(null, "./src/uploads");
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
        cb(null, `${uniqueSuffix}-${file.originalname}`);
    },
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
        cb(null, true);
    } else {
        cb(new Error("Apenas upload de imagens permitido!"), false);
    }
};

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB por arquivo
    fileFilter,
}).array("images", 10);

export default upload;

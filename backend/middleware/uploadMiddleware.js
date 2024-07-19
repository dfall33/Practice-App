import multer from "multer";
import path from "path";

const __dirname = process.cwd();
console.log(`__dirname: ${__dirname}`)

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, path.join(__dirname, 'backend', 'uploads'));
    },
    filename(req, file, cb) {
        const dateTime = Date.now();
        cb(null, `${dateTime}-${file.originalname}`);
        req.url = `${dateTime}-${file.originalname}`.toString();
    }
})

export const upload = multer({ storage });
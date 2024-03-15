import express from "express"
import multer from "multer"
import moment from "moment"
import path from "path"
import { fileURLToPath } from "url"
import { modified_rc4_file, modified_rc4_text } from "../controllers/cipher.controller.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const router = express.Router()

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "..", "..", "..", "uploads"))
	},
	filename: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        cb(null, moment.now().toString() + ext)
	},
  });
  
const upload = multer({ storage: storage })

router.post("/rc4/:flavor/file", upload.single("file"), (req, res) => {
    // console.log(req)
    modified_rc4_file(req, res)
})

router.post("/rc4/:flavor/text", (req, res) => {
    // console.log(req)
    modified_rc4_text(req, res)
})
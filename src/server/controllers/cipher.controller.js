import { mod_rc4, extractExt } from "../services/mod-rc4.service.js"
import fs from "fs"
import { Buffer } from "node:buffer"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const modified_rc4_file = (req, res) => {
    try {
        let fileName = `${Date.now()}_${req.params.flavor}ed`
        const fileIn = fs.readFileSync(req.file.path)
        let in_, ext
        if (req.params.flavor === "encrypt") {
            ext = path.extname(req.file.path)
            const extBuf = Buffer.from(`${ext.length}` + ext)
            in_ = Buffer.concat([extBuf, fileIn])
        } else if (req.params.flavor === "decrypt") {
            in_ = fileIn
        }
        const result = mod_rc4(req.params.flavor, in_, Buffer.from(req.body.rc4_key), parseInt(req.body.m), parseInt(req.body.b), fileName)

        if (result) {
            if (req.query.out === "file") {
                if (req.params.flavor === "decrypt") {
                    ext = extractExt(result)
                    fileName += ext
                    console.log(ext)
                }
                const pathName = `${path.join(__dirname, "..", "..", "..", "downloads")}/${fileName}`
                fs.writeFileSync(pathName, result)
                res.attachment(pathName)
                res.status(200).sendFile(pathName)
            }
            else if (req.query.out === "text") {
                if (req.params.flavor === "decrypt") {
                    extractExt(result)
                }
                const result_ = result.toString("base64")
                res.status(200).send({
                    msg: result_ + " (base64)"
                })
            }
        }
    } catch (error) {
        res.status(500).send({
            msg: error.message
        })
    }
}

export const modified_rc4_text =(req, res) => {
    try {
        let fileName = `${Date.now()}_${req.params.flavor}ed`
        let in_;
        if (req.params.flavor === "encrypt") {
            in_ = Buffer.from(req.body.text)
        } else if (req.params.flavor === "decrypt") {
            in_ = Buffer.from(req.body.text, "base64")
        }

        const result = mod_rc4(req.params.flavor, in_, Buffer.from(req.body.rc4_key), req.body.m, req.body.b) 

        if (result) {
            if (req.query.out === "file") {
                const pathName = `${path.join(__dirname, "..", "..", "..", "downloads")}/${fileName}`
                fs.writeFileSync(pathName, result)
                res.attachment(pathName)
                res.status(200).sendFile(pathName)
            } else if (req.query.out === "text") {
                let result_
                if (req.params.flavor === "encrypt") {
                    result_ = result.toString("base64") + " (base64)"
                } else if (req.params.flavor === "decrypt") {
                    result_ = result.toString("utf-8")
                }
                res.status(200).send({
                    msg: result_
                })
            }
        }
    } catch (error) {
        res.status(500).send({
            msg: error.message
        })
    }
}
import fs from "fs"
import { Buffer } from "node:buffer"
// import { encrypt as affineEncrypt, decrypt as affineDecrypt } from "../utils/affine-cipher.util.js"

export const mod_rc4 = (mode, isFile, pathOrText, rc4_key) => {
    let S = []
    let K = Uint8Array.from(rc4_key)
    let FOut
    let i, j, count, t
    let in_, out_, u

    for (i = 0; i < 256; i++) {
        S.push(i)
    }

    j = 0
    for (i = 0; i < 256; i++) {
        j = (j + S[i] + K[i % K.length]) % 256;
        [S[i], S[j]] = [S[j], S[i]]
    }

    // console.log(S)
    
    if (isFile) {
        let FIn = fs.readFileSync(pathOrText)
        console.log(FIn)
        FOut = Buffer.alloc(FIn.length)
        count, j, i = 0
        for (let id = 0; id < FIn.length; id++) {
            in_ = FIn[id]
            count++
            i = (i + 1) % 256;
            j = (j + S[i]) % 256;
            [S[i], S[j]] = [S[j], S[i]]
            t = (S[i] + S[j]) % 256
            u = S[t]
            out_ = u ^ in_
            FOut[id] = out_
            // console.log(in_)
            // console.log(u)
        }
    }
    else {
        let text = Buffer.from(pathOrText)
        FOut = Buffer.alloc(text.length)
        count, j, i = 0
        for (let id = 0; id < text.length; id++) {
            in_ = text[id]
            count++
            i = (i + 1) % 256;
            j = (j + S[i]) % 256;
            [S[i], S[j]] = [S[j], S[i]]
            t = (S[i] + S[j]) % 256
            u = S[t]
            out_ = u ^ in_
            FOut[id] = out_
            // console.log(in_)
            // console.log(u)
        }
    }

    let FOutName = `${Date.now()}_${mode}ed`
    fs.writeFileSync(FOutName, FOut)

    console.log(FOut)

    return FOut.toString()
}

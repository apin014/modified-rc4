import { Buffer } from "node:buffer"
import { encrypt as affineEncrypt, decrypt as affineDecrypt, coprime256 } from "../utils/affine-cipher.util.js"

export const mod_rc4 = (mode, buf, rc4_key, m, b) => {
    if (!coprime256().includes(m)) {
        throw new Error("The selected key is not a coprime of 256!")
    }
    let S = []
    let K = affineEncrypt(rc4_key, m, b)
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
    FOut = Buffer.alloc(buf.length)
    count, j, i = 0

    if (mode === "encrypt") {
        for (let id = 0; id < buf.length; id++) {
            in_ = buf[id]
            count++
            i = (i + 1) % 256;
            j = (j + S[i]) % 256;
            [S[i], S[j]] = [S[j], S[i]]
            t = (S[i] + S[j]) % 256
            u = S[t]
            out_ = u ^ in_
            let out__ = [out_]
            FOut[id] = affineEncrypt(out__, m, b)[0]
        } 
    } else if (mode === "decrypt") {
        for (let id = 0; id < buf.length; id++) {
            let in__ = [buf[id]]
            in_ = affineDecrypt(in__, m, b)[0]
            count++
            i = (i + 1) % 256;
            j = (j + S[i]) % 256;
            [S[i], S[j]] = [S[j], S[i]]
            t = (S[i] + S[j]) % 256
            u = S[t]
            out_ = u ^ in_
            FOut[id] = out_
        }
    }

    return FOut
}
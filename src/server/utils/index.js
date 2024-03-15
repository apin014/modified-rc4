import { encrypt, coprime256, decrypt } from "./affine-cipher.util.js"
import { Buffer } from "node:buffer"

let msg = "Hello, my name is Udin!"
let msg_ = Uint8Array.from(Buffer.from(msg))
let m = 11
let b = 6

if (!coprime256().includes(m)) {
    console.error("The selected key is not a coprime of 256!")
} else {
    let encrypted = encrypt(msg_, m, b)
    console.log(Buffer.from(encrypted).toString())
    console.log(Buffer.from(decrypt(encrypted, m, b)).toString())
    // console.log(encrypted)
}
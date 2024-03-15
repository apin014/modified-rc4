import { mod_rc4 } from "./services/mod-rc4.service.js"
import { Buffer } from "node:buffer"
// import fs from "fs"

const plaintext = "Halo!!!! namaku Udin 123 [][]"
const key = "123abc"

const m = 11
const b = 6

let k = (Buffer.from(key))
let in_ = (Buffer.from(plaintext))

// let path = "./1710497243969_encrypted"
// let fileIn = fs.readFileSync(path)
// let in_ = Uint8Array.from(fileIn)

const ciphertext = mod_rc4("encrypt", in_, k, m, b)

const ciphertext_ = ciphertext.toString("base64")

let in_2 = Buffer.from(ciphertext_, "base64")

const re_plainText = mod_rc4("decrypt", in_2, k, m, b)

console.log(ciphertext_)

// console.log(fileIn)
// console.log(ciphertext)
console.log(re_plainText.toString("utf-8"))

// let t = "hello world!"
// let t_ = Buffer.from(t).toString("base64")
// let _t = atob(t_)

// console.log(_t)
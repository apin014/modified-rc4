import { mod_rc4 } from "./services/mod-rc4.service.js";

// const plaintext = "Halo namaku Udin"
const key = "123abc"

const path = "./1710426744031_encrypted"

const ciphertext = mod_rc4("decrypt", true, path, key)

console.log(ciphertext)
export const gcd = (a, b) => {
    if (b === 0) {
        return a
    } else {
        return gcd(b, a % b)
    }
}

const modularInverse = (a, n) => {
    let n0 = n
    let y = 0
    let x = 1
 
    if (n == 1)
        return 0
 
    while (a > 1)
    {
        let q = Math.floor(a / n)
        let t = n
 
        n = a % n
        a = t
        t = y
 
        y = x - q * y
        x = t
    }
 
    if (x < 0)
        x += n0
 
    return x
}

export const coprime256 = () => {
    let coprimes = []
    for (let i = 0; i <= 256; i++) {
        if (gcd(i, 256) === 1) {
            coprimes.push(i)
        }
    }
    return coprimes
}

export const encrypt = (in_, m, b) => {
    let out_ = []
    for (let i = 0; i < in_.length; i++) {
        let p = in_[i]
        let encrypted = ((m * p) + b) % 256
        out_.push(encrypted)
    }
    return out_
}

export const decrypt = (in_, m, b) => {
    let out_ = []
    let inverse_m = modularInverse(m, 256)
    for (let i = 0; i < in_.length; i++) {
        let c = in_[i]
        let decrypted = (inverse_m * (c - b + 256) % 256)
        out_.push(decrypted) 
    }
    return out_
}
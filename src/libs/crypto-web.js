/* eslint-disable no-undef */
import crypto from 'crypto-js'

const key = crypto.enc.Hex.parse(crypto_key) // 将字符串解析为十六进制数作为密钥
const iv = crypto.enc.Hex.parse(crypto_key) // 将字符串解析为十六进制数作为 IV

class Cryptos {
  encode(data) {
    const encrypted = crypto.AES.encrypt(data, key, {
      iv,
      mode: crypto.mode.CBC,
      padding: crypto.pad.Pkcs7
    })
    return encrypted.toString()
  }
  decode(encrypted) {
    const decrypted = crypto.AES.decrypt(encrypted, key, {
      iv,
      mode: crypto.mode.CBC,
      padding: crypto.pad.Pkcs7
    })
    return decrypted.toString(crypto.enc.Utf8)
  }
}

export default new Cryptos()

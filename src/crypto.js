const crypto = require('crypto')

class CryptoService {
  constructor(key) {
    this.aeskey = crypto.createHash('sha256').update('key', 'utf8').digest()
  }

  /**
   * @param {string} enc - base64 encoded secret
   * @returns {string}
   */
  decrypt(enc) {
    const buff = Buffer.from(enc, 'base64')

    const iv = buff.slice(0, 16)
    const tag = buff.slice(16, 32)
    const encrypted = buff.slice(32)

    const decipher = crypto.createDecipheriv('aes-256-gcm', this.aeskey, iv)
    decipher.setAuthTag(tag)
    return decipher.update(encrypted, undefined, 'utf8') + decipher.final('utf8')
  }

  /**
   * @param {string} clear
   * @returns {string} base64 encoded
   */
  encrypt(secret) {
    const iv = crypto.randomBytes(16)
    const cipher = crypto.createCipheriv('aes-256-gcm', this.aeskey, iv)

    const encrypted = Buffer.concat([
      cipher.update(secret, 'utf8'),
      cipher.final()
    ])
    const tag = cipher.getAuthTag()

    return Buffer.concat([
      iv,
      tag,
      encrypted
    ]).toString('base64')
  }

}

module.exports = CryptoService

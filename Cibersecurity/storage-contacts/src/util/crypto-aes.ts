import { randomBytes, createCipheriv, createDecipheriv } from 'crypto';

const ALGORITHM = process.env.ALGORITHM ?? 'aes-256-cbc';
const KEY = randomBytes(32); // 32 bytes = 256 bits
const IV = randomBytes(16); // 16 bytes = 128 bits

export class CryptoAES {
  encrypt(text: string) {
    const cipher = createCipheriv(ALGORITHM, KEY, IV);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return {
      iv: IV.toString('hex'),
      encryptedData: encrypted,
    };
  }

  // Função para descriptografar
  decrypt(encryptedData: string, ivHex: string) {
    const decipher = createDecipheriv(
      ALGORITHM,
      KEY,
      Buffer.from(ivHex, 'hex'),
    );
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
}

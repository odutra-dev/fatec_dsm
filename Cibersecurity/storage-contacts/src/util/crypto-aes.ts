import {
  randomBytes,
  createDecipheriv,
  createHash,
  createCipheriv,
} from 'crypto';

const ALGORITHM = 'aes-256-cbc';
const KEY = createHash('sha256').update(String(process.env.AES_KEY)).digest(); // deve ter 32 bytes

export class CryptoAES {
  encrypt(text: string): string {
    const IV = randomBytes(16); // 16 bytes = 128 bits
    const cipher = createCipheriv(ALGORITHM, KEY, IV);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return `${IV.toString('hex')}:${encrypted}`;
  }

  // Função para descriptografar
  decrypt(payload: string): string {
    const [ivHex, encryptedData] = payload.split(':');
    const iv = Buffer.from(ivHex, 'hex');
    const decipher = createDecipheriv(ALGORITHM, KEY, iv);
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
}

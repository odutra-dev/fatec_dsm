import { Injectable } from '@nestjs/common';
import {
  randomBytes,
  createDecipheriv,
  createHash,
  createCipheriv,
} from 'crypto';

const ALGORITHM = 'aes-256-cbc'; // Escolhe o algoritmo de criptografia
const KEY = createHash('sha256').update(String(process.env.AES_KEY)).digest(); // Cria uma chave para criptografia com base na chave fornecida, que será usada para criptografar e descriptografar os dados. Com 32 bytes, 256 bits

@Injectable()
// Classe para criptografia dos dados
export class CryptoAES {
  // Função para criptografar os dados
  encrypt(text: string): string {
    const IV = randomBytes(16); // Gera um vetor de inicialização (IV) aleatório com 16 bytes
    const cipher = createCipheriv(ALGORITHM, KEY, IV); // Cria um cipher (Cipher é uma interface para criptografia) com o algoritmo, a chave e o IV
    let encrypted = cipher.update(text, 'utf8', 'hex'); // Criptografa o texto, onde utf8 indica o formato de entrada e hex indica o formato de saída
    encrypted += cipher.final('hex'); // Finaliza a criptografia adicionando o texto criptografado com o formato hex
    return `${IV.toString('hex')}:${encrypted}`; // Retorna o IV e o texto criptografado
  }

  // Função para descriptografar os dados
  decrypt(payload: string): string {
    const [ivHex, encryptedData] = payload.split(':'); // Divide o payload em IV e dados
    const iv = Buffer.from(ivHex, 'hex'); // Converte o IV para um buffer
    const decipher = createDecipheriv(ALGORITHM, KEY, iv); // Cria um decipher (Decipher é uma interface para descriptografia) com o algoritmo, a chave e o IV
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8'); // Descriptografa os dados, onde hex indica o formato de entrada e utf8 indica o formato de saída
    decrypted += decipher.final('utf8'); // Finaliza a descriptografia
    return decrypted; // Retorna o texto descriptografado
  }
}

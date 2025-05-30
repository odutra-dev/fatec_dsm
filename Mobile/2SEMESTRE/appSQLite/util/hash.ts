import * as Crypto from "expo-crypto";

export const hashPassword = async (password: string): Promise<string> => {
  return await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    password
  );
};

export const verifyPassword = async (
  password: string,
  storedHash: string
): Promise<boolean> => {
  const hashToCompare = await hashPassword(password);
  return hashToCompare === storedHash;
};

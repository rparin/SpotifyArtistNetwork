type EncryptedPayload = {
  encryptedData: string;
  initVector: string;
};

type EncryptedPromise = Promise<EncryptedPayload>;

export type { EncryptedPayload, EncryptedPromise };

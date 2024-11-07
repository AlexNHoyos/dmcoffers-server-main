const cryptoLib = require('crypto');
import { encryptionKey, iv } from "../../shared/Utils/Keys.js";

export class AuthCryptography {

    public encrypt(text: string) {
        const cipher = cryptoLib.createCipheriv('aes-256-cbc', encryptionKey, iv);
        let encrypted = cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        return encrypted;
    }

    public decrypt(encryptedText: any) {
        const decipher = cryptoLib.createDecipheriv('aes-256-cbc', encryptionKey, iv);
        let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
        decrypted = decipher.final('utf8');
        return decrypted;
    }
}

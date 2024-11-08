import * as functions from 'firebase-functions';

// Load IntaSend API keys from Firebase environment configuration
export const intasendConfig = {
  publicKey: functions.config().intasend.public_key,  // Your IntaSend public key
  privateKey: functions.config().intasend.private_key, // Your IntaSend private key
  baseURL: 'https://payment.intasend.com/api/v1/checkout/', // IntaSend API base URL for live environment
};

// Validate that required config variables are set
if (!intasendConfig.publicKey || !intasendConfig.privateKey) {
  console.error("IntaSend public and private keys must be set in Firebase environment variables.");
  throw new Error("Missing IntaSend API keys in environment configuration.");
}

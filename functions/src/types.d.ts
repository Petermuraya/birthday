// functions/src/types.d.ts

// Define the shape of the data received by the payment initiation function
export interface PaymentData {
    amount: number;
    phoneNumber: string;
  }
  
  // Define the shape of the environment variables used in the project
  export interface Config {
    intasendPublicKey: string;
    intasendPrivateKey: string;
  }
  
  // Define the expected response from IntaSend API
  export interface IntaSendResponse {
    success: boolean;
    message: string;
    transaction_id?: string; // Optional, depending on the response from IntaSend
    redirect_url?: string;    // URL to redirect the user if payment requires further action
  }
  
  // Extend the Firebase Functions environment to include IntaSend config
  declare namespace NodeJS {
    interface ProcessEnv {
      INTA_SEND_PUBLIC_KEY: string;
      INTA_SEND_PRIVATE_KEY: string;
    }
  }
  
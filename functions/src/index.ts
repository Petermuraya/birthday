import { onCall } from "firebase-functions/v2/https";
import * as functions from "firebase-functions";
import * as logger from "firebase-functions/logger";
import axios from "axios";
import { CallableRequest } from "firebase-functions/v2/https";

// Load IntaSend keys from Firebase environment configuration
const intasendPrivateKey = functions.config().intasend.private_key;

// Function to initiate IntaSend payment
export const initiateIntaSendPayment = onCall(async (request: CallableRequest) => {
  const data = request.data;

  try {
    // Construct the payment request payload
    const paymentData = {
      amount: data.amount,
      currency: "KES", // assuming Kenyan Shilling; adjust as necessary
      payment_method: "M-PESA",
      phone_number: data.phoneNumber,
      email: data.email,
      reference: data.reference,
      metadata: data.metadata,
    };

    // Make the request to IntaSend API
    const response = await axios.post(
      "https://sandbox.intasend.com/api/v1/payment", // Use sandbox URL for testing
      paymentData,
      {
        headers: {
          Authorization: `Bearer ${intasendPrivateKey}`,
          "Content-Type": "application/json",
        },
      }
    );

    // Return success response with payment information
    return { success: true, data: response.data };
  } catch (error) {
    // Log the error and return a structured response
    logger.error("Payment initiation failed", error);
    const err = error as Error; // Cast error to Error type
    return { success: false, error: err.message };
  }
});

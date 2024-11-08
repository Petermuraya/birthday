import * as functions from 'firebase-functions';
import axios, { AxiosResponse } from 'axios';

const intasendBaseURL = 'https://sandbox.intasend.com/api/v1/checkout/';
const intasendPublicKey = functions.config().intasend.public_key;
const intasendPrivateKey = functions.config().intasend.private_key;

interface IntaSendRequestData {
  amount: number;
  phoneNumber: string;
}

interface IntaSendResponse {
  status: string;
  message: string;
  transaction_id?: string;
}

export const initiateIntaSendPayment = functions.https.onCall(
  async (request: functions.https.CallableRequest<IntaSendRequestData>): Promise<IntaSendResponse> => {
    const { amount, phoneNumber } = request.data;

    if (!amount || !phoneNumber) {
      throw new functions.https.HttpsError('invalid-argument', 'Amount and phone number are required');
    }

    try {
      const response: AxiosResponse<IntaSendResponse> = await axios.post(
        `${intasendBaseURL}stk-push/`,
        {
          amount,
          phone_number: phoneNumber,
          currency: 'KES',
          api_key: intasendPublicKey,
        },
        {
          headers: {
            Authorization: `Bearer ${intasendPrivateKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return response.data;
    } catch (error) {
      console.error('IntaSend payment initiation failed:', error);
      throw new functions.https.HttpsError('internal', 'Failed to initiate payment with IntaSend.');
    }
  }
);

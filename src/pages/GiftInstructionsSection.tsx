import React, { useState } from 'react';
import { FaGift, FaCheckCircle } from 'react-icons/fa';

const GiftInstructionsSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [giftSent, setGiftSent] = useState(false);
  const [loading, setLoading] = useState(false);

  // Map each gift amount to its corresponding payment link
  const giftLinks: { [key: number]: string } = {
    10: 'https://payment.intasend.com/pay/6c98b103-7982-4157-8893-24a1aee23ef5/',
    20: 'https://payment.intasend.com/pay/0cb96d4e-4cd3-4108-bf3d-993502151e0e/',
    50: 'https://payment.intasend.com/pay/1e18a5c7-21da-4876-ae21-a6293a9f1fd8/',
    100: 'https://payment.intasend.com/pay/9a08aec7-a59b-4b87-972d-5a8911ea8142/',
    200: 'https://payment.intasend.com/pay/7565f265-647b-4e18-8ddf-3147eaf878c8/',
    500: 'https://payment.intasend.com/pay/93b367db-9695-4352-8468-584f10c0aa68/',
    1000: 'https://payment.intasend.com/pay/20f8d627-d1ec-463d-b509-c10bfe0fa46e/',
    10000: 'https://payment.intasend.com/pay/2eaaf8fc-eb78-4b24-b2d0-a06d803316c3/',
  };

  const handleGiftClick = async (amount: number) => {
    const link = giftLinks[amount];
    if (link) {
      setLoading(true);
      window.open(link, '_blank');
      setGiftSent(true);
      setIsModalOpen(true);
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setGiftSent(false);
  };

  return (
    <section className="p-8 bg-gradient-to-b from-white to-gray-50 rounded-2xl shadow-xl text-center">
      <div className="flex justify-center items-center mb-6">
        <FaGift className="text-yellow-500 text-6xl animate-bounce" />
        <h2 className="ml-3 text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-300">
          Send a Gift
        </h2>
      </div>

      <p className="text-lg text-gray-700 mb-6">Select a gift amount to proceed with payment:</p>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 my-6">
        {Object.keys(giftLinks).map((amount) => (
          <button
            key={amount}
            className={`p-5 text-lg font-semibold rounded-lg transition-all duration-300 
              ${giftSent || loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-yellow-500 text-white hover:bg-yellow-600 focus:outline-none focus:ring-4 focus:ring-yellow-300 active:scale-95'}`}
            onClick={() => handleGiftClick(Number(amount))}
            disabled={giftSent || loading}
            aria-label={`Send KSh ${amount}`}
            style={{
              transform: giftSent && !loading ? 'scale(1.05)' : 'scale(1)', // Feedback when gift sent
            }}
          >
            {loading ? (
              <div className="animate-spin h-5 w-5 border-t-2 border-white border-solid rounded-full mx-auto"></div>
            ) : (
              `KSh ${amount}`
            )}
          </button>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center transition-opacity duration-300 opacity-100">
          <div className="bg-white p-8 rounded-lg shadow-xl transform transition-all scale-100 opacity-100 animate__animated animate__fadeIn animate__faster">
            <div className="flex items-center justify-center mb-4">
              <FaCheckCircle className="text-yellow-500 text-5xl animate-pulse" />
            </div>
            <h3 className="text-xl font-semibold text-yellow-600">Gift Successfully Sent!</h3>
            <p className="text-gray-700 mt-4">A confirmation will be sent shortly.</p>
            <button
              className="mt-6 px-6 py-2 bg-yellow-600 text-white rounded-full hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300"
              onClick={handleCloseModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default GiftInstructionsSection;

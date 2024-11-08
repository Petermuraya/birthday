import React, { useState, useEffect } from 'react';
import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';
import HeaderSection from './HeaderSection';
import GiftInstructionsSection from './GiftInstructionsSection';
import BirthdayBoxSection from './BirthdayBoxSection';
import BirthdayWishesSection from './BirthdayWishesSection';
import './Home.css';
import confetti from 'canvas-confetti';

const Home: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [showBox, setShowBox] = useState<boolean>(false);
  const [boxMessage, setBoxMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleMessageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      setLoading(true);
      try {
        const messagesCollection = collection(db, 'birthdayMessages');
        await addDoc(messagesCollection, {
          message,
          timestamp: new Date(),
        });
        alert(`Thank you for your message: "${message}"! 🎉`);
        setMessage('');
        setError(null);
        triggerConfetti(); // Trigger confetti on successful submission
      } catch (e: any) {
        console.error("Error adding document: ", e);
        setError("Error adding message. Please try again!");
      } finally {
        setLoading(false);
      }
    } else {
      alert("Please write a message first!");
    }
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 60,
      origin: { y: 0.6 }
    });
  };

  // Optional: trigger confetti on initial page load if desired
  useEffect(() => {
    triggerConfetti();
  }, []);

  return (
    <div className="home-container animate-gradientBackground flex flex-col items-center p-4 md:p-8 lg:p-12 relative overflow-hidden">
      <HeaderSection />
      <GiftInstructionsSection />
      <BirthdayBoxSection 
        showBox={showBox} 
        setShowBox={setShowBox} 
        setBoxMessage={setBoxMessage} 
        boxMessage={boxMessage} 
      />
      <BirthdayWishesSection 
        message={message} 
        setMessage={setMessage} 
        handleMessageSubmit={handleMessageSubmit} 
      />
      
      <div className="mt-6 w-full max-w-md md:max-w-lg p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">Send Your Birthday Wishes 🎉</h2>
        <form onSubmit={handleMessageSubmit} className="flex flex-col space-y-4">
          <textarea
            className="w-full p-4 rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
            rows={4}
            placeholder="Write your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            aria-label="Birthday Message"
          />
          <button
            type="submit"
            className={`w-full py-2 px-4 bg-purple-500 text-white rounded-md font-semibold shadow-lg hover:bg-purple-600 transition duration-200 ${loading ? 'cursor-wait' : ''}`}
            disabled={loading}
          >
            {loading ? 'Submitting...' : 'Send Message'}
          </button>
        </form>
        {loading && (
          <div className="mt-4 text-center text-lg text-gray-700 animate-pulse">
            Submitting your message...
          </div>
        )}
        {error && (
          <div className="mt-4 text-center text-lg text-red-600 animate-bounce" role="alert">
            {error}
          </div>
        )}
      </div>
      
      {/* Balloon Elements */}
      <div className="balloon balloon-1"></div>
      <div className="balloon balloon-2"></div>
      <div className="balloon balloon-3"></div>
      <div className="balloon balloon-4"></div>
    </div>
  );
};

export default Home;

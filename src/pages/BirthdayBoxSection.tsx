import React, { useState } from 'react';
import Confetti from 'react-confetti';
import { motion } from 'framer-motion';

interface BirthdayBoxProps {
  showBox: boolean;
  setShowBox: React.Dispatch<React.SetStateAction<boolean>>;
  setBoxMessage: React.Dispatch<React.SetStateAction<string>>;
  boxMessage: string;
}

const BirthdayBoxSection: React.FC<BirthdayBoxProps> = ({
  showBox,
  setShowBox,
  setBoxMessage,
  boxMessage,
}) => {
  const [isConfetti, setIsConfetti] = useState(false);
  const [timer, setTimer] = useState(3);
  const [boxOpen, setBoxOpen] = useState(false);

  const handleBoxClick = () => {
    let countdown = 3;
    setTimer(countdown);
    const countdownInterval = setInterval(() => {
      countdown--;
      setTimer(countdown);
      if (countdown === 0) {
        clearInterval(countdownInterval);
        setShowBox(true);
        setBoxOpen(true);
        setIsConfetti(true);
        setTimeout(() => {
          const messages = [
            "Better luck next time! 🎉",
            "No gift, but here’s a big hug! 🤗",
            "Congratulations! You got a message: 'You are awesome!' 🎁",
            "A surprise! You've won 50 points! 🏆",
            "Congratulations! You've won a golden gift! ✨",
          ];
          setBoxMessage(messages[Math.floor(Math.random() * messages.length)]);
        }, 500);
      }
    }, 1000);
  };

  return (
    <section className="bg-gradient-to-b from-white to-yellow-100 p-8 rounded-xl shadow-2xl mb-10 w-full max-w-md text-center transition-all duration-700 ease-in-out transform hover:scale-105 lg:max-w-lg mx-auto">
      <motion.h2 
        className="text-4xl md:text-5xl font-bold text-yellow-600 mb-8 animate__animated animate__fadeIn"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Try Your Luck 🎁
      </motion.h2>
      
      <motion.button
        className="px-8 py-3 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-white rounded-full font-semibold shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95 transition-transform duration-300 focus:outline-none focus:ring-4 focus:ring-yellow-300"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleBoxClick}
        disabled={boxOpen}
      >
        {boxOpen ? 'Already Opened!' : 'Open a Gift Box'}
      </motion.button>

      <div className="mt-6 text-lg md:text-2xl font-semibold text-gray-800 transition-all">
        {timer > 0 ? (
          <motion.p 
            className="text-yellow-500 animate-bounce"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Box opens in: {timer}...
          </motion.p>
        ) : (
          <motion.p 
            className="text-green-500 animate-pulse"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Box is open! 🎉
          </motion.p>
        )}
      </div>

      {showBox && (
        <motion.div
          className="mt-6 p-6 bg-gray-100 rounded-lg shadow-md text-center opacity-0 transition-opacity duration-500 animate__animated animate__fadeIn"
          animate={{ opacity: 1, scale: boxOpen ? 1 : 0.8 }}
          transition={{ duration: 1 }}
        >
          <p className="text-lg md:text-xl font-semibold text-gray-800">{boxMessage}</p>
        </motion.div>
      )}

      {isConfetti && <Confetti recycle={false} numberOfPieces={300} />}

      <motion.div
        className={`gift-box mt-10 p-6 ${
          boxOpen ? 'bg-yellow-300' : 'bg-yellow-200'
        } rounded-lg shadow-xl cursor-pointer hover:bg-yellow-400 transition-all duration-500 ease-in-out transform ${
          boxOpen ? 'scale-105' : 'scale-100'
        }`}
        onClick={() => !boxOpen && handleBoxClick()}
        initial={{ scale: 0.8 }}
        animate={{ scale: boxOpen ? 1.15 : 1 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-center text-5xl lg:text-6xl">🎁</p>
        <motion.p
          className="text-center text-gray-800 font-semibold mt-2 text-xl lg:text-2xl"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          {boxOpen ? 'Surprise Revealed!' : 'Click to Open'}
        </motion.p>
      </motion.div>
    </section>
  );
};

export default BirthdayBoxSection;

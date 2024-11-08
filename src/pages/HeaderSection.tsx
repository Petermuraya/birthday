import React from 'react';
import ReactTypingEffect from 'react-typing-effect';

const HeaderSection: React.FC = () => {
  return (
    <header className="text-center mb-10 px-4 py-20">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 mb-3 animate-bounce drop-shadow-xl">
        Happy Birthday, Julian Ndungu! <span className="animate-spin inline-block">🎉</span>
      </h1>
      
      <p className="text-lg sm:text-xl text-gray-700">
        <ReactTypingEffect
          text={["Celebrate my son Julian special day with a gift or message!"]}
          speed={50}
          eraseSpeed={30}
          typingDelay={500}
        />
      </p>
    </header>
  );
};

export default HeaderSection;

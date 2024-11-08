import React, { useEffect } from 'react';

// Define keyframes for float animation with more subtle floating motion
const floatAnimation = `
@keyframes float {
  0% { 
    transform: translateY(0) translateX(0); 
    opacity: 1;
  }
  50% { 
    transform: translateY(-30px) translateX(-10px); 
    opacity: 0.8; 
  }
  100% { 
    transform: translateY(0) translateX(10px); 
    opacity: 1; 
  }
}
`;

// Add the animation to the document
const addGlobalStyles = () => {
  const styleElement = document.createElement("style");
  styleElement.textContent = floatAnimation;
  document.head.appendChild(styleElement);
};

const Balloon: React.FC = () => {
  useEffect(() => {
    addGlobalStyles();
  }, []);

  // Randomly assign color, size, position, and animation delay
  const colors = ['bg-red-300', 'bg-yellow-300', 'bg-blue-300', 'bg-pink-300', 'bg-green-300', 'bg-purple-300'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  const randomSize = `${Math.random() * 3 + 2}rem`; // Random size between 2rem and 5rem
  const randomLeft = `${Math.random() * 90}%`; // Random left position (within 90% for some padding)
  const randomDelay = `${Math.random() * 5}s`; // Random animation delay for staggered effect
  const randomRotation = `${Math.random() * 15 - 7.5}deg`; // Slight random rotation for added realism

  return (
    <div
      className={`absolute ${randomColor} rounded-full opacity-80 shadow-lg`}
      style={{
        width: randomSize,
        height: randomSize,
        left: randomLeft,
        bottom: '-10%', // Start slightly off-screen
        transform: `rotate(${randomRotation})`, // Random rotation to make it more dynamic
        animation: `float ${Math.random() * 20 + 15}s ease-in-out infinite`, // Random speed between 15-35s
        animationDelay: randomDelay,
      }}
    />
  );
};

export default Balloon;

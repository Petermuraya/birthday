// src/react-typing-effect.d.ts

declare module 'react-typing-effect' {
    interface TypingEffectProps {
      text: string | string[];
      speed: number;
      eraseSpeed: number;
      typingDelay: number;
    }
  
    const ReactTypingEffect: React.FC<TypingEffectProps>;
  
    export default ReactTypingEffect;
  }
  
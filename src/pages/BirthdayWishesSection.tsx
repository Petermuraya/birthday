import React, { useState, useEffect } from 'react';

interface BirthdayWishesProps {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  handleMessageSubmit: (e: React.FormEvent) => void;
}

const BirthdayWishesSection: React.FC<BirthdayWishesProps> = ({
  message,
  setMessage,
  handleMessageSubmit
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [charCount, setCharCount] = useState(0);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const maxChars = 300; // Maximum number of characters allowed

  useEffect(() => {
    // Focus the textarea when the component loads
    const textarea = document.getElementById('birthday-message') as HTMLTextAreaElement;
    if (textarea) {
      textarea.focus();
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim()) {
      setError('Message cannot be empty.');
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    // Simulate a form submission
    setTimeout(() => {
      setLoading(false);
      setSuccess('Your birthday message has been submitted successfully!');
      setMessage('');
      setCharCount(0);
    }, 1500);
  };

  const handleThemeSwitch = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <section
      className={`p-6 rounded-xl shadow-xl w-full max-w-xl mx-auto mt-10 transition-colors ${theme === 'light' ? 'bg-white text-gray-800' : 'bg-gray-800 text-white'}`}
    >
      <h2 className="text-3xl font-extrabold text-blue-600 mb-5 text-center">
        Leave a Birthday Message ✍️
      </h2>
      
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {success && <p className="text-green-500 text-center mb-4" role="alert">{success}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <textarea
          id="birthday-message"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
            setCharCount(e.target.value.length);
          }}
          placeholder="Write your birthday wish for Julian!"
          className="w-full p-4 border-2 border-gray-300 rounded-lg text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none transition-all duration-200"
          rows={6}
          maxLength={maxChars}
          aria-label="Write your birthday wish for Julian"
        />
        
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">{charCount}/{maxChars} characters</span>
          <button
            type="button"
            onClick={handleThemeSwitch}
            className="text-sm text-blue-500 hover:underline"
            aria-label="Toggle Theme"
          >
            Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`px-6 py-3 ${
            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500'
          } text-white rounded-lg font-semibold hover:bg-blue-600 focus:ring-4 focus:ring-blue-200 transition duration-300 ease-in-out transform hover:scale-105`}
          aria-label="Submit your birthday message"
        >
          {loading ? 'Submitting...' : 'Submit Message'}
        </button>
      </form>
    </section>
  );
};

export default BirthdayWishesSection;

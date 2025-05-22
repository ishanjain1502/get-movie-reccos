'use client';

import { useState } from 'react';
import Answers from './Answers';

const Questionnaire = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showAnswers, setShowAnswers] = useState(false);
  const [answers, setAnswers] = useState({
    type: '',
    mood: '',
    era: ''
  });

  const questions = [
    {
      id: 'type',
      question: 'Picture dekhoge ya TV show?',
      options: ['Chalega', 'Nahi', 'Ab de do kuch bhi...']
    },
    {
      id: 'mood',
      question: 'Kaisa mood hai?',
      options: ['Zindagi ki seekh de do', 'Prerit kar do', 'Hasa do', 'Dara do', 'Ab de do kuch bhi...']
    },
    {
      id: 'era',
      question: 'Naya? Purana?',
      options: ['Naya', 'Purana', 'Ab de do kuch bhi...']
    }
  ];

  const handleAnswer = (answer) => {
    setAnswers(prev => ({
      ...prev,
      [questions[currentQuestion].id]: answer
    }));

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setShowAnswers(true);
    }
  };

  if (showAnswers) {
    return <Answers answers={answers} />;
  }

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-2xl shadow-xl border border-indigo-100">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium text-indigo-600">
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <div className="w-24 h-2 bg-indigo-100 rounded-full">
            <div 
              className="h-full bg-indigo-600 rounded-full transition-all duration-300"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>
        <h2 className="text-2xl font-bold text-center text-indigo-900">
          {questions[currentQuestion].question}
        </h2>
      </div>
      <div className="space-y-4">
        {questions[currentQuestion].options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(option)}
            className="w-full p-4 text-left bg-indigo-50 hover:bg-indigo-100 text-indigo-900 rounded-xl transition-all duration-200 border border-indigo-100 hover:border-indigo-200 hover:scale-[1.02] active:scale-[0.98]"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Questionnaire; 
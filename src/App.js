import React, { useState} from 'react';
import FlashcardList from './FlashcardList';
import './app.css';
import axios from axios;

function App() {
  const [flashcards, setFlashcards] = useState(SAMPLE_FLASHCARDS)
  return (
    <FlashcardList flashcards={flashcards}/>
  );
}

const SAMPLE_FLASHCARDS = [
  {
    id: 1,
    question: 'What is 2 + 2?',
    answer: '4',
    options: [
      '2',
      '3',
      '4',
      '5'
    ]
  },
  {
    id: 2,
    question: 'Question 2',
    answer: 'Answer 2',
    options: [
      'Answer 2',
      'Answer 3',
      'Answer 4',
      'Answer 5'
    ]
  },
  
]
export default App;

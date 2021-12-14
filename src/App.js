import React, { useState, useEffect} from 'react';
import FlashcardList from './FlashcardList';
import './app.css';
import axios from 'axios';

function App() {
  const [flashcards, setFlashcards] = useState(SAMPLE_FLASHCARDS)
  useEffect(() => {
    axios.get('https://opentdb.com/api.php?amount=10&category=22&difficulty=easy&type=multiple')
    .then(response => {
      setFlashcards(response.data.results.map((questionItem, index) => {
        const answer = decodeText(questionItem.correct_answer);
        const options = [...questionItem.incorrect_answers.map(item => decodeText(item)), answer];
        return {
          id: `${index}-${Date.now()}`,
          question: decodeText(questionItem.question),
          answer,
          options: options.sort(() => Math.random() - .5)
        }
      }));
      console.log(response.data)
    })
  }, [])

  function decodeText(str) {
    const text = document.createElement('textarea')
    text.innerHTML = str
    return text.value
  }
  return (
    <div className='container'>
    <FlashcardList flashcards={flashcards}/>
    </div>
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

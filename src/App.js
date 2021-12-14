import React, { useState, useEffect, useRef} from 'react';
import FlashcardList from './FlashcardList';
import './app.css';
import axios from 'axios';

function App() {
  const [flashcards, setFlashcards] = useState([])
  const [categories, setCategories] = useState([])

  const categoryElement = useRef()
  const amountElement = useRef()

useEffect(() => {
  axios.get('https://opentdb.com/api_category.php')
  .then(response => {
    setCategories(response.data.trivia_categories)
  })
  
}, [])

  function decodeText(str) {
    const text = document.createElement('textarea')
    text.innerHTML = str
    return text.value
  }

  function handleSubmit(event){
    event.preventDefault()
    axios.get('https://opentdb.com/api.php?',{
      params: {
        amount: amountElement.current.value,
        category: categoryElement.current.value,
      }
    })
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
      }))
    })
  }

  return (
    <>
    <form className='header' onSubmit={handleSubmit}>
    <div className='form-group'>
      <label htmlFor='category'>Category</label>
      <select id='category' ref={categoryElement}>
        {categories.map(category => {
          return <option value={category.id} key={category.id}>{category.name}</option>
        })}
      </select>
    </div>
    <div className='form-group'>
      <label htmlFor='amount'>Number of Questions</label>
      <input type='number' id='amount' min='1' step='1' defaultValue={10} ref={amountElement} />
    </div>
    <div className='form-group'>
        <button className='button'>Generate</button>
    </div>
    </form>
    <div className='container'>
    <FlashcardList flashcards={flashcards}/>
    </div>
    </>
  );
}

export default App;

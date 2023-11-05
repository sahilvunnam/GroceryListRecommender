import React, { useState } from 'react';
import './App.css';

function App() {
  const [Weight, setWeight] = useState({Weight: ''});
  const [Height, setHeight] = useState({Height: ''});
  const [Gender, setGender] = useState('Choose One');
  const [Diet, setDiet] = useState('Choose One');
  const [Budget, setBudget] = useState('20');

  const [recommendations, setRecommendations] = useState('');
  const [hasClickedRecommend, setHasClickedRecommend] = useState(false);

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:3001/get-recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        // You can send movie data to your backend if needed
        // body: JSON.stringify({ movies: movies })
        body: JSON.stringify(
          {Weight: Weight},
          {Height: Height},
          {Gender: Gender},
          {Diet: Diet},
          {Budget: Budget}
        )
      });

      if (response.ok) {
        const data = await response.json();
        setRecommendations(data.recommendations);
        setHasClickedRecommend(true);
      } else {
        console.error('Failed to retrieve recommendations');
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <p class="Title">Grocery List Builder!</p>
        <form onSubmit={e => e.preventDefault()}>
            <div>
              <p class="Weight-Title">Weight</p>
              <input
                class = "weight"
                type="text"
                placeholder= 'Weight' 
                // value= {Weight}
                onChange={e => setWeight(e.target.value)}
              >
              </input>
              
            <div>
                
              </div>
              <p>Height</p>
                <input
                class = "height"
                type="text" 
                placeholder= 'Height'
                // value= {Height}
                onChange={e => setHeight(e.target.value)}
                >  
                </input>

              <div>
                <p>Gender</p>
                <input class="gender" type="text" placeholder='Gender' onChange={e => setGender(e.target.value)}>  
                </input> 
                
              </div>
                <p>Diet Type</p>
                <input class="diet" type="text" placeholder='Diet' onChange={e => setDiet(e.target.value)}>  
                </input> 
              <div>
                <p>Budget</p>
                <input class="budget" type="text" placeholder='Budget' onChange={e => setBudget(e.target.value)}>  
                </input> 
              </div>

              <div>
                
              </div>
            
            </div>
          <button class= "recommendations" onClick={handleSubmit}>Get Recommendations</button>
        </form>

        {hasClickedRecommend && (
          <div>
            <h2>Recommendations:</h2>
            <p>{recommendations}</p>
          </div>
        )}
      </header>
    </div>
  );

  // function handleInputChange(index, field, value) {
  //   const newActivity = [...Schedule];
  //   newActivity[index][field] = value;
  //   setSchedule(newActivity);
  // }
}

export default App;

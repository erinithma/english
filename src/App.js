import React, {useState, useEffect} from 'react';
import data from './data';
import './App.css';

let mapData = [];

Object.keys(data).forEach( (v) => {
  mapData.push([v, data[v]]);
})

function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  array = array.slice();

  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

mapData = shuffle(mapData);

const LIMIT = 8;

function App() {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(0);
  const [checking, setChecking] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [trueAnswer, setTrueAnswer] = useState(0);

  const getNext = (ind) => {
    const d = shuffle(mapData.filter( (d, i) => i !== ind)).slice(0, LIMIT);
    const ta = Math.floor(Math.random() * LIMIT);
    d[ta] = mapData[ind];
    setAnswers(d);
    setTrueAnswer(ta)
  }

  const check = (index) => {
    setSelected(index);
    setChecking(true);
  }

  const getHighlight = (ind) => {
    if(selected === ind) {
      return selected === trueAnswer ? "blue" : "red";
    }
    if(ind === trueAnswer) {
      return "blue";
    }
  }

  const next = () => {
    setChecking(false);
    let ind = index + 1;
    if(ind >= mapData.length) {
      ind = 0;
    }
    getNext(ind);
    setIndex(ind);
  }

  useEffect( () => {
    getNext(0);
  }, []);

  return (
    <div className="m-auto">
      <p className={"alert alert-primary"}>{mapData[index][0]}</p>
      <ul className="list-group">
        {answers.map( (d, i) => (
          <li className="list-group-item" style={{cursor: "pointer", background: checking ? getHighlight(i) : undefined, color: checking ? (getHighlight(i) === "blue" ? "white" : undefined) : undefined}} onClick={() => !checking && check(i)}>{d[1]}</li>
        ))}
      </ul>
      <br/>
      <button className={"btn btn-primary"} onClick={() => checking && next()}>Ok</button>
      <br/>
      <br/>
      <p>{index} / {mapData.length}</p>
    </div>
  );
}

export default App;

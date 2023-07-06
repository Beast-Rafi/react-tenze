import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import Die from "./components/Die";
import Confetti from "react-confetti";
export default function App() {
  const [dice, setDice] = useState(newDices());
  const [tenzies, setTenzies] = useState(false)
  const [highScore, setHighScore] = useState()
  const [clickTime , setClickTime] = useState(0)

  useEffect(() => {
    const diceHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].randomNumber
    const diceValue = dice.every(die => die.randomNumber === firstValue)
    if (diceHeld && diceValue) {
      setTenzies(true)
      console.log("Ok");
    }
    console.log("Bruh");
  }, [dice])

  function generateNewDie() {
    return {
      randomNumber: Math.floor(Math.random() * 6) + 1,
      isHeld: false,
      id: nanoid(),
    };
  }

  function rollDies() {
    setDice((prevDiece) =>
    prevDiece.map((item) => {
        return item.isHeld ? item : generateNewDie();
      })
    );
    if(tenzies) {
      setDice(newDices())
      setTenzies(false)
    }
    setClickTime(clickTime + 1)
    console.log(clickTime);
  }

  function newDices() {
    const die = [];
    for (let i = 0; i < 10; i++) {
      die.push(generateNewDie());
    }
    return die;
  }
  useEffect (() => checkHighScore() , [tenzies])
  function checkHighScore() {
    if (!highScore){
      setHighScore(clickTime)
      localStorage.setItem("highScore", JSON.stringify(highScore))      
      setClickTime(0)
    }else if (clickTime < highScore) {
      setHighScore(clickTime)
      localStorage.setItem("highScore",JSON.stringify(highScore))
      setClickTime(0)
    }
  }
  function showHighScore() {
    return localStorage.getItem("highScore")
  }

  function hold(id) {
    setDice((prevDice) =>
    prevDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }
  const renderDie = dice.map((item) => {
    return (
      <>
        <Die
          key={item.id}
          hold={hold}
          id={item.id}
          item={item.randomNumber}
          isHeld={item.isHeld}
          />
      </>
    );
  });
  

  return (
    <>
      {tenzies && <Confetti />}
      <div className="h-screen w-full bg-violet-900 p-10">
        
        <div className="flex flex-col justify-center align-middle gap-4 bg-slate-200 w-full h-full p-9 rounded-3xl">
          <h1 className="text-center text-3xl font-bold">Tenzies</h1>
          <p>
            Roll until all dices are same. Click each die to freez it as its
            current value between rolls
          </p>
          <div className="grid grid-cols-5 p-2 justify-center align-middle grid-rows-2 gap-2 text-center font-bold text-xl">
            {renderDie}
          </div>
          <h1>Lowest time rolled: {showHighScore()}</h1>
          <button
            onClick={() => rollDies()}
            className="h-10 w-auto rounded-md text-xl p-1 text-white  bg-indigo-600 hover:bg-indigo-500 hover:border-2 hover:border-indigo-900"
          >
            {tenzies ? "New Game" : "Role"}
          </button>
        </div>
      </div>
    </>
  );
}

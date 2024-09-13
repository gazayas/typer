import { useState } from 'react';

// TODO: Eventually replace this with the function in api_call.js
import { dummyData } from './dummy_data';
import { startingQuotes } from './dummy_data';

export default function Typer() {
  const [quotes, setQuotes] = useState(null)

  window.onload = function() {
    document.getElementById("main-box").style.display = "block"
    document.getElementById("game-input").focus()

    let modifiedDummyData
    modifiedDummyData = dummyData.map(hash => {
      hash["q"] = hash["q"].trim()
      return hash
    })
    shuffle(modifiedDummyData)
    setQuotes(modifiedDummyData)

    document.getElementById("live-text").innerHTML = "Press Enter to start"
  }

  return (
    <div>
      <TyperBox quotes={quotes} />
    </div>
  )
}

function TyperBox({ quotes }) {
  const [gameStarted, setGameStarted] = useState(false)
  const [quote, setQuote] = useState(startingQuotes[Math.floor(Math.random() * startingQuotes.length)])
  const [quoteCount, setQuoteCount] = useState(0)
  const liveText = document.getElementById("live-text")

  function getNextQuote() {
    setQuoteCount(quoteCount + 1)
    setQuote(quotes[quoteCount]["q"])

    let chars = quote.split("")
    liveText.innerHTML = ""
    chars.map(char => {
      let spanTag = document.createElement("span")
      spanTag.className = "untyped-character"
      spanTag.innerHTML = char
      liveText.appendChild(spanTag)
    })
  }

  // TODO: Refactor
  function processKeyDown(event) {
    if(!gameStarted && event["key"] == 'Enter') {
      setGameStarted(true)
      getNextQuote()
    } else if (liveText.querySelector(".untyped-character") === null && event["key"] == 'Enter') {
      getNextQuote()
    } else if (gameStarted) {
      if ((/[a-z|A-Z|\.',;| ]/).test(event["key"]) && event["key"].length === 1) {
        let nextUntypedCharacterNode = liveText.querySelector(".untyped-character")
        if(event["key"] == nextUntypedCharacterNode.innerHTML) {
          nextUntypedCharacterNode.color = "black"
          nextUntypedCharacterNode.className = "typed-character"

          if (event["key"] === ' ' && nextUntypedCharacterNode.style.backgroundColor === 'red') {
            nextUntypedCharacterNode.style.backgroundColor = null
          }
        } else {
          nextUntypedCharacterNode.classList.add("incorrect-character")

          if (nextUntypedCharacterNode.classList.contains("letter-jump")) {
            let clonedNode = nextUntypedCharacterNode.cloneNode(true)
            clonedNode.classList.add("letter-jump")
            liveText.insertBefore(clonedNode, nextUntypedCharacterNode)
            nextUntypedCharacterNode.remove()
          } else {
            nextUntypedCharacterNode.classList.add("letter-jump")
          }

          if (nextUntypedCharacterNode.innerHTML === ' ') {
            nextUntypedCharacterNode.style.backgroundColor = 'red'
          }
        }
      }
    }
  }

  function pauseLogic() {
    if (!gameStarted) {
      reFocus()
    } else {
      document.getElementById("unpause-button").style.display = 'inline'
    }
  }

  function reFocus() {
    document.getElementById("game-input").focus()
    document.getElementById("unpause-button").style.display = 'none'
  }

  return (
    <>
      <div id="main-box">
        <div id="live-text"></div>
        <textarea id="game-input" onBlur={pauseLogic} onKeyDown={(event) => processKeyDown(event)} />
        <button id="unpause-button" onClick={reFocus}>unpause</button>
      </div>
    </>
  )
}

// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array) {
  let currentIndex = array.length;

  // While there remain elements to shuffle...
  while (currentIndex != 0) {

    // Pick a remaining element...
    let randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
}

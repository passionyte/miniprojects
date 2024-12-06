const wordspath = require("word-list");
const fs = require("fs");
let words = fs.readFileSync(wordspath, 'utf8').split('\n')
const prompt = require("prompt-sync")();

// JavaScript Hangman
// Passionyte
// March 5th 2024

// PROPERTIES
const guesses = 9 // Amount of incorrect guesses player is able to make before losing
let solved = 0 // Number of solved words

function clamp(x, min, max) {
    if (x > max) {
        x = max
    }
    else if (x < min) {
        x = min
    }
    return x
}
 
function random(min, max) {
    return clamp(Math.round((Math.random() * max)), min, max)
}

function hide(string) {
    let returned = ""
    for (let i = 0; i < string.length; i++) {
        if (string[i] != " ", string[i] != "-") {
            returned += "_"
        }
        else {
            returned += string[i]
        }
    }
    return returned
}

console.log(`Welcome to Passionyte's JavaScript Hangman. Number of attempts: ${guesses} Words installed: ${words.length}.`)
while (true) {
    console.log(`Word ${(solved + 1)}`)

    let i = random(0, (words.length - 1))
    let word = words[i]

    console.log(`${word.length} characters`)
    console.log(word)

    let progress = hide(word)
    let solvedchars = []
    let guessed = []
    let incorrect = 0

    while (true) {
        console.log(progress)

        let guess = prompt("Guess a letter or the full word: ").toLowerCase()

        if (guess.length == 1) {
            if (guessed.indexOf(guess) == -1) {
                if (word.indexOf(guess) != -1) {
                    progress = ""
                    for (i = 0; i < word.length; i++) {
                        if (word[i] == guess) {
                            progress += guess
                        }
                        else if (solvedchars.indexOf(word[i]) != -1) {
                            progress += word[i]
                        }
                        else {
                            progress += "_"
                        }
                    }
                    solvedchars.push(guess)
                    guessed.push(guess)
                }
                else {
                    incorrect += 1
                    if (incorrect >= guesses) {
                        break
                    }
                    else {
                        console.log(`Incorrect. You have ${(guesses - incorrect)} guess(es) left.`)
                        guessed.push(guess)
                    }
                }
            }
            else {
                console.log(`You already guessed ${guess}.`)
            }      
        }
        else {
            if (guessed.indexOf(guess) == -1) {
                if (guess == word) {
                    progress = word
                }
                else {
                    incorrect += 1
                    if (incorrect >= guesses) {
                        break
                    }
                    else {
                        console.log(`Incorrect. You have ${(guesses - incorrect)} guess(es) left.`)
                        guessed.push(guess)
                    }
                }
            }
            else {
                console.log(`You already guessed ${guess}.`)
            }           
        }
        if (progress == word) {
            console.log(`Congratulations, you guessed correctly! The word was: '${word}'.`)
            words.splice(i, 1)
            solved += 1
            break
        }
    }
    
    if (incorrect >= guesses) {
        console.log(`You lose! The word was: '${word}'. You have guessed incorrectly ${guesses} times. You solved ${solved} word(s).`)
        break
    }
}
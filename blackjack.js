const prompt = require("prompt-sync")();

// JavaScript Blackjack
// March 1st 2024
// Passionyte

// PROPERTIES
let deck = [
   1,
   1,
   1,
   1,
   2,
   2,
   2,
   2,
   3,
   3,
   3,
   3,
   4,
   4,
   4,
   4,
   5,
   5,
   5,
   5,
   6,
   6,
   6,
   6,
   7,
   7,
   7,
   7,
   8,
   8,
   8,
   8,
   9,
   9,
   9,
   9,
   10,
   10,
   10
]
let cash = 100
let cards = 0
let dealercards = 0
let stand = false
let bet = 0
let times = 1
let dealerfirst = 0
let first = 0
let dealersecond = 0
let second = 0
let natural = false
let dealernatural = false

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

function hit() {
   return deck[random(0, (deck.length - 1))]
}

function reset(context) {
    if (context == "win") {
        cash += bet
    }
    else if (context == "lose") {
        cash -= bet
        cash = clamp(cash, 0, Infinity)
    }
    else if (context == "naturalwin") {
        cash += Math.round((bet * 1.5))
    }
    else if (context == "naturallose") {
        cash -= Math.round((bet * 1.5))
        cash = clamp(cash, 0, Infinity)
    }
    stand = false
    natural = false
    dealernatural = false
    bet = 0
    cards = 0
    dealercards = 0
    times = 1
    first = 0
    second = 0
    dealerfirst = 0
    dealersecond = 0
}

console.log("Welcome to Passionyte's JavaScript Blackjack!")
while (true) {
   times += 1
 
   let option = ""

   if (dealercards < 21) {
        if (bet == 0) {
            console.log(`Round 1 | You have: $${cash}`)
            bet = clamp(parseInt(prompt("Enter your bet: ")), 100, cash)
            if (isNaN(bet)) {
                bet = 100
                console.log("Nonsense?.. You're betting $100.")
            }
            console.log(`$${bet} on the line!`)
            if (bet == cash) {
                console.log("All or nothing!")
            }
            //if (times == 1) {
                for (let i = 0; i < 2; i++) {
                     dealercards += hit()
                     cards += hit()
                     if (i == 0) {
                        dealerfirst = dealercards
                        first = cards
                     }
                     else {
                         dealersecond = cards
                         second = cards
                     }
                    
                     natural = (first + second) == 11 && (first == 1 || second == 1)
                     dealernatural = (dealerfirst + dealersecond) == 11 && (dealerfirst == 1 || dealersecond == 1)
         
                     if (natural) {
                         cards = 21
                     }
                     if (dealernatural) {
                         dealercards = 21
                     }
                }
            //}
            console.log(`You both have hit twice. Your card sum: ${cards} | Dealer's first card: ${dealerfirst}`)
        }
        if (cards != 21 && dealercards != 21) {
            console.log(`Round ${times}`)
            if (stand) {
                dealercards += hit()
                console.log("The dealer hits.")
            }
            else {
                option = prompt("Hit (H) or Stand (Any) ").toLowerCase()
            }
        }   
   }

   if (option == "h") {
       let thishit = hit()
       cards += thishit
       console.log(`Hit! +${thishit} | Your card sum: ${cards}`)
   }
   else {
        if (stand == false && cards < 21 && dealercards < 21) {
            console.log(`Stand at ${cards}!`)
            stand = true
        }
   }

   if (cards > 21) {
       console.log(`Bust! You went over 21! The dealer has repossessed your bet of $${bet}.`)
       reset("lose")
   }
   else if (cards == 21) {
       if (dealercards == 21) { // It's an unfair world.
           console.log("House wins. Reset.")
           reset()
       }
       else {
            if (natural == false) {
                console.log(`Blackjack! You won: $${bet}!`)
                reset("win")
            }
            else {
                console.log(`Natural! You won $${bet * 1.5}!`)
                reset("naturalwin")
            }
       }
   }
   else if (dealercards == 21) {
       if (dealernatural == false) {
            console.log(`Loss Blackjack! The dealer has repossessed your bet of $${bet}.`)
            reset("lose")
       }
       else {
            console.log(`Loss Natural! The dealer has repossessed your bet of $${bet * 1.5}.`)
            reset("naturalwin")
       }
   }
   else if (dealercards > 21) {
       console.log(`Win! The dealer went over 21! | You won: $${bet}!`)
       reset("win")
   }
   else if (dealercards > cards && stand) { // Unsure if this is correct.
        console.log(`Loss! The dealer has a higher card sum than your stance of ${cards}. The dealer has repossessed your bet of $${bet}.`)
        reset("lose")
   }

   if (cash < 100) {
       console.log("You do not have enough money to play! Bring some more money and try again!")
       break
   }
}
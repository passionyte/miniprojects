function randInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

  function createDeck(suits, specials) {
    let deck = []

    for (let i = 0; (i < suits.length); i++) {
        for (let i1 = 1; (i1 < 11); i1++) {
            let additive = ((i1 == "10") && "A") || i1
    
            deck.push(suits[i] + additive)
        }
        for (let i1 = 0; (i1 < specials.length); i1++) {
            deck.push(suits[i] + specials[i1])
        }
    }

    return deck
}

function shuffleDeck(deck) {
    for (let i = 0; (i < deck.length); i++) {
        let me = deck[i]
        let chosen = randInt(0, (deck.length - 1))
        let them = deck[chosen]
        
        deck[chosen] = me
        deck[i] = them
    }

    return deck
}

function dealCards(deck, amount) {
    let dealing = []

    for (let i = 0; (i < amount); i++) {
        let chosen = randInt(0, (deck.length - 1))

        dealing.push(deck[chosen])
        deck.splice(chosen, 1)
    }

    return dealing
}

function insert(deck, card) {
    let notfound = true

    for (let i = 0; (i < deck.length); i++) {
        if (deck[i] == card) {
            notfound = false
            break
        }
    }

    if (notfound) {
        deck.push(card)
    }
    
    return (notfound)
}

function isComplete(deck) {
    return (deck.length >= 52)
}

console.log(insert(dealCards(shuffleDeck(createDeck(["D", "H", "C", "S"], ["J", "Q", "K"])), 5), "D3"))


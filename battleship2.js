const prompt = require("prompt-sync")()

// Settings //
let board = 8

const ships = [
    5,
    4,
    3,
    3,
    2
]

let plrships = []
let cpuships = []
let shots = []

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

function occupied(cpu, x, y) {
    let tocheck = (cpu) && cpuships || plrships
    
    for (let i = 0; (i < tocheck.length); i++) {
        if (tocheck[i].x == x && tocheck[i].y == y) {
            return true
        }
    }

    return false
}

function inrange(x, y) {
    return ((!isNaN(x) && !isNaN(y)) && (x < board && x > 0) && (y < board && y > 0))
}

while (true) {
    for (let i = 0; (i < ships.length); i++) {
        let size = ships[i]
        while (true) {
            let gen = []
            let dir = (random(1, 2) == 1)

            let ox = random(1, board)
            let oy = random(1, board)

            if (!occupied(true, ox, oy) && inrange(ox, oy)) { // Origin is in range and not occupied
                let x = ox
                let y = oy
                
                for (i = 0; (i < size); i++) {
                    if (dir) {
                        x += 1
                    }        
                    else {
                        y += 1
                    }  
                    if (occupied(true, x, y) || !inrange(x, y)) {
                        break
                    }
                    gen.push({CPU: true, Group: size, x: x, y: y})
                }
            }

            // console.log(`CPU Ship Generation Progress: ${gen.length} | Required: ${ships.length}`)
            if (gen.length == ships.length) {
                cpuships = gen
                break
            }
        }
        console.log("CPU has placed their ships!")

        break
    }

    console.log(`Player, it's your turn to place your ships.`)
    for (let i = 0; (i < ships.length); i++) {
        let size = ships[i]

        console.log(`Ship Size: ${size}`)
        while (true) {
            let gen = []

            let ox = parseInt(prompt("Enter a X for your ship: "))
            let oy = parseInt(prompt("Enter a Y for your ship: "))

            let dir = (prompt("Enter direction: [up]/side: ").toLowerCase() != "side")
            
            if (!occupied(false, ox, oy) && inrange(ox, oy)) { // Origin is in range and not occupied
                let x = ox
                let y = oy
                let problem = false
                
                for (i = 0; (i < size); i++) {
                    if (dir) {
                        x += 1
                    }        
                    else {
                        y += 1
                    }  
                    if (occupied(false, x, y) || !inrange(x, y)) {
                        problem = true
                        break
                    }
                    gen.push({CPU: false, Group: size, x: x, y: y})
                }

                if (gen.length < ships.length && !problem) {
                    console.log("Moving onto the next!")
                }
                else if (problem) {
                    console.log("Please try again.")
                }
                else {
                    console.log("Your ships have been placed!")
                    break
                }     
            }
            else {
                console.log("Please try again.")
            }    
        }
    }

    console.log("Game")

    // post board

    console.log("Your Turn")
    let x
    let y

    while (true) {
        x = parseInt(prompt("Enter a X: "))
        y = parseInt(prompt("Enter a Y: "))

        let already = (shots.find({x: x, y: y}))
        if (inrange(x, y) && !already) {
            break
        }
        else if (already) {
            console.log("You already shot here!")
        }
        else {
            console.log("Please enter a shot within the board.")
        }
    }

    cpuships.forEach(ship => {
        if (ship.x == x && ship.y == y) {
            console.log("Hit")

        }
        else {
            let shot = {x: x, y: y}
            if (!shots.find(shot)) {
                shots.push(shot)
            }
            console.log("Miss!")
        }
    })

    break
}
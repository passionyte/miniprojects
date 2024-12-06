const prompt = require("prompt-sync")()
const Clock = require("clock")

let grid = []
let gridsize = [] // (#x# size of grid)
let realsize = 0 // Tiles within grid
let start = 0 // Start time

let bombchance = 0.13 // Chance of a bomb (percent)

// player
let bomb = null // Bomb that ends player's game
let numflags = (Math.floor(realsize / 5)) // Flags player is given
let flags = numflags

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

function generategrid(origin, size) {
    gridsize = size
    realsize = (gridsize[0] * gridsize[1])
    numflags = (Math.floor(realsize / 5))
    flags = numflags
    bomb = null

        for (ty = 0; ty < gridsize[1]; ty++) { // Generate our grid
            for (tx = 0; tx < gridsize[0]; tx++) {
                let magnitude = Math.abs((origin.x + origin.y) - (tx + ty))
                grid.push({
                    i: grid.length,
                    x: tx,
                    y: ty,
                    bomb: (Math.random() <= bombchance && (magnitude > 3)),
                    flag: false,
                    visible: (magnitude < 4)
                }  
            )
        }
    }    
}

function getadjacents(tile) {
    let adjs = []
    for (x = -1; x < 2; x++) {
        for (y = -1; y < 2; y++) {
            grid.forEach(adj => {
                if ((adj.x == (tile.x + x)) && (adj.y == (tile.y + y))) {
                    adjs.push(adj)
                }
            })
        }
    }
    // console.log(`returning ${adjs.length} adjacents`)
    return adjs
}

function adjacentbombs(tile) {
    let count = 0

    getadjacents(tile).forEach(adj => {
             if (adj.bomb) {
               count += 1
             }
         }
    )
    return count
 }

function gridtostring() {
    let string = ""

    grid.forEach(tile => {
        let adjacents = adjacentbombs(tile)

        if (adjacents == 0) {
            
            tile.visible = true
        }

        string += (tile == bomb) && "[X]" || (bomb && tile.flag && !tile.bomb) && "[x]" || tile.flag && "[F]"  || (tile.bomb && bomb) && "[O]" || (tile.visible && !tile.bomb) && `[${adjacents}]` || "[ ]"

        if ((tile.i + 1) % gridsize[0] == 0) {
            string += "\n"
        }
    })

    return string
}

function progress() {
    let revealed = 0
    let bombs = 0
    
    grid.forEach(tile => {
        if (tile.visible) {
            revealed += 1
        }
        if (tile.bomb) {
            bombs += 1
        }
    })

    return (revealed >= (grid.length - bombs))
}

function again() {
    let choice = prompt("Would you like to play again? y/[n] ").toLowerCase()

    return (choice == "y")
}

console.log("Welcome to Passionyte's JavaScript Minesweeper.")
console.log("Tile Symbols: [X]: Explosion | [x]: Incorrect Flag | [F]: Flag Standing / Correct Flag | [O]: Bomb | [#]: Number of bombs near | [ ]: Unrevealed")
while (true) {
    let coordx
    let coordy
    let ongenerate = false

    if (grid.length == 0) {
        ongenerate = true
        let difficulty = (prompt("Enter difficulty ([beginner], intermediate, expert, master, custom): ")).toLowerCase()
        let sizex
        let sizey

        if (difficulty == "custom") {
            sizex = parseInt(prompt("Enter Size X: "))
            sizey = parseInt(prompt("Enter Size Y: "))
        }

        coordx = (parseInt(prompt("Enter X: ")) - 1)
        coordy = (parseInt(prompt("Enter Y: ")) - 1)

        generategrid({x: coordx, y: coordy}, difficulty == "intermediate" && [16, 16] || difficulty == "expert" && [16, 30] || difficulty == "master" && [20, 50] || difficulty == "custom" && [sizex, sizey] || [9, 9])
        console.log(`Generated a ${gridsize[0]}x${gridsize[1]} puzzle with ${realsize} tiles. You have ${numflags} flags.`)
        console.log(gridtostring())
        start = Clock.tick()
    }
    else {
        ongenerate = false
        coordx = (parseInt(prompt("Enter X: ")) - 1)
        coordy = (parseInt(prompt("Enter Y: ")) - 1)
    }
    
    if (coordx < gridsize[0] && coordy < gridsize[1]) {
        grid.forEach(tile => {
            if (coordx == tile.x && coordy == tile.y) {
                if (!tile.visible) {
                    if (flags > 0) {
                        let flag = prompt(`Place Flag? (${flags} / ${numflags}) y / [n] `).toLowerCase()
    
                        if (flag == "y") {
                            console.log("Flagged!")
                            flags -= 1
                            tile.flag = true
                        }
                    }    
        
                    if (!tile.flag && tile.bomb) {
                        console.log("BOOM!")
                        bomb = tile
                    }

                    tile.visible = true
                    console.log(gridtostring())
                }
                else {
                    if (!ongenerate) {
                        if (tile.flag) {
                            let remove = prompt("Remove Flag? [y] / n ").toLowerCase()
                            if (remove != "n") {
                                console.log("Flag removed!")
                                flags += 1
                                tile.flag = false
                            }
                        }
                        else {
                            console.log("This tile is visible.")
                        }
                    }
                }
            }
        });
    }
   else {
        console.log(`Please input a coordinate within ${gridsize[0]}x${gridsize[1]}`)
   }
   
    if (bomb) {
        console.log(`You lose! Time elapsed: ${(Math.floor(((Clock.tick() - start)) * 1000) / 1000)} seconds`)
        console.log(gridtostring())
        if (!again()) {
            break
        }
        else {
            grid = []
            console.log(grid.length)
            bomb = null
        }
    }

    if (progress() && grid.length > 0) {
        console.log(`You win! Time elapsed: ${(Math.floor(((Clock.tick() - start)) * 1000) / 1000)} seconds`)
        console.log(gridtostring())
        if (!again()) {
            break
        }
        else {
            grid = []
            console.log(grid.length)
            bomb = null
        }
    }
}
console.log("Exiting.")
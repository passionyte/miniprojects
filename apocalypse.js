const prompt = require("prompt-sync")() 
// Passionyte's JS Zombie Apocalypse

const items = [
    // Junk //
    {Name: "Cobweb", Type: "Junk", Owned: 0},
    {Name: "Dust ball", Type: "Junk", Owned: 0},

    // Food //
    {Name: "Rotten meat", Type: "Food", Owned: 0, Heals: 1},
    {Name: "Potato", Type: "Food", Owned: 0, Heals: 2},
    {Name: "Apple", Type: "Food", Owned: 0, Heals: 5},
    {Name: "Bread", Type: "Food", Owned: 0, Heals: 10},
    {Name: "Steak", Type: "Food", Owned: 0, Heals: 20},
    {Name: "Medkit", Type: "Food", Owned: 0, Heals: 50},

    // Weapons //
    
    // Projectiles
    {Name: "Arrow", Type: "Projectile", Damage: 2, Owned: 0},

    // Melee
    {Name: "Rusty dagger", Type: "Melee", Owned: 0, Damage: 4, Durability: 10},
    {Name: "Hammer", Type: "Melee", Owned: 0, Damage: 5, Durability: 15},
    {Name: "Crowbar", Type: "Melee", Owned: 0, Damage: 6, Durability: 20},
    {Name: "Copper shortsword", Type: "Melee", Owned: 0, Damage: 7, Durability: 25},
    {Name: "Iron broadsword", Type: "Melee", Owned: 0, Damage: 10, Durability: 40},
    {Name: "Golden greatsword", Type: "Melee", Owned: 0, Damage: 20, Durability: 60},
    {Name: "Katana", Type: "Melee", Owned: 0, Damage: 25, Durability: 80},
    {Name: "Diamond longsword", Type: "Melee", Owned: 0, Damage: 30, Durability: 100},

    // Explosives
    {Name: "Grenade", Type: "Explosive", Owned: 0, Damage: 30},
    {Name: "Dynamite", Type: "Explosive", Owned: 0, Damage: 50},
    {Name: "C4", Type: "Explosive", Owned: 0, Damage: 100}
]
const places = [
    {Name: "House", Chests: 3, MinZombies: 3, MaxZombies: 6, Loot: [
        {Item: "Arrow", Rarity: 3, Min: 2, Max: 5},
        {Item: "Rotten meat", Rarity: 3, Min: 1, Max: 3},
        {Item: "Cobweb", Rarity: 3, Min: 9, Max: 20},
        {Item: "Dust ball", Rarity: 2, Min: 4, Max: 9},
        {Item: "Hammer", Rarity: 14},
        {Item: "Rusty dagger", Rarity: 10},
        {Item: "Apple", Rarity: 20},
        {Item: "Bread", Rarity: 30},
        {Item: "Medkit", Rarity: 65}
    ]},
    {Name: "Shack", Chests: 2, Rarity: 3, MinZombies: 1, MaxZombies: 4, Loot: [
        {Item: "Arrow", Rarity: 2, Min: 3, Max: 8},
        {Item: "Apple", Rarity: 4, Min: 1, Max: 2},
        {Item: "Bread", Rarity: 6},
        {Item: "Rusty dagger", Rarity: 8},
        {Item: "Hammer", Rarity: 12},
        {Item: "Crowbar", Rarity: 15},
        {Item: "Dust ball", Rarity: 3, Min: 7, Max: 12},
        {Item: "Cobweb", Rarity: 3, Min: 6, Max: 10},
        {Item: "Copper shortsword", Rarity: 20},
    ]},
    {Name: "Hideout", Chests: 4, Rarity: 6, MinZombies: 1, MaxZombies: 3, Loot: [
        {Item: "Dust ball", Rarity: 3, Min: 2, Max: 5},
        {Item: "Cobweb", Rarity: 4, Min: 1, Max: 3},
        {Item: "Arrow", Rarity: 2, Min: 6, Max: 13},
        {Item: "Apple", Rarity: 3, Min: 1, Max: 3},
        {Item: "Bread", Rarity: 5, Min: 1, Max: 2},
        {Item: "Grenade", Rarity: 8, Min: 1, Max: 2},
        {Item: "Copper shortsword", Rarity: 14},
        {Item: "Iron broadsword", Rarity: 20},
        {Item: "Golden greatsword", Rarity: 40},
        {Item: "Medkit", Rarity: 50},
        {Item: "Katana", Rarity: 60}
    ]},
    {Name: "Dungeon", Chests: 2, Rarity: 12, MinZombies: 2, MaxZombies: 4, Loot: [
        {Item: "Arrow", Min: 8, Max: 16},
        {Item: "Rusty dagger", Rarity: 3},
        {Item: "Apple", Rarity: 3, Min: 2, Max: 4},
        {Item: "Bread", Rarity: 4, Min: 1, Max: 3},
        {Item: "Grenade", Rarity: 5, Min: 2, Max: 4},
        {Item: "Steak", Rarity: 6, Min: 1, Max: 2},
        {Item: "Copper shortsword", Rarity: 8},
        {Item: "Iron broadsword", Rarity: 12},
        {Item: "Golden greatsword", Rarity: 20},
        {Item: "Katana", Rarity: 24},
        {Item: "Dynamite", Rarity: 32, Min: 1, Max: 2},
        {Item: "Diamond longsword", Rarity: 40},
        {Item: "C4", Rarity: 50}
    ]}
]
const zombies = [
    {Name: "Zombie", Health: 10, MinDamage: 1, MaxDamage: 4, Drops: [
        {Item: "Arrow", Rarity: 4, Min: 1, Max: 3},
        {Item: "Rotten meat", Rarity: 2, Min: 1, Max: 2},
        {Item: "Potato", Rarity: 6},
        {Item: "Rusty dagger", Rarity: 9},
        {Item: "Crowbar", Rarity: 14}
    ]},
    {Name: "Brute", Health: 20, MinDamage: 2, MaxDamage: 7, Rarity: 4, Drops: [
        {Item: "Arrow", Rarity: 2, Min: 1, Max: 5},
        {Item: "Rotten meat", Min: 1, Max: 3},
        {Item: "Potato", Rarity: 4, Min: 1, Max: 2},
        {Item: "Apple", Rarity: 6},
        {Item: "Crowbar", Rarity: 7},
        {Item: "Bread", Rarity: 8},
        {Item: "Copper shortsword", Rarity: 10}
    ]},
    {Name: "Armored", Health: 30, MinDamage: 1, MaxDamage: 8, Rarity: 7, Drops: [
        {Item: "Rotten meat", Min: 1, Max: 2},
        {Item: "Potato", Rarity: 2, Min: 1, Max: 3},
        {Item: "Apple", Rarity: 4},
        {Item: "Bread", Rarity: 5},
        {Item: "Steak", Rarity: 7},
        {Item: "Copper shortsword", Rarity: 8},
        {Item: "Iron broadsword", Rarity: 20},
        {Item: "Grenade", Rarity: 16, Min: 1, Max: 2},
        {Item: "Medkit", Rarity: 32}
    ]}
]

// player
let health = 100
let maxhealth = health
let armor = 0
let inventory = []

items.forEach(item => {
    inventory.push({
        Name: item.Name,
        Type: item.Type,
        Owned: item.Owned,
        Durability: item.Durability || 0
    })
})

function clamp(x, min, max) {
    if (x < min) {
        x = min
    }
    else if (x > max) {
        x = max
    }

    return x
}

function random(min, max) { // Matt Brash
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function listinv(from) {
    if (!from) {
        for (i = 0; (i < inventory.length); i++) {
            let slot = inventory[i]
    
            console.log(`[${i}] ${slot.Name} x${slot.Owned}`)
        }
    }
    else {
        for (i = 0; (i < from.length); i++) {
            let slot = from[i]
    
            console.log(`[${i}] ${slot.Name} x${slot.Owned}`)
        }
    }
}

function find(array, obj, name) {
    for (let i = 0; (i < array.length); i++) {
        let item = array[i]

        if (item[obj] == name) {
            return item
        }
    }
    return -1
}

function attack(pool, dmg) {
    pool = clamp((pool - dmg), 0, pool)

    return pool
}

function takedamage(dmg) {
    dmg = clamp((dmg - armor), 0, dmg)
    health = clamp((health - dmg), 0, maxhealth)

    return dmg
}

function battle() {
    if (health <= 0) {
        return
    }

    let enemy = zombies[0] // Chooses 'Zombie' by default
    for (let i = 1; (i < zombies.length); i++) {
        let zombie = zombies[i]
        if (random(1, zombie.Rarity) == 1) {
            enemy = zombie
            break
        }
    }

    console.log(`You encountered a ${enemy.Name}!`)

    let weapons = []

    for (let i = 0; (i < inventory.length); i++) {
        let slot = inventory[i]
        if ((slot.Owned > 0) && (slot.Type == "Projectile" || slot.Type == "Melee" || slot.Type == "Explosive")) {
            weapons.push(slot)
        }
    }

    if (weapons.length > 0) {
        let hp = enemy.Health
        const max = hp

        while (hp > 0 && health > 0) {
            console.log(`Health: [${health} / ${maxhealth}] Armor: ${armor}`)

            let attacking = false
            let choice = parseInt(prompt("What would you like to do? ([1]: Attack - 2: Eat - 3: Run away): "))

            if (choice == 2) {
                attacking = false
                console.log("You stop to eat.")

                let foods = []
                for (let i = 0; (i < inventory.length); i++) {
                    let slot = inventory[i]
                    if ((slot.Owned > 0) && (slot.Type == "Food")) {
                        foods.push(slot)
                    }
                }

                if (foods.length > 0) {
                    if (health < 100) {
                        let food = foods[0]
                        if (foods.length > 1) {
                            console.log("You have:")
                            listinv(foods)
        
                            while (true) {
                                let input = prompt("Choose a food item: ")
                                let raw
                    
                                for (i = 0; (i < foods.length); i++) {
                                    raw = foods[i]
        
                                    if (input.toLowerCase() == raw.Name.toLowerCase() || parseInt(input) == i) {
                                        food = raw
                                        break
                                    }
                                }
        
                                if (raw && food == raw) {
                                    break
                                }
                            }
                        }
                        
                        let stats = find(items, "Name", food.Name)

                        food.Owned--
                        health = clamp((health + stats.Heals), 0, maxhealth)
                        console.log(`You eat the ${food.Name}. +${stats.Heals} HP`)
                    }
                    else {
                        console.log("You are at full HP.")
                    }
                }
                else {
                    console.log("You have no food to eat!")
                }
            }
            else if (choice == 3) {
                let dmg = takedamage(random(enemy.MinDamage, enemy.MaxDamage))

                console.log(`The ${enemy.Name} attacks as you scram. -${dmg} HP`)
                break
            }
            else {
                attacking = true
                weapons = []
                for (let i = 0; (i < inventory.length); i++) {
                    let slot = inventory[i]
                    if ((slot.Owned > 0) && (slot.Type == "Projectile" || slot.Type == "Melee" || slot.Type == "Explosive")) {
                        weapons.push(slot)
                    }
                }

                let weapon = weapons[0]

                if (weapons.length > 1) {
                    console.log("You have:")
                    listinv(weapons)

                    while (true) {
                        let input = prompt("Choose a weapon: ")
                        let raw
            
                        for (i = 0; (i < weapons.length); i++) {
                            raw = weapons[i]

                            if (input.toLowerCase() == raw.Name.toLowerCase() || parseInt(input) == i) {
                                weapon = raw
                                break
                            }
                        }

                        if (raw && weapon == raw) {
                            break
                        }
                    }
                }
                else {
                    if (weapon) {
                        console.log(`You are forced to use your ${weapon.Name}.`)
                    }
                    else {
                        let dmg = takedamage(random(enemy.MinDamage, enemy.MaxDamage))
                        console.log(`You have no weapons! You get injured, but manage to run away. -${dmg} HP`)
                        break
                    }
                }
        
                console.log(`You use your ${weapon.Name}!`)

                let stats = find(items, "Name", weapon.Name)

                console.log(`${stats.Damage} damage!`)
                if (weapon.Type == "Melee") {
                    weapon.Durability--
                    console.log(`Durability: ${weapon.Durability}`)

                    if (weapon.Durability <= 0) {
                        console.log(`Your ${weapon.Name} broke!`)
                        weapon.Owned--

                        weapon.Durability = stats.Durability
                    }

                    hp = attack(hp, stats.Damage)
                }
                else {
                    weapon.Owned--
                    hp = attack(hp, stats.Damage)
                }
                console.log(`${enemy.Name} [${hp} / ${max}]`)

                if (hp > 0) {
                    let dmg = takedamage(random(enemy.MinDamage, enemy.MaxDamage))
                    console.log(`${enemy.Name} attacks! -${dmg} HP`)
                }
            }
            if (attacking) {
                if (hp <= 0) {
                    console.log(`You defeated the ${enemy.Name}!`)

                    for (let i = 0; (i < enemy.Drops.length); i++) {
                        let item = enemy.Drops[i]

                        if (!item.Rarity || (random(1, item.Rarity) == 1)) {
                            let amount = 1
                            for (let i = 0; (i < inventory.length); i++) {
                                let slot = inventory[i]
                                if (slot.Name == item.Item) {
                                    if (!item.Min && !item.Max) {
                                        slot.Owned++
                                    }
                                    else {
                                        amount = random(item.Min, item.Max)
                                        slot.Owned += amount
                                    }
                                }
                            }
                            console.log(`The ${enemy.Name} dropped x${amount} ${item.Item}(s)!`)
                        }
                    }
                }
                else {
                        if (weapons.length == 0) {
                            let dmg = takedamage(random(enemy.MinDamage, enemy.MaxDamage))
                            console.log(`You have no weapons! You get injured, but manage to run away. -${dmg} HP`)
                        }
                    }
                }
            }
        }
        else {
            let dmg = takedamage(random(enemy.MinDamage, enemy.MaxDamage))
            console.log(`You have no weapons! You get injured, but manage to run away. -${dmg} HP`)
        }
}

console.log("JS Apocalypse")
while (true) {
    if (health <= 0) {
        console.log("You died.")
        break
    }
    else {
        console.log(`Health: [${health} / ${maxhealth}] Armor: ${armor}`)
        prompt()

        console.log("You walk...")

        if (random(1, 3) == 1) {
            let selected = places[0]
            places.forEach(place => {
                if (selected == places[0]) {
                    if (place.Rarity) {
                        if (random(1, place.Rarity) == 1) {
                            selected = place
                        }
                    }
                }
            })

            console.log(`Exploring ${selected.Name}!`)

            for (let i = 0; (i < (random(selected.MinZombies, selected.MaxZombies))); i++) {
                let now = (random(1, 2) == 1)

                if (now) {
                    battle()
                    if (health <= 0) {
                        break
                    }
                }

                let chests = random(1, selected.Chests)

                for (let i = 0; (i < chests); i++) {
                    console.log("Opening chest!")
                    selected.Loot.forEach(item => {
                        if ((item.Rarity && random(1, item.Rarity) == 1) || (!item.Rarity)) {
                            let amount = 1
                            for (let i = 0; (i < inventory.length); i++) {
                                let slot = inventory[i]
                                if (slot.Name == item.Item) {
                                    if (!item.Min && !item.Max) {
                                        slot.Owned++
                                    }
                                    else {
                                        amount = random(item.Min, item.Max)
                                        slot.Owned += amount
                                    }
                                }
                            }
                            console.log(`You got x${amount} ${item.Item}(s)!`)
                        }
                    })
                }

                if (!now) {
                    battle()

                    if (health <= 0) {
                        break
                    }
                }
            }
        }
    }
}
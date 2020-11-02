const tiles = [
    [2, '#000', '2.png'],
    [4, '#506917', '4.png'],
    [8, '#7D4E0B', '8.png'],
    [16, '#1C5F78', '16.png'],
    [32, '#4E5D63', '32.png'],
    [64, '#9c3b80', '64.png'],
    [128, '#563b9c', '128.png'],
    [256, '#3b469c', '256.png'],
    [512, '#3b8d9c', '512.png'],
    [1024, '#3b9c84', '1024.png'],
    [2048, '#3d9c3b', '2048.png'],
    [4096, '#919c3b', '4096.png'],
    [8192, '#9c6d3b', '8192.png'],
    [16384, '#9c3e3b', '16384.png']
]

let board = [
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0]
], dimension = {
    x: [0, 60, 120, 180, 240],
    y: [0, 60, 120, 180, 240, 300, 360]
}

// REMOVE BEFORE ADDING TO APP
const Click = (elem, func) => {
    let select = document.querySelectorAll(elem)
    return select.forEach(item => item.onclick = func )
}

const tile_count = tiles.length, max_next = 6, tile_images = [], random = num => Math.floor((Math.random() * num))
let click_pos = {}, drop_tile

/*
const get_drop_tile = () => {

    return new Promise( resolve => {

        let drop_tile = new Image()
        drop_tile.src = start_tile[2]

        drop_tile.onload = () => {
            resolve(drop_tile)
        }

    })

}

const get_click_position = (canvas, event) => {

    let rect = canvas.getBoundingClientRect()
    let x = event.clientX - rect.left
    let y = event.clientY - rect.top
    return {x, y}
}



const calculate = (drop_tile) => {
console.log('CALCULATE')
console.log('DROP TILE:', drop_tile, 'CLICK POS:', click_pos)
    tile = drop_tile.getBoundingClientRect()
console.log('Tile Left:',tile.left, 'Tile Top:', tile.top)
    if (tile.top > 60) {

    }
    
    else return {x: tile.left, y: tile.top ++}

}

const draw = calc => {
console.log('DRAW')
console.log('Calc:', calc)
}

const run_game = (canvas, context, drop_tile, next_tile) => {

    if (running) {

        let calc = calculate(drop_tile)
        draw(calc)

        requestAnimationFrame(run_game(canvas, context, drop_tile))

    }

}

const game_start = async () => {
console.log('GAME START')
    let canvas = document.getElementById('game_canvas')
    let context = canvas.getContext('2d')

    Click('#game_canvas', function(event) { click_pos = get_click_position(canvas, event);console.log('X/Y:', click_pos) })

    let drop_tile = await get_drop_tile()

    let next_tile = get_next_tile()

    context.drawImage(drop_tile, 125, 5)
    
    setTimeout(() => { run_game(canvas, context, drop_tile, next_tile) },100 )

    

}
*/

let running = false, next, dropping = false, next_tile

const preload = url => {

    return new Promise( resolve => {

        let img = new Image()
        img.src = url
        img.onload = () => resolve(img)

    })

   

}

const display_start_message = (ctx, can) => {

    return new Promise( resolve => {

        ctx.fillStyle = '#00000090'
        ctx.fillRect(can.width/6, can.height/3, (can.width/6) * 4, can.height/5)
        ctx.font = '30px Muli'
        ctx.fillStyle = '#DA9100'
        ctx.textAlign = 'center'
        ctx.fillText('Click to start', can.width/2, can.height/2 - 20)

        Click('#game_canvas', () => {

            ctx.clearRect(0,0, can.width, can.height)

            resolve(true)

        })

    })
    
}

const display_next_tile = (next) => {
console.log('Display Next Tile')
    let next_number = document.getElementById('next_number')
    next_number.innerText = next[0]
    next_number.style.backgroundColor = next[1]

    return next

}

const pause_button = () => {

    running = !running

    if (running) document.querySelector('.fa-pause-circle').style.color = '#FFF'
    else document.querySelector('.fa-pause-circle').style.color = '#F00'

    return running

}

const game_run = (running, can, ctx, dropping_tile, next_tile, Y = 5) => {
console.log('game_run', Y)
    if (running) {

        if (!dropping) { 
           
            ctx.clearRect(0, 0, can.width, can.height)

            dropping_tile = next_tile

            ctx.drawImage(dropping_tile[3], 125, Y)

            next_tile = tiles[random(max_next)]

            dropping = true

            display_next_tile(next_tile)
            
        }

        ctx.clearRect(0, 0, can.width, can.height)
        ctx.drawImage(dropping_tile[3], 125, Y)

        Y += 0.25
        if (Y >= 359) Y = 359

        //requestAnimationFrame(game_run(running, can,ctx,dropping_tile,next_tile, Y))
        setTimeout(game_run(running, can,ctx,dropping_tile,next_tile, Y), 1000/60)

    }

    else console.log('GAME PAUSED')

}

const game_start_new = async () => {

    let canvas = document.getElementById("game_canvas")
    let context = canvas.getContext("2d")

    let dsm = await display_start_message(context, canvas)
    if (dsm) {

        running = true

        next_tile = tiles[random(max_next)]

        setTimeout(() => { game_run(running, canvas, context, 0, next_tile) }, 100)

    }
}

document.getElementById('pause_button').addEventListener('click', () => pause_button() )

tiles.forEach( async (item, index) => {

    tiles[index].push(await preload(item[2]))

})

game_start_new()
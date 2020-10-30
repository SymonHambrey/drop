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
]

// REMOVE BEFORE ADDING TO APP
const Click = (elem, func) => {
    let select = document.querySelectorAll(elem)
    return select.forEach(item => item.onclick = func )
  }

const tile_count = tiles.length, max_next = 6, tile_images = []

const random = num => Math.floor((Math.random() * num))

let start_tile = tiles[random(max_next)], next = tiles[random(max_next)]

let next_number = document.getElementById('next_number')
next_number.innerText = next[0]
next_number.style.backgroundColor = next[1]

const game_start = () => {

    let canvas = document.getElementById('game_canvas')
    let context = canvas.getContext('2d')

    let drop_tile = new Image()
    drop_tile.src = start_tile[2]

    drop_tile.onload = () => {
        context.drawImage(drop_tile, 65, 5)
    }

}

game_start()
const tiles = [
    [2, '#AA0000'],
    [4, '#506917'],
    [8, '#7D4E0B'],
    [16, '#1C5F78'],
    [32, '#4E5D63'],
    [64, '#9c3b80'],
    [128, '#563b9c'],
    [256, '#3b469c'],
    [512, '#3b8d9c'],
    [1024, '#3b9c84'],
    [2048, '#3d9c3b'],
    [4096, '#919c3b'],
    [8192, '#9c6d3b'],
    [16384, '#9c3e3b'],
    [32768, '#000']
]

let board = [
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0],
    [0,0,0,0,0]
]

const tile_count = tiles.length, max_next = 6

const random = num => Math.floor((Math.random() * num))

let start_tile = tiles[random(max_next)], next = tiles[random(max_next)]

let next_number = document.getElementById('next_number')
next_number.innerText = next[0]
next_number.style.backgroundColor = next[1]

let drop_tile = document.createElement('DIV')
drop_tile.style.backgroundColor = start_tile[1]
drop_tile.classList.add('number-box')
drop_tile.innerHTML = `<p>${start_tile[0]}</p>`
drop_tile.id = 'current_drop'
document.getElementById('ind_col_3').append(drop_tile)

let current_drop = document.getElementById('current_drop')

    setTimeout(() => { current_drop.style.transform = `translateY(350px)` }, 250)


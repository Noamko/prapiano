


setInterval(function() {
    
}, 2000);

function TileClick(color, tile) {
    if (color === 'black') {
       var container = document.getElementById('black-tiles');
       var tile = container.children[tile - 1];
       tile.style.backgroundColor = 'purple';

    } else {
        var container = document.getElementById('white-tiles');
        var tile = container.children[tile - 1];
        tile.style.backgroundColor = 'purple';
    }
}

function restoreBackground(color, tile) {
    if (color === 'black') {
        var container = document.getElementById('black-tiles');
        var tile = container.children[tile - 1];
        tile.style.backgroundColor = 'black';
    } else {
        var container = document.getElementById('white-tiles');
        var tile = container.children[tile - 1];
        tile.style.backgroundColor = 'white';
    }
}
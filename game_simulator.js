fs = require('fs');

console.log(process.argv[2]);
fs.readFile(__dirname + '/' + process.argv[2], 'utf8', function (err,data) {
	if (err) {
		return console.log(err);
	}
	data_arr = data.split(/\r?\n/);
	var board = init_board();
	var all_boards = [];

	console.log(board);
	for (var i = 2; i < data_arr.length; i++){
		if (data_arr[i] !== ''){
			var line = data_arr[i].split(' ');
			var id = line[0];
			//console.log('id = ' + id);
			var block_line = line[1];
			//console.log('player ' + id + ' placed blocks at ' + block_line);
			var blocks = block_line.split(';');
			var coords = [];
			for (var b = 0; b < blocks.length-1; b++){
				var x = parseInt(blocks[b].split(',')[0]);
				var y = parseInt(blocks[b].split(',')[1]);
				//console.log('x = ' + x + ', y = ' + y);
				if (id == '2:'){
					//console.log('id is 2 so inverting coords');
					x = 13 - x;
					y = 13 - y;
				}
				coords.push([y,x]);
			}
			//console.log('coords = ' + JSON.stringify(coords));
			board = place_piece(board.slice(), coords, parseInt(id));
			all_boards.push(JSON.parse(JSON.stringify(board)));
			
			console.log('board after player ' + id + 's go :');
			console.log(board);
		}
	}
});

function place_piece(board, piece, id){
	for (var i = 0; i < piece.length; i++){
		//console.log(piece[i][1] + ', ' + piece[i][0]);
		board[13-piece[i][0]][13-piece[i][1]] = id;
	}
	return board;
}

function init_board(){
	var arr = [];
	for (var y = 0; y < 14; y++){
		var line = [];
		for (var x = 0; x < 14; x++){
			line.push(0);
		}
		arr.push(line);
	}
	return arr;
}

function inverse_board(board){
	var inverse = [];
	for (var y = board.length-1; y >= 0; y--){
		inverse.push(board[y].reverse());
	}
	for (var y = 0; y < inverse.length; y++){
		for (var x = 0; x < inverse[y].length; x++){
			if (inverse[y][x] == 1){
				inverse[y][x] = 2;
			}else if (inverse[y][x] == 2){
				inverse[y][x] = 1;
			}
		}
	}
	return inverse;
}

function pooled_board(board){
	
}

function write_data(output){
	var name = ''
	do{
		name = make_ID(8);
	}while(fs.existsSync('training/' + name));
	fs.writeFile('training/' + name, JSON.stringify(output), function(err) {
		if(err) {
			return console.log(err);
		}
	});
}

function make_ID(len){
    var text = '';
    var possible = 'abcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < len; i++){
        text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
    return text;
}

console.log(count(process.argv[2],1));
function count(moves,player){
	if (moves === 20) console.log('moves = ' + moves + ', player = ' + player);
	if (player === 1){
		var move_count = 0;
		for (var i = 0; i < moves; i++){
			move_count += count(moves,2);
		}
		return move_count;
	}else if (player === 2){
		if (moves === 1){
			return 1;
		}else{
			var move_count = 0;
			for (var i = 0; i < moves; i++){
				move_count += count(moves-1,1);
			}			
			return move_count;
		}
	}
}

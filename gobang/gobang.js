/*//
title:五子棋
author：aspwebchh
date:2013/2/10
//*/

var GRID_NUM = 15;
var PERSON = 0;
var MACHINE = 1;
var NO_CHESS = -1;

var ChessPoint = function( x, y ) {
	this.x = x;
	this.y = y;
}

var ChessMove = function( chessPoint, score ) {
	this.chessPoint = chessPoint;
	this.score = score;
}

var MoveCreator = function() {

	var moveList = [];

	this.create = function( board, depth ) {
		var tmp = [];
		var movecount = 0;
		for (var i = 0; i < GRID_NUM; i++) {
			for (var j = 0; j < GRID_NUM; j++) {
				if( board[ i ][ j ] == NO_CHESS ) {
					var move = moveList[ depth ][ movecount ];
					var point = move.chessPoint;
					point.x = i;
					point.y = j;
					tmp.push( move );
					movecount++				
				}
			};
		};
		return tmp;
	}

	var initialize = function() {
		for (var i = 0; i < 10; i++) {
			moveList.push( [] );
			for (var j = 0; j < GRID_NUM * GRID_NUM; j++) {
				var chessPoint = new ChessPoint( 0, 0 );
				var chessMove = new ChessMove( chessPoint, null );
				moveList[ i ][ j ] = chessMove;
			};
		};
	}

	initialize();
}



var SearchEngin = function( mCreator, eval, depth ) {
	var moveCreator = mCreator;
	var evaluation = eval;
	var maxDepth = depth;
	var bestMove;
	var curBoard;
	var historyTable = new HistoryTable();
	var self = this;

	var makeMove = function( move, type ) {
		curBoard[ move.chessPoint.x ][ move.chessPoint.y ] = type;
	}
	
	var unMakeMove = function( move ) {
		curBoard[ move.chessPoint.x ][ move.chessPoint.y ] = NO_CHESS;
	}
	
	
	this.getGoodMove = function( board, side ) {
		testValue = 0;
	    curBoard = board;
		//var value = maxMin( maxDepth );
		var value = alphaBeta( -10000, 10000, maxDepth );		

		//console.log( value.value );
		//console.log( value.debug );
		//console.log( value.typeCount );

		//console.log( testValue );

		var result = new Object();
		result.score = value;
		result.bestPoint = bestMove.chessPoint;
		return result;

		//makeMove( bestMove, side );
		//return curBoard;
	}

	/*var maxMin = function( depth ) {
		if( depth > 0 ) {
			//当前局面是否是胜负已分状态
			var s = isGameOver( curBoard, depth );
			if( s ) {
				//alert( s )
				return;
			}
		}
 
		if( depth <= 0 ) {
			var value = evaluation.eval( curBoard, maxDepth % 2 );
			return value;
		}

		if( ( maxDepth - depth + 1 ) % 2 == 1 ) {
			var current = { value: -99999 };
			var moveList = moveCreator.create( curBoard, depth );
			for( var i = 0; i < moveList.length; i++ ) {
				makeMove( moveList[ i ], ( maxDepth - depth + 1 ) % 2 );
				var score = maxMin( depth - 1 );
				unMakeMove( moveList[ i ] );			
			    if( score.value > current.value ) {
					current = score;
					if( maxDepth == depth ) {
						bestMove = moveList[ i ];
					}
				}						
			}
			return current;
		} else {
			var current = { value: 99999 };
			var moveList = moveCreator.create( curBoard, depth );
			for( var i = 0; i < moveList.length; i++ ) {
				makeMove( moveList[ i ], ( maxDepth - depth + 1 ) % 2 );
				var score = maxMin( depth - 1 );
				unMakeMove( moveList[ i ] );			
			    if( score.value < current.value ) {
					current = score;
					if( maxDepth == depth ) {
						bestMove = moveList[ i ];
					}
				}						
			}
			return current;			
		}
	}	*/


	var alphaBeta = function( alphi, beta, depth ) {
		if( depth <= 0 ) {
			var value = evaluation.eval( curBoard, ( maxDepth + 1 ) % 2 );
			//console.log( value )
			return value;
		}

		var bestMoveFlag = -1;

		var moveList = moveCreator.create( curBoard, depth );
		var moveCount = moveList.length;

		for (var i = 0; i < moveCount; i++) {
			moveList[i].score = historyTable.getHistoryScore( moveList[ i ] );
		};  
		
		if( ( maxDepth - depth ) % 2 == 1 ) {
			moveList.sort( function( a, b ) {
				return b.score - a.score;
			} )
			for( var i = 0; i < moveCount; i++ ) {
				makeMove( moveList[ i ], PERSON );
				var score = alphaBeta( alphi, beta, depth - 1 );
				unMakeMove( moveList[ i ] );
				if( score < beta ) {
					beta = score;

					if( maxDepth == depth ) {
						bestMove = moveList[ i ];
					}

					bestMoveFlag = i;

					if( alphi >= beta ) {
						bestMoveFlag = i;
						return alphi;
					}
				}
			};

			if( bestMoveFlag != -1 ) {
				historyTable.enterHistoryTable( moveList[ bestMoveFlag ], depth );
			}

			return beta;
		} else {
			moveList.sort( function( a, b ) {
				return b.score - a.score;
			} )			
			for( var i = 0; i < moveCount; i++ ) {
				makeMove( moveList[ i ], MACHINE );
				var score = alphaBeta( alphi, beta, depth - 1 );
				unMakeMove( moveList[ i ] );
				if( score > alphi ) {
					alphi = score;

					if( maxDepth == depth ) {
						bestMove = moveList[ i ];
					}

					bestMoveFlag = i;

					if( alphi >= beta ) {
						bestMoveFlag = i;
						return beta;
					}
				}
			};

			if( bestMoveFlag != -1 ) {
				historyTable.enterHistoryTable( moveList[ bestMoveFlag ], depth );
			}

			return alphi;			
		}
	}
}

//历史记录
var HistoryTable = function () {

	var historyTable;

	var initialize = function() {
		//初始化历史记录表
		historyTable = [];
		for (var i = 0; i < GRID_NUM; i++) {
			historyTable.push( [] );
			for (var j = 0; j < GRID_NUM; j++) {
				historyTable[ i ][ j ] = 0;
			};
		}
	}

	this.enterHistoryTable = function( move, depth ) {
		historyTable[ move.chessPoint.x ][ move.chessPoint.y ] += 2 << depth;
	}

	this.getHistoryScore = function( move ) {
		return historyTable[ move.chessPoint.x ][ move.chessPoint.y ];
	}

	initialize();	
}

//UI
;( function() {
    var count = 0
	
	var Gobang = window[ 'Gobang' ] = function( placeholder ) {
		var board;
		var evaluation;
		var moveCreator;
		var searchEngin;
		
		var instanceName = 'instance_' + ( ++count );
		window[ instanceName ] = this;		
		
	    this.start = function( level, start ) {
			initBoard();
			
			evaluation = new Evaluation();
			moveCreator = new MoveCreator();
			searchEngin = new SearchEngin( moveCreator, evaluation, level );

			if( start == MACHINE ) {
				var result = searchEngin.getGoodMove( board, MACHINE );
				var point = result.bestPoint;
				board[ point.x ][ point.y ] = MACHINE; 
			}

			render();
		}
		

		var debug = function( array ) {
		   var STWO = 1; //眠二
		   var STHREE = 2;//眠三
		   var SFOUR = 3; //冲四
		   var TWO = 4;//活二
		   var THREE = 5;//活三
		   var FOUR = 6;//活四
		   var FIVE = 7;//五连
		   var NOTYPE = 11;//未定义
		   var ANALSISED = 255;//已分析过
		   var TOBEANALSIS = 0;//待分析			

			var info = {};
			for (var i = 0; i < array.length; i++) {
				var item =  array[i];
				if( item ) {
					switch( i ) {
						case FIVE:
							info[ 'FIVE' ] = item;
							break;
						case FOUR:
							info[ 'FOUR' ] = item;
							break;
						case SFOUR:
							info[ 'SFOUR' ] = item;
							break;
						case THREE:
							info[ 'THREE' ] = item;
							break;
						case STHREE:
							info[ 'STHREE' ] = item;
							break;
						case TWO:
							info[ 'TWO' ] = item;
							break;
						case STWO:
						    info[ 'STWO' ] = item;
						    break;  

					}
				}
			}
			console.log( info );
		}  

		var setPrev = function( i, j, side ) {
			var posEl = document.getElementById( 'pos_' + i + '_' + j );
			//alert(posEl)
			posEl.className += ( side == MACHINE ? ' machine_prev' : ' person_prev' );
		}

		this.setChess = function( i, j ) {
		    testValue = 0;
			board[ i ][ j ] = PERSON;
			render();

			//var result = evaluation.eval( board, PERSON );
			//console.log( result.typeCount[0] );
			//debug( result.typeCount[ 0 ] );
			
			var score = evaluation.eval( board, PERSON );

			if( score == -9999 ) {
				var pPoints = evaluation.getWinPoints( board, i, j );
				winRender( pPoints, PERSON );	
				alert( '您胜了' );
				return;
			}
			render();

			var result = searchEngin.getGoodMove( board, MACHINE );
			var point = result.bestPoint;

			board[ point.x ][ point.y ] = MACHINE; 
			render(); 		

			setPrev( point.x, point.y, MACHINE );	
			//setPrev( i, j, PERSON );

			score = evaluation.eval( board, MACHINE );
			if( score == 9999 ) {
				var mPoints = evaluation.getWinPoints( board, point.x, point.y );
				winRender( mPoints, MACHINE );
				alert( '电脑胜了' );
			}

			//console.log( testValue ); 
		}
		
		var winRender = function( points, side ) {
			var className = side == PERSON ? 'bg person_star' : 'bg machine_star';
			for (var i = 0; i < points.length; i++) {
				var p  = points[i];
				document.getElementById( 'pos_' + p.x + '_' + p.y ).className = className;
			};

		    for (var i = 0; i < GRID_NUM; i++) {
		    	for (var j = 0; j < GRID_NUM; j++) {
		    		var posEl = document.getElementById( 'pos_' + i + '_' + j );
		    		posEl.setAttribute( 'onclick', '' );
		    		posEl.setAttribute( 'onmouseover', '' );
		    		posEl.setAttribute( 'onmouseout', '' );
		    	};
		    };
		}

		var render = function() {
			var html = '';
			for( var i = 0; i < GRID_NUM; i++ ) {
				for( var j = 0; j < GRID_NUM; j++ ) {
				    var chessType = board[ i ][ j ];
					var className = '';
					var eventValue = '';
					if( chessType == PERSON ) {
						className = 'bg person';
					} else if( chessType == MACHINE ) {
						className = 'bg machine';
					} else {
						eventValue = 'onclick="'+instanceName +'.setChess( '+ i +','+ j +' )"';	
						eventValue += " onmouseover=\"this.className='bg cur'\" onmouseout=\"this.className=''\"";				
					}
					
					html += '<div '+ eventValue +'" class="'+ className +'" id="pos_'+ i +'_'+ j +'" ></div>';
				}
			}
			document.getElementById( placeholder ).innerHTML = html;
		}
		
		var initBoard = function() {
			board = [];
			for( var i = 0; i < GRID_NUM; i++ ) {
				board.push( [] );
				for( var j = 0; j < GRID_NUM; j++ ) {
					board[ i ].push( NO_CHESS );
				}
			}
			return board;
		}	
	}

} )();

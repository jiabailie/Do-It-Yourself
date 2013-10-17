/*//
title:五子棋棋局评估类
author：aspwebchh
date:2013/2/10
//*/
var testValue = 0;

var Evaluation = function() {
		
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
	var lineRecord;
	var typeRecord;
	var typeCount;
	//位置价值
	var posValue = [
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],	
		[0,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
		[0,1,2,2,2,2,2,2,2,2,2,2,2,1,0],
		[0,1,2,3,3,3,3,3,3,3,3,3,2,1,0],
		[0,1,2,3,4,4,4,4,4,4,4,3,2,1,0],
		[0,1,2,3,4,5,5,5,5,5,4,3,2,1,0],
		[0,1,2,3,4,5,6,6,6,5,4,3,2,1,0],
		[0,1,2,3,4,5,6,7,5,5,4,3,2,1,0],
		[0,1,2,3,4,5,6,6,6,5,4,3,2,1,0],
		[0,1,2,3,4,5,5,5,5,5,4,3,2,1,0],
		[0,1,2,3,4,4,4,4,4,4,4,3,2,1,0],
		[0,1,2,3,3,3,3,3,3,3,3,3,2,1,0],
		[0,1,2,2,2,2,2,2,2,2,2,2,2,1,0],
		[0,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
		[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
	]

	var getEdgeRange = function( analysisLine, analyPos, debug ) {
		var leftEdge = analyPos;
		var rightEdge = analyPos;
		var chessType = analysisLine[ analyPos ];
		var gridNum = analysisLine.length - 1;

		while( leftEdge > 0 ) {
			if( analysisLine[ leftEdge - 1 ] != chessType ) {
				break;
			}	
			leftEdge--;
		}
		
		while( rightEdge < gridNum ) {
			if( analysisLine[ rightEdge + 1 ] != chessType ) {
				break;
			}
			rightEdge++;
		}

		return {
			leftEdge: leftEdge,
			rightEdge: rightEdge
		}

	}

	var analysis = function( position, chessPos ) {
		var chessType;
		var analysisLine = [];
		var analyPos;
		var leftEdge;
		var rightEdge;
		var leftRange;
		var rightRange;
		var len;

		analysisLine = position;
		analyPos = chessPos;
		chessType = analysisLine[ analyPos ];
		gridNum = analysisLine.length - 1;

		//初始化记录存放数组
		lineRecord = [];
		for (var i = 0; i < 30; i++) {
			lineRecord[ i ] = TOBEANALSIS;	
		}

		var edges = getEdgeRange( analysisLine, analyPos );
		leftEdge = edges.leftEdge;
		rightEdge = edges.rightEdge;
		
		leftRange = leftEdge;
		rightRange = rightEdge;

		while( leftRange > 0 ) {
			if( analysisLine[ leftRange - 1 ] == ( chessType ^ 1 )  ) {
				break;
			}
			leftRange--;
		}
		
		while( rightRange < gridNum ) {
			if( analysisLine[ rightRange + 1 ] == ( chessType ^ 1 ) ) {
				break;
			}
			rightRange++;
		}
		
		//小于4(5个子)无意义
		if( rightRange - leftRange < 4 ) {
			for( var i = leftRange; i <= rightRange; i++ ) {
				lineRecord[ i ] = ANALSISED;
			}
			return;
		}		
		
		//把位置标记为已分析
		for( var i = leftEdge; i <= rightEdge; i++ ) {
			lineRecord[ i ] = ANALSISED;
		}
		
		//五连
		if( rightEdge - leftEdge > 3 ) {
			lineRecord[ analyPos ] = FIVE;
			return;
		}
		
		//四连
		if( rightEdge - leftEdge == 3 ) {
			var leftFour = false;
			if( leftEdge > 0 ) {
				if( analysisLine[ leftEdge - 1 ] == NO_CHESS ) {
					leftFour = true;
				}
			}

			if( rightEdge < gridNum ) {
				if( analysisLine[ rightEdge + 1 ] == NO_CHESS ) {
					if( leftFour ) {
						lineRecord[ analyPos ] = FOUR;
					} else {
						lineRecord[ analyPos ] = SFOUR;
					}
				} else {
					if( leftFour ) {
						lineRecord[ analyPos ] = SFOUR;
					}
				}
			} else {
				if( leftFour ) {
					lineRecord[ analyPos ] = SFOUR;
				}
			}
			return;
		}

		//三连
		if( rightEdge - leftEdge == 2 ) {
			var leftThree = false;

			if( leftEdge > 1 ) {
				if( analysisLine[ leftEdge - 1 ] == NO_CHESS ) {
					//左边隔一个空间有自己的棋
					if( analysisLine[ leftEdge - 2 ] == analysisLine[ leftEdge ] ) {
						lineRecord[ leftEdge ] = SFOUR;
						lineRecord[ leftEdge - 2 ] = ANALSISED;
					} else {
						leftThree = true;
					}
				}
			}

			if( rightEdge < gridNum ) {
				if( analysisLine[ rightEdge + 1 ] == NO_CHESS ) {
					//右边空一个空间有自己的棋
					if( rightEdge < gridNum - 1 && analysisLine[ rightEdge + 2 ] == analysisLine[ rightEdge ] ) {
						lineRecord[ rightEdge ] = SFOUR;
						lineRecord[ rightEdge + 2 ] = ANALSISED;
					} else {
						if( leftThree ) {
							lineRecord[ rightEdge ] = THREE;
						} else {
							lineRecord[ rightEdge ] = STHREE;
						}
					}
				} else {
					if( lineRecord[ leftEdge ] == SFOUR ) {
						return;
					}

					if(leftThree) {
						lineRecord[ rightEdge ] = STHREE;
					}	
				}
			} else {
				if( lineRecord[ leftEdge ] == SFOUR ) {
					return;
				}

				if( leftThree ) {
					lineRecord[ analyPos ] = STHREE;
				}
			}
			return;
		}

		//二连
		if( rightEdge - leftEdge == 1 ) {
			var leftTwo = false;
			if( leftEdge  > 2 ){ 
				if( analysisLine[ leftEdge - 1 ] == NO_CHESS ) {
					if( analysisLine[ leftEdge - 2 ] == analysisLine[ leftEdge ] ) {
						if( analysisLine[ leftEdge - 3 ] == analysisLine[ leftEdge ] ) {
							lineRecord[ leftEdge - 2 ] = ANALSISED;
							lineRecord[ leftEdge - 3 ] = ANALSISED;
							lineRecord[ leftEdge ] = SFOUR;
						} else if( analysisLine[ leftEdge - 3 ] == NO_CHESS ) {
							lineRecord[ leftEdge - 2 ] = ANALSISED;
							lineRecord[ leftEdge ] = STHREE;
						}
					} else {	
						leftTwo = true;					
					}
				}
			}

			if( rightEdge < gridNum - 2 ) {
				if( analysisLine[ rightEdge + 1 ] == NO_CHESS ) {
					if( analysisLine[ rightEdge + 2 ] == analysisLine[ rightEdge ] ) {
						if( analysisLine[ rightEdge + 3 ] == analysisLine[ rightEdge ] ) {
							lineRecord[ rightEdge + 2 ] = ANALSISED;
							lineRecord[ rightEdge + 3 ] = ANALSISED;
							lineRecord[ rightEdge ] = SFOUR;
						} else if( analysisLine[ rightEdge + 3 ] == NO_CHESS ) {
							lineRecord[ rightEdge + 2 ] = ANALSISED;
							analysisLine[ rightEdge ] = STHREE;
						}
					} else {
						if( lineRecord[ leftEdge ] == SFOUR ) {
							return;
						}	
						if( lineRecord[ leftEdge ] == STHREE ) {
							return;
						}
						if( leftTwo ) {
							lineRecord[ analyPos ] = TWO;
						} else {
							lineRecord[ analyPos ] = STWO;
 						}
					}
				} else {
					if( lineRecord[ leftEdge ] == SFOUR ) {
						return;
					}
					if( leftTwo ) {
						lineRecord[ analyPos ] = STWO;
					}
				}
			}
			return;
		} 
		return;
	}

	//横向分析
	var analysisHorizon = function( board, i, j ) {
		var array = [];

		for (var k = 0; k < board[ i ].length; k++) {
			array[ k ] = board[ i ][ k ];
		};

		analysis( array, j );  

		for( var s = 0; s < GRID_NUM; s++ ) {
			if( lineRecord[ s ] != TOBEANALSIS ) {
				typeRecord[ i ][ s ][ 0 ] = lineRecord[ s ]; 
			}  
		}
	}

	//纵向分析
	var getTopToBottom = function( board, i, j ) {
		var array = [];
		for (var s = 0; s < GRID_NUM; s++) {
			array[ s ] = board[ s ][ j ];
		};
		return { array: array };		
	}

	var analysisVertical = function( board, i, j ) {
		var result = getTopToBottom( board, i, j );
		var array = result.array;

		analysis( array, i );

		for (var k = 0; k < GRID_NUM; k++) {
			if( lineRecord[ k ] != TOBEANALSIS ) {
				typeRecord[ k ][ j ][ 1 ] = lineRecord[ k ];
			}
		};
	}

	//左上到右下分析
	var getLTToRB = function( board, i, j ) {
		var array = [];
		var x;
		var y;

		if( i < j ) {
			x = j - i;
			y = 0;
		} else {
			x = 0;
			y = i - j;
		}

		for (var k = 0; k < GRID_NUM; k++) {
			if( y + k >= GRID_NUM || x + k >= GRID_NUM ) {
				break;
			}
			array[ k ] = board[ y + k ][ x + k ];
		}

		var result = {
			array: array,
			x: x,
			y: y
		}
		return result;
	}

	var analysisLeft = function( board, i, j ) {
		var result = getLTToRB( board, i, j );
		var array = result.array;
		var x = result.x;
		var y = result.y;

		analysis( array, j - x );

	    for (var s = 0; s < array.length; s++) {
	    	if( lineRecord[ s ] != TOBEANALSIS ) {
				typeRecord[ y + s ][ x + s ][ 2 ] = lineRecord[ s ];
	    	}
	    };
	}

	//右下到右上分析
	var getLBToRT = function( board, i, j ) {
		var array = [];
		var maxIndex = GRID_NUM - 1
		var x;
		var y;

		if( maxIndex  - i < j ) {
			y = maxIndex;
			x = j - maxIndex + i;                                              
		} else {
			x = 0;
			y = i + j;
		}

		for (var s = 0; s < GRID_NUM; s++) {
			if( x + s > maxIndex || y - s < 0 ) {
				break;
			}
			array[ s ] = board[ y - s ][ x + s ];
		};

		var result = {
			array: array,
			x: x,
			y: y
		}
		return result;
	}

	var analysisRight = function( board, i, j ) {
		var result = getLBToRT( board, i, j );
		var array = result.array;
		var x = result.x;
		var y = result.y;

		analysis( array, j - x );

		for( var k = 0; k < array.length; k++ ) {
			if( lineRecord[ k ]  != TOBEANALSIS ) {
				typeRecord[ y - k ][ x + k ][ 3 ] = lineRecord[ k ];
			}
		}
	}

	this.eval = function( board, side ) {
	    testValue++;
	    resetData();

        for (var i = 0; i < GRID_NUM; i++) {
        	for (var j = 0; j < GRID_NUM; j++) {
        		if( board[ i ][ j ] == NO_CHESS ) {
        			continue;
        		}

        		if( typeRecord[ i ][ j ][ 0 ] == TOBEANALSIS ) {
        			analysisHorizon( board, i, j );
        		}

        		if( typeRecord[ i ][ j ][ 1 ] == TOBEANALSIS ) {
        			analysisVertical( board, i, j );
        		}

        		if( typeRecord[ i ][ j ][ 2 ] == TOBEANALSIS ) {
        			analysisLeft( board, i, j );
        		}

        		if( typeRecord[ i ][ j ][ 3 ] == TOBEANALSIS ) {
        			analysisRight( board, i, j );
        		}
        	};
        };

        for (var i = 0; i < GRID_NUM; i++) {
        	for (var j = 0; j < GRID_NUM; j++) {
        		for (var k = 0; k < 4; k++) {
        			var chessType = board[ i ][ j ];
                    if( chessType == NO_CHESS ) continue;
        			switch( typeRecord[ i ][ j ][ k ] ) {
        				case FIVE:
        					typeCount[ chessType ][ FIVE ]++;
        					break;
        				case FOUR:
        				    typeCount[ chessType ][ FOUR ]++;
        				    break;
        				case SFOUR:
        					typeCount[ chessType ][ SFOUR ]++;
        					break;
        				case THREE:
        					typeCount[ chessType ][ THREE ]++;
        				    break;
        				case STHREE:
        					typeCount[ chessType ][ STHREE ]++;
        					break;
        				case TWO:
        					typeCount[ chessType ][ TWO ]++;
        					break;
        				case STWO:
        					typeCount[ chessType ][ STWO ]++;
        					break;
        			}
        		};
        	};
        };


        if( typeCount[ MACHINE ][ SFOUR ] > 1 ) {
        	typeCount[ MACHINE ][ FOUR ]++;
        }

        if( typeCount[ PERSON ][ SFOUR ] > 1 ) {
        	typeCount[ PERSON ][ FOUR ]++;
        }
    	
    	if( typeCount[ MACHINE ][ FIVE ] ) {
    		//bestValue.value = 9999;
    		//return bestValue;
    		return 9999;
    	}

    	if( typeCount[ PERSON ][ FIVE ] ) {

    		return -9999;
    	}

        var machineValue = 0;
        var personValue = 0;       

        if( side == MACHINE ) {
        	//alert(1)
        	//机器走
        	if( typeCount[ MACHINE ][ FOUR ] ) {

        		return 9990;
        	}

        	if( typeCount[ MACHINE ][ SFOUR ] ) {

        		return 9980;
        	}

        	if( typeCount[ PERSON ][ FOUR ] ) {

        		return -9970;
        	}

        	if( typeCount[ PERSON ][ SFOUR ] && typeCount[ PERSON ][ THREE ] ) {

        		return -9960;
        	}

        	if( typeCount[ MACHINE ][ THREE ] && typeCount[ PERSON ][ SFOUR ] == 0 ) {

        		return 9950;
        	}

        	if( typeCount[ PERSON ][ THREE ] > 1 && typeCount[ MACHINE ][ SFOUR ] == 0 
        		&& typeCount[ MACHINE ][ THREE ] == 0 && typeCount[ MACHINE ][ STHREE ] == 0 ) {

        			return -9940;
        	}

        	if( typeCount[ MACHINE ][ THREE ] > 1 ) {
        		machineValue += 2000;
        	} else if( typeCount[ MACHINE ][ THREE ] ) {
        		machineValue += 200;
        	}

        	if( typeCount[ PERSON ][ THREE ] > 1 ) {
        		personValue += 500;
        	} else if( typeCount[ PERSON ][ THREE ] ) {
        		personValue += 100;
        	}

        	if( typeCount[ MACHINE ][ STHREE ] ) {
        		machineValue += typeCount[ MACHINE ][ STHREE ] * 10;
        	}

        	if( typeCount[ PERSON ][ STHREE ] ) {
        		personValue += typeCount[ PERSON ][ STHREE ] * 10;
        	}

        	if( typeCount[ MACHINE ][ TWO ] ) {
        	   machineValue += typeCount[ MACHINE ][ TWO ] * 4;
        	}

        	if( typeCount[ PERSON ][ TWO ] ) {
        	   personValue += typeCount[ PERSON ][ TWO ] * 4;
        	}

        	if( typeCount[ MACHINE ][ STWO ] ) {
        		machineValue += typeCount[ MACHINE ][ STWO ];
        	}

        	if( typeCount[ PERSON ][ STWO ] ) {
        		personValue += typeCount[ PERSON ][ STWO ];
        	}
        } else {
        	//alert(2)
        	if( typeCount[ PERSON ][ FOUR ] ) {

        		return -9990;
        	}

        	if( typeCount[ PERSON ][ SFOUR ] ) {

        		return -9980;
        	}

        	if( typeCount[ MACHINE ][ FOUR ] ) {

        		return 9970;
        	}

        	if( typeCount[ MACHINE ][ SFOUR ] && typeCount[ MACHINE ][ THREE ] ) {

        		return 9960;
        	}

        	if( typeCount[ PERSON ][ THREE ] && typeCount[ MACHINE ][ SFOUR ] == 0 ) {

        		return -9950;
        	}

        	if( typeCount[ MACHINE ][ THREE ] > 1 && typeCount[ PERSON ][ SFOUR ] == 0 
        		&& typeCount[ PERSON ][ THREE ] == 0 && typeCount[ PERSON ][ STHREE ] == 0 ) {

        			return 9940;
        	}


        	if( typeCount[ PERSON ][ THREE ] > 1 ) {
        		personValue += 2000;
        	} else if( typeCount[ PERSON ][ THREE ] ) {
        		personValue += 200;
        	}

        	if( typeCount[ MACHINE ][ THREE ] > 1 ) {
        		machineValue += 500;
        	} else if( typeCount[ MACHINE ][ THREE ] ) {
        		machineValue += 100;
        	}       	

        	if( typeCount[ MACHINE ][ STHREE ] ) {
        		machineValue += typeCount[ MACHINE ][ STHREE ] * 10;
        	}

        	if( typeCount[ PERSON ][ STHREE ] ) {
        		personValue += typeCount[ PERSON ][ STHREE ] * 10;
        	}

        	if( typeCount[ MACHINE ][ TWO ] ) {
        	   machineValue += typeCount[ MACHINE ][ TWO ] * 4;
        	}

        	if( typeCount[ PERSON ][ TWO ] ) {
        	   personValue += typeCount[ PERSON ][ TWO ] * 4;
        	}

        	if( typeCount[ MACHINE ][ STWO ] ) {
        		machineValue += typeCount[ MACHINE ][ STWO ];
        	}

        	if( typeCount[ PERSON ][ STWO ] ) {
        		personValue += typeCount[ PERSON ][ STWO ];
        	}     	
        }

        for (var i = 0; i < GRID_NUM; i++) {
        	for (var j = 0; j < GRID_NUM; j++) {
        		if( board[ i ][ j ] != NO_CHESS ) {
        			if( board[ i ][ j ] == PERSON ) {
        				personValue += posValue[ i ][ j ];
        			} else {
        				machineValue += posValue[ i ][ j ];
        			}
        		}
        	};
        };

        return machineValue - personValue;
	}

	this.getWinPoints = function( board, i, j ) {
		var edge;
		var leftEdge;
		var rightEdge;
		var results = [];
		var result;
		var x;
		var y;

		var array1 = board[ i ];
		edges = getEdgeRange( array1, j, 'a' );
		leftEdge = edges.leftEdge;
		rightEdge = edges.rightEdge;

		if( rightEdge - leftEdge > 3 ) {
			for (var s = leftEdge; s <= rightEdge; s++) {
				results.push( {
					x: i,
					y: s
				} )
			};
		}

		var array2 = getTopToBottom( board, i, j ).array;

		edges = getEdgeRange( array2, i );
		leftEdge = edges.leftEdge;
		rightEdge = edges.rightEdge;
		if( rightEdge - leftEdge > 3 ) {
			for (var s = leftEdge; s <= rightEdge; s++) {
				results.push( {
					x: s,
					y: j
				} )
			};
		}		

		result = getLTToRB( board, i, j );
		array3 = result.array;
		x = result.x;
		y = result.y;
		edges = getEdgeRange( array3, j - x );
		leftEdge = edges.leftEdge;
		rightEdge = edges.rightEdge;
		if( rightEdge - leftEdge > 3 ) {
			for (var s = leftEdge; s <= rightEdge; s++) {

				results.push( {
					x: y + s,
					y: x + s
				} )
			};
		}	

		result = getLBToRT( board, i, j );
		array4 = result.array;
		x = result.x;
		y = result.y;
		edges = getEdgeRange( array4, j - x );
		leftEdge = edges.leftEdge;
		rightEdge = edges.rightEdge;
		if( rightEdge - leftEdge > 3 ) {
			for (var s = leftEdge; s <= rightEdge; s++) {

				results.push( {
					x: y - s,
					y: x + s
				} )
			};
		}	

		return results;
	}	
	
	var resetData = function() {
		typeRecord = [];
		for( var i = 0; i < GRID_NUM; i++ ) {
			typeRecord.push( [] );
			for( var j = 0; j < GRID_NUM; j++ ) {
				typeRecord[ i ] .push( [] )
				for( var k = 0; k < 4; k++ ) {
					typeRecord[ i ][ j ][ k ] = TOBEANALSIS;
				}				
			}
		}

		typeCount = [ [], [] ];
		for (var i = 0; i < 20; i++) {
			typeCount[ 0 ][ i ] = 0;
			typeCount[ 1 ][ i ] = 0;
		};
	}
}

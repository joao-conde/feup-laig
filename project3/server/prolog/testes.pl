:-include('interface.pl').

testPrintIsolatedPiece(PieceNumber) :-

  piece(PieceNumber,Piece),
  printIsolatedPiece(Piece,player1).

testInsertRowBeggining(NewTable) :-

  M = [
        [1,1,1],
        [1,1,1]
      ],

  insertRowBeggining(M,NewTable,1).

testInsertColumnBeggining(NewTable) :-

  M = [
        [1,1,1],
        [1,1,1]
      ],

  insertColumnBeggining(M,NewTable,1).


testInsertBoardRowBegginingIB :-

  initialBoard(IB),
  insertBoardRowBeggining(IB,NIB),
  printFullBoard(NIB).

testInsertBoardRowBegginingB1 :-

  board1(B1),
  insertBoardRowBeggining(B1,NIB),
  printFullBoard(NIB).

testInsertBoardRowBegginingB2 :-

  board2(B2),
  insertBoardRowBeggining(B2,NIB),
  printFullBoard(NIB).

testInsertBoardRowEndB2 :-

  board2(B2),
  insertBoardRowEnd(B2,NIB),
  printFullBoard(NIB).

testInsertBoardColumnBegginingB2 :-

  board2(B2),
  insertBoardColumnBeggining(B2,NIB),
  printFullBoard(NIB).

testInsertBoardColumnEndB2 :-

  board2(B2),
  insertBoardColumnEnd(B2,NIB),
  printFullBoard(NIB).

printInitialBoard :-

  initialBoard(X),
  printFullBoard(X).

printBoard1 :-

  board1(X),
  printFullBoard(X).

printBoard2 :-

  board2(X),
  printFullBoard(X).

board1(

	[
		%row1

		[

		 [[0, 1, 1],
		  [0, 0, 1],
		  [0, 0, 1]
		 ],

		 [[0, 1, 1],
		  [0, 1, 0],
		  [1, 0, 1]
		 ]

		],

		%row2

		[

		 [[-1, -1, -1],
		  [-1, -1, -1],
		  [-1, -1, -1]
		 ],

		 [[1, 0, 1],
		  [0, 0, 0],
		  [1, 0, 1]
		 ]

		]

	]

).

board2(

	[

		%row1

		[

		 [[1, 0, 0],
		  [1, 1, 0],
		  [1, 0, 1]
		 ],

		 [[1, 0, 0],
		  [0, 1, 1],
		  [0, 1, 1]
		 ],

		 [[0, 1, 0],
		  [0, 1, 0],
		  [1, 1, 1]
		 ],

		 [[1, 0, 0],
		  [1, 0, 0],
		  [1, 0, 1]
		 ]

		],


		%row2

		[

		 [[-1, -1, -1],
		  [-1, -1, -1],
		  [-1, -1, -1]
		 ],

		 [[1, 1, 1],
		  [0, 1, 1],
		  [0, 0, 0]
		 ],

		 [[0, 0, 1],
		  [1, 1, 1],
		  [1, 0, 0]
		 ],

		 [[0, 0, 1],
		  [1, 0, 1],
		  [1, 0, 0]
		 ]

		],

		%row3

		[

		 [[1, 0, 0],
		  [0, 0, 1],
		  [1, 1, 0]
		 ],

		 [[1, 1, 1],
		  [0, 0, 1],
		  [0, 0, 0]
		 ],

		 [[0, 0, 1],
		  [1, 1, 1],
		  [1, 0, 0]
		 ],

		 [[0, 0, 1],
		  [1, 0, 1],
		  [1, 0, 0]
		 ]

		]

	]

).




testPrintPlayerPieces :-

  buildPiecesP1(PiecesP1),
  printPlayerPieces(PiecesP1,player1),

  buildPiecesP2(PiecesP2),
  printPlayerPieces(PiecesP2,player2).

testRotatePiece(Direction,Times) :-
  piece(1,Piece1),
  rotatePiece(Piece1, Piece2,Direction,Times),
  write(Piece2).

testUpdateBoardRows(Row) :-

  board2(Board2),
  updateBoardRows(Board2, UpdatedBoard,Row),
  printFullBoard(UpdatedBoard).

testUpdateBoardColumns(Column) :-

  board2(Board2),
  updateBoardColumns(Board2, UpdatedBoard,Column),
  printFullBoard(UpdatedBoard).

testGrowBoard(Row, Column) :-

  board2(Board2),
  growBoard(Board2, NewBoard, Row, Column),
  printFullBoard(NewBoard).

testPlayFirstPiece :-

  buildPiecesP1(Pieces),
  nth0(3,Pieces,Piece),
  initialBoard(InitialBoard),
  playFirstPiece(InitialBoard, CurrentBoard, Piece),
  printFullBoard(CurrentBoard).

testInterface(X,Y) :-
   write('What direction?'),
   read(X),
   nl,
   write('Number of times to rotate.'),
   read(Y),
   write(X),
   write(Y).


testInterfaceFunctionRotateUser:-

  buildPiecesP1(Pieces),
  printPlayerPieces(Pieces,player1),
  nth0(4,Pieces,Piece),
  rotatedPieceOfUser(Piece, PieceRotated),
  replaceInPosition(Pieces,NewPieces,4,PieceRotated),
  printPlayerPieces(NewPieces,player1).

testInterfaceOptions :-
  decisionRotateUser.

testPlayPiece(Row,Column) :-

  initialBoard(IB),
  buildPiecesP1(Pieces),

  printFullBoard(IB),
  printPlayerPieces(Pieces,player1),

  playFirstPiece(IB, NewBoard, Pieces, 5, NewPieces),

  printFullBoard(NewBoard),
  printPlayerPieces(NewPieces,player1),


  playPiece(NewBoard, NextBoard, Row,Column,10,NewPieces, NewPieces2),


  printFullBoard(NextBoard),
  printPlayerPieces(NewPieces2, player1).


testGetPieceFromBoard(Row,Column) :-

  board2(Board2),
  printFullBoard(Board2),
  getPieceFromBoard(Board2, Row, Column, Piece),
  printIsolatedPiece(Piece,empty).


testRetrievePattern(PieceNumber) :-

  buildPiecesP1(Pieces),
  nth0(PieceNumber,Pieces,Piece),

  retrievePiecePattern(Piece, 1,1, Pattern),

  write('Pattern: '),
  write(Pattern).

testCalculateP1ScoreInPiece(Row,Column) :-

  board2(Board),
  printFullBoard(Board),
  calculatePlayer1ScoreInPiece(Board,Row,Column,Score),
  write('Score in chosen Piece: '),nl, write(Score).


testCalculateScoreInRow(RowNumber,Player) :-

  board2(Board),
  printFullBoard(Board),

  calculateScoreInRow(Board,RowScore, RowNumber,Player),
  write('Row '), write(RowNumber), write(' score: '), write(RowScore),nl.


testCalcGS(Player) :-

  board2(Board),
  printFullBoard(Board),

  calculateGlobalScore(Board, GlobalScore,Player),
  write('Player Global Score: '), write(GlobalScore),nl.



testPrintMenu :-
  beginGame.


testValidatePiecePosition :-

  board2(Board),
  printFullBoard(Board),
  askPiecePosition(Board,Row,Column),
  write('good position: '), write(Row), write(' '), write(Column).

testAskPiece :-

  buildPiecesP1(Pieces),
  printPlayerPieces(Pieces,player1),
  askPieceNumber(Pieces,PieceNumber),
  write('Good Piece Number: '), write(PieceNumber).

testPieceRotationDir :-

  askPieceRotationDirection(Direction),
  write('good direction: '), write(Direction).

testPieceRotationTimes :-

  askPieceRotationTimes(Times),
  write('good times: '), write(Times).


testAskPieceRot :-

  buildPiecesP1(Pieces),
  printPlayerPieces(Pieces,player1),
  askPieceNumber(Pieces,PieceNumber),
  askPieceRotation(Pieces,PieceNumber,NewPieces),
  printPlayerPieces(NewPieces,player1).

testGetIntBetween(X,Y) :-

  readIntBetween(Int,X,Y,'Integer','Error'),
  write('Good'), write(Int).

testGetPatternList(Row,Column) :-

  board1(Board),
  printFullBoard(Board),

  getPieceFromBoard(Board,Row,Column,Piece),
  retrievePiecePattern(Piece,Row,Column,Pattern),

  getPatternPosList(Board,Pattern,PatternPosList),

  write(PatternPosList).


testDangerPiece(RowP,ColumnP) :-

  emptySpace(EmptySpace),
  buildPiecesP1(Pieces),
  nth0(0,Pieces,Piece),
  nth0(1,Pieces,Piece1),
  nth0(2,Pieces,Piece2),
  nth0(3,Pieces,Piece3),

  buildPiecesP2(PiecesP2),
  nth0(0,PiecesP2,PieceP2),

	MidBoard = [

    [Piece1,Piece2,Piece3],
    [EmptySpace,Piece,EmptySpace],
    [EmptySpace,PieceP2,EmptySpace]

	],

  printFullBoard(MidBoard),

  getPieceFromBoard(MidBoard,RowP,ColumnP,PieceToTest),

  checkDangerPiece(MidBoard,PieceToTest,RowP,ColumnP,player1,Row,Column),

  write('Row and Column To Play because of danger: '), write(Row), write(' '), write(Column),nl.


testDangerRow :-

  emptySpace(EmptySpace),
  buildPiecesP1(Pieces),
  nth0(0,Pieces,Piece),
  nth0(1,Pieces,Piece1),
  nth0(2,Pieces,Piece2),
  nth0(3,Pieces,Piece3),

  buildPiecesP2(PiecesP2),
  nth0(0,PiecesP2,PieceP2),

  MidBoard = [

    [Piece1,Piece2,Piece3],
    [EmptySpace,Piece,EmptySpace],
    [EmptySpace,PieceP2,EmptySpace]

  ],

  printFullBoard(MidBoard),
  nth0(1,MidBoard,Row2),

  checkDefenseRow(Row2,MidBoard,1,player1,DangerList),
  write(DangerList).

testDanger :-

  emptySpace(EmptySpace),
  buildPiecesP1(Pieces),
  nth0(0,Pieces,Piece),
  nth0(1,Pieces,Piece1),
  nth0(2,Pieces,Piece2),
  nth0(3,Pieces,Piece3),

  buildPiecesP2(PiecesP2),
  nth0(0,PiecesP2,PieceP2),

  MidBoard = [

    [Piece1,Piece2,Piece3],
    [EmptySpace,Piece,EmptySpace],
    [EmptySpace,PieceP2,EmptySpace]

  ],

  printFullBoard(MidBoard),

  checkDefense(MidBoard,MidBoard,player1,DangerList),
  write(DangerList).


testGPES(Row,Column,Player) :-

  emptySpace(EmptySpace),
  buildPiecesP1(Pieces),
  nth0(0,Pieces,Piece),
  nth0(1,Pieces,Piece1),
  nth0(2,Pieces,Piece2),
  nth0(3,Pieces,Piece3),

  buildPiecesP2(PiecesP2),
  nth0(0,PiecesP2,PieceP2),

  MidBoard = [

    [Piece1,Piece2,Piece3],
    [EmptySpace,Piece,EmptySpace],
    [EmptySpace,PieceP2,EmptySpace]

  ],

  printFullBoard(MidBoard),
  getPieceFromBoard(MidBoard,Row,Column,PieceFromBoard),

  getGoodPositionsPiece(MidBoard,PieceFromBoard,Player,Row,Column,EmptySpaces),

  write('Empty Spaces: '), write(EmptySpaces).


testGRES(Row,Player) :-

  emptySpace(EmptySpace),
  buildPiecesP1(Pieces),
  nth0(0,Pieces,Piece),
  nth0(1,Pieces,Piece1),
  nth0(2,Pieces,Piece2),
  nth0(3,Pieces,Piece3),

  buildPiecesP2(PiecesP2),
  nth0(0,PiecesP2,PieceP2),

  MidBoard = [

    [Piece1,Piece2,Piece3],
    [EmptySpace,Piece,EmptySpace],
    [EmptySpace,PieceP2,EmptySpace]

  ],

  printFullBoard(MidBoard),

  nth0(Row,MidBoard,RowToTest),
  getGoodPositionsBoardRowPieces(MidBoard,Player,RowToTest,Row,GoodPositionsList),


  write('Empty Spaces: '), write(GoodPositionsList).


testGES(Player) :-

  emptySpace(EmptySpace),
  buildPiecesP1(Pieces),
  nth0(0,Pieces,Piece),
  nth0(1,Pieces,Piece1),
  nth0(2,Pieces,Piece2),
  nth0(3,Pieces,Piece3),

  buildPiecesP2(PiecesP2),
  nth0(0,PiecesP2,PieceP2),

  MidBoard = [

    [EmptySpace,EmptySpace,EmptySpace,EmptySpace,EmptySpace],
    [EmptySpace,Piece1,Piece2,Piece3,EmptySpace],
    [EmptySpace,Piece1,Piece,Piece1,EmptySpace],
    [EmptySpace,EmptySpace,PieceP2,Piece1,EmptySpace]

  ],

  printFullBoard(MidBoard),

  getGoodPositionsBoard(MidBoard,Player,GoodPositionsList),


  write('Empty Spaces: '), write(GoodPositionsList).



testKS :-

  L = [5-[1,0],7-[6,1],1-[3,5]],
  keysort(L,S),
  write(S).


testVPR(RowNumber) :-

  emptySpace(EmptySpace),
  buildPiecesP1(Pieces),
  nth0(0,Pieces,Piece),
  nth0(1,Pieces,Piece1),
  nth0(2,Pieces,Piece2),
  nth0(3,Pieces,Piece3),

  buildPiecesP2(PiecesP2),
  nth0(0,PiecesP2,PieceP2),

  MidBoard = [

    [Piece1,Piece2,Piece3],
    [EmptySpace,Piece,EmptySpace],
    [EmptySpace,PieceP2,EmptySpace]

  ],

  printFullBoard(MidBoard),
  nth0(RowNumber,MidBoard,Row),

  getValidPositionsInRow(MidBoard,Row,RowNumber,ValidPositionsList),
  write(ValidPositionsList).


testVP :-

  emptySpace(EmptySpace),
  buildPiecesP1(Pieces),
  nth0(0,Pieces,Piece),
  nth0(1,Pieces,Piece1),
  nth0(2,Pieces,Piece2),
  nth0(3,Pieces,Piece3),

  buildPiecesP2(PiecesP2),
  nth0(0,PiecesP2,PieceP2),

  MidBoard = [

    [Piece1,Piece2,Piece3],
    [EmptySpace,Piece,EmptySpace],
    [EmptySpace,PieceP2,EmptySpace]

  ],

  printFullBoard(MidBoard),

  getAllValidPositions(MidBoard,ValidPositionsList),
  write(ValidPositionsList).


testGRP :-

  buildPiecesP1(Pieces),
  getRandomPieceNumber(Pieces,PieceNumber),
  nth0(PieceNumber,Pieces,Piece),
  printIsolatedPiece(Piece,player1).


testGESD(Player,Opponent) :-

  emptySpace(EmptySpace),
  buildPiecesP1(Pieces),
  nth0(0,Pieces,Piece),
  %nth0(1,Pieces,Piece1),
  nth0(2,Pieces,Piece2),
  nth0(3,Pieces,Piece3),

  buildPiecesP2(PiecesP2),
  nth0(0,PiecesP2,PieceP2),

  MidBoard = [

    [EmptySpace,EmptySpace,EmptySpace,EmptySpace,EmptySpace],
    [EmptySpace,PieceP2,Piece2,Piece3,EmptySpace],
    [EmptySpace,PieceP2,Piece,EmptySpace,EmptySpace],
    [EmptySpace,EmptySpace,EmptySpace,EmptySpace,EmptySpace]

  ],

  printFullBoard(MidBoard),

  getGoodPositionsBoardWithDefense(MidBoard,Player,Opponent,GoodPositionsList),
  write('Empty Spaces: '), write(GoodPositionsList).

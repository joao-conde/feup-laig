:-include('logic.pl').

printElement(X) :- X =:= 1, write(' 1 ').
printElement(X) :- X =:= -1, write('   ').
printElement(X) :- X =:= 0, write('   ').

printPlayerMark(player1) :- write(' W ').
printPlayerMark(player2) :- write(' B ').
printPlayerMark(empty) :- write('   ').

emptySpace([[-1, -1, -1],[-1, -1, -1],[-1, -1, -1]]).

printColumnNumber(NumberOfColumns) :-

  printColumnNumber(NumberOfColumns,0).

printColumnNumber(NumberOfColumns,NumberOfColumns).

printColumnNumber(NumberOfColumns,Column) :-

  write('     '),
  write(Column),
  write('     '),
  NextColumn is Column + 1,
  printColumnNumber(NumberOfColumns,NextColumn).

printInitialPieceRowSeparation(BoardRow) :-

  write('      --------- '),
  [_ | Rest] = BoardRow,
  printPieceRowSeparation(Rest).

printPieceRowSeparation([]).

printPieceRowSeparation(BoardRow) :-

	BoardRow \= [],
	[_ | Rest] = BoardRow,
	write(' --------- '),
	printPieceRowSeparation(Rest).

printFirstPieceRow([X1,X2,X3]) :-

  write('     |'),
  printElement(X1),
  printElement(X2),
  printElement(X3),
  write('|').

printPieceRow([X1,X2,X3]) :-

	write('|'),
	printElement(X1),
	printElement(X2),
	printElement(X3),
	write('|').

printFirstPieceRow2([X1,_,X3],Player,RowNumber) :-

  RowNumber < 10,

  write(RowNumber),
  write('    |'),
  printElement(X1),
  printPlayerMark(Player),
  printElement(X3),
  write('|').

printFirstPieceRow2([X1,_,X3],Player,RowNumber) :-

  RowNumber >= 10,

  write(RowNumber),
  write('   |'),
  printElement(X1),
  printPlayerMark(Player),
  printElement(X3),
  write('|').

printPieceRow2([X1,_,X3],Player) :-

  write('|'),
  printElement(X1),
  printPlayerMark(Player),
  printElement(X3),
  write('|').

printFullBoard(Board) :-

  nth0(0,Board,FirsRow),
  length(FirsRow,NumberOfColumns),
  write('   '),
  printColumnNumber(NumberOfColumns),
  nl,
  printBoard(Board,0),
  !.

printBoard([],_).

printBoard(Board,RowNumber) :-

	[Row | Rest] = Board,
	printInitialPieceRowSeparation(Row),
	nl,
	printPiecesRow1FirstPiece(Row),
	nl,
	printPiecesRow2FirstPiece(Row,RowNumber),
	nl,
	printPiecesRow3FirstPiece(Row),
	nl,
	printInitialPieceRowSeparation(Row),
	nl,
  NextRow is RowNumber + 1,
	printBoard(Rest,NextRow).

printPiecesRow1FirstPiece(BoardRow) :-

  [Piece | Rest] = BoardRow,
  [PieceRow1 | _] = Piece,
  printFirstPieceRow(PieceRow1),
  printPiecesRow1(Rest).

printPiecesRow1([]).

printPiecesRow1(BoardRow) :-

	[Piece | Rest] = BoardRow,
	[PieceRow1 | _] = Piece,
	printPieceRow(PieceRow1),
	printPiecesRow1(Rest).

printPiecesRow2FirstPiece(BoardRow,RowNumber) :-

	[Piece | Rest] = BoardRow,
	[_,PieceRow2,_] = Piece,
  playerFromPiece(Piece,Player),
	printFirstPieceRow2(PieceRow2,Player,RowNumber),
	printPiecesRow2(Rest).

printPiecesRow2([]).

printPiecesRow2(BoardRow) :-

	[Piece | Rest] = BoardRow,
	[_,PieceRow2,_] = Piece,
  playerFromPiece(Piece,Player),
	printPieceRow2(PieceRow2,Player),
	printPiecesRow2(Rest).

printPiecesRow3FirstPiece(BoardRow) :-

	[Piece | Rest] = BoardRow,
	[_,_,PieceRow3] = Piece,
	printFirstPieceRow(PieceRow3),
	printPiecesRow3(Rest).

printPiecesRow3([]).

printPiecesRow3(BoardRow) :-

	[Piece | Rest] = BoardRow,
	[_,_,PieceRow3] = Piece,
	printPieceRow(PieceRow3),
	printPiecesRow3(Rest).

printPlayerPiecesIndexSeparation(NumberOfPieces) :-
  printPlayerPiecesIndexSeparation(NumberOfPieces,0).

printPlayerPiecesIndexSeparation(NumberOfPieces,NumberOfPieces).

printPlayerPiecesIndexSeparation(NumberOfPieces,PieceNumber) :-

  write(' --------- '),
  NewNumber is PieceNumber + 1,
  printPlayerPiecesIndexSeparation(NumberOfPieces,NewNumber).

printPlayerPieceIndex(Index) :-

  Index < 10,
  write('|    '), write(Index), write('    |').

printPlayerPieceIndex(Index) :-

  Index >= 10,
  write('|   '), write(Index), write('    |').

printPlayerPiecesIndex(NumberOfPieces) :-

  printPlayerPiecesIndex(NumberOfPieces,0).

printPlayerPiecesIndex(NumberOfPieces,NumberOfPieces).

printPlayerPiecesIndex(NumberOfPieces, PieceNumber) :-

  printPlayerPieceIndex(PieceNumber),
  NextPiece is PieceNumber + 1,
  printPlayerPiecesIndex(NumberOfPieces,NextPiece).


printPlayerPieces(Pieces,Player) :-

  length(Pieces,NumberOfPieces),
  nl,
  printPlayerPiecesIndexSeparation(NumberOfPieces),nl,
  printPlayerPiecesIndex(NumberOfPieces),nl,
  printPlayerPiecesIndexSeparation(NumberOfPieces),nl,
  printPlayerPiecesFirstRow(Pieces),nl,
  printPlayerPiecesSecondRow(Pieces,Player),nl,
  printPlayerPiecesThirdRow(Pieces),nl,
  printPlayerPiecesIndexSeparation(NumberOfPieces),nl,nl.


printPlayerPiecesFirstRow([]).

printPlayerPiecesFirstRow(Pieces) :-

  [CurrentPiece|Rest] = Pieces,
  [PieceFirstRow,_,_] = CurrentPiece,
  printPieceRow(PieceFirstRow),
  printPlayerPiecesFirstRow(Rest).

printPlayerPiecesSecondRow([],_).

printPlayerPiecesSecondRow(Pieces,Player) :-

  [CurrentPiece|Rest] = Pieces,
  [_,PieceSecondRow,_] = CurrentPiece,
  printPieceRow2(PieceSecondRow,Player),
  printPlayerPiecesSecondRow(Rest,Player).

printPlayerPiecesThirdRow([]).

printPlayerPiecesThirdRow(Pieces) :-

  [CurrentPiece|Rest] = Pieces,
  [_,_,PieceThirdRow] = CurrentPiece,
  printPieceRow(PieceThirdRow),
  printPlayerPiecesThirdRow(Rest).


printIsolatedPiece([R1,R2,R3],Player) :-

  write(' ---------'),nl,
  printPieceRow(R1),nl,
  printPieceRow2(R2,Player),nl,
  printPieceRow(R3),nl,
  write(' ---------'),nl.

%menuprint

printMenuTitle :-
  write('                                  __/\\\\\\\\\\_____/\\\\\\__/\\\\\\\\\\\\\\\\\\\\\\______/\\\\\\\\\\\\\\\\\\\\\\__/\\\\\\________/\\\\\\_'),nl,
  write('                                  _\\/\\\\\\\\\\\\___\\/\\\\\\_\\/////\\\\\\///______\\/////\\\\\\///__\\/\\\\\\_______\\/\\\\\\_       '),nl,
  write('                                  _\\/\\\\\\/\\\\\\__\\/\\\\\\_____\\/\\\\\\_____________\\/\\\\\\_____\\/\\\\\\_______\\/\\\\\\_      '), nl,
  write('                                  _\\/\\\\\\//\\\\\\_\\/\\\\\\_____\\/\\\\\\_____________\\/\\\\\\_____\\/\\\\\\_______\\/\\\\\\_     '),nl,
  write('                                  _\\/\\\\\\\\//\\\\\\\\/\\\\\\_____\\/\\\\\\_____________\\/\\\\\\_____\\/\\\\\\_______\\/\\\\\\_    '),nl,
  write('                                  _\\/\\\\\\_\\//\\\\\\/\\\\\\_____\\/\\\\\\_____________\\/\\\\\\_____\\/\\\\\\_______\\/\\\\\\_   '),nl,
  write('                                  _\\/\\\\\\__\\//\\\\\\\\\\\\_____\\/\\\\\\______/\\\\\\___\\/\\\\\\_____\\//\\\\\\______/\\\\\\__  '),nl,
  write('                                  _\\/\\\\\\___\\//\\\\\\\\\\__/\\\\\\\\\\\\\\\\\\\\\\_\\//\\\\\\\\\\\\\\\\\\_______\\///\\\\\\\\\\\\\\\\\\/___ '),nl,
  write('                                  _\\///_____\\/////__\\///////////___\\/////////__________\\/////////_____'),nl,nl,
  write('                        ****************************************************************************************'),nl,
  write('                        *                                                                                      *'),nl,
  write('                        *                                                                                      *'),nl,
  write('                        *                                                                                      *'),nl,
  write('                        *                                   1 - Play New Game                                  *'),nl,
  write('                        *                                                                                      *'),nl,
  write('                        *                                                                                      *'),nl,
  write('                        *                                   2 - Rules                                          *'),nl,
  write('                        *                                                                                      *'),nl,
  write('                        *                                                                                      *'),nl,
  write('                        *                                   3 - Credits                                        *'),nl,
  write('                        *                                                                                      *'),nl,
  write('                        *                                                                                      *'),nl,
  write('                        *                                   0 - Exit                                           *'),nl,
  write('                        *                                                                                      *'),nl,
  write('                        *                                                                                      *'),nl,
  write('                        *                                                                                      *'),nl,
  write('                        ****************************************************************************************'),nl.

%printrules

printPlayMenu :-
  write('                        ****************************************************************************************'),nl,
  write('                        *                                                                                      *'),nl,
  write('                        *                                                                                      *'),nl,
  write('                        *                                                                                      *'),nl,
  write('                        *                                   1 - Human VS Human                                 *'),nl,
  write('                        *                                                                                      *'),nl,
  write('                        *                                                                                      *'),nl,
  write('                        *                                   2 - Human VS Computer Easy                         *'),nl,
  write('                        *                                                                                      *'),nl,
  write('                        *                                                                                      *'),nl,
  write('                        *                                   3 - Human VS Computer Medium                       *'),nl,
  write('                        *                                                                                      *'),nl,
  write('                        *                                                                                      *'),nl,
  write('                        *                                   4 - Human VS Computer Hard                         *'),nl,
  write('                        *                                                                                      *'),nl,
  write('                        *                                                                                      *'),nl,
  write('                        *                                   5 - Computer VS Computer                           *'),nl,
  write('                        *                                                                                      *'),nl,
  write('                        *                                                                                      *'),nl,
  write('                        *                                   0 - Go Back                                        *'),nl,
  write('                        *                                                                                      *'),nl,
  write('                        *                                                                                      *'),nl,
  write('                        *                                                                                      *'),nl,
  write('                        ****************************************************************************************'),nl.


%printCredits

printCredits :-
  write('                        ****************************************************************************************'),nl,
  write('                        *                                                                                      *'),nl,
  write('                        *                                  Game developed by:                                  *'),nl,
  write('                        *                                                                                      *'),nl,
  write('                        *                                                                                      *'),nl,
  write('                        *                                                                                      *'),nl,
  write('                        *                                -  Joao Pedro Furriel;                                *'),nl,
  write('                        *                                                                                      *'),nl,
  write('                        *                                                                                      *'),nl,
  write('                        *                                                                                      *'),nl,
  write('                        *                                  - Ventura Pereira.                                  *'),nl,
  write('                        *                                                                                      *'),nl,
  write('                        *                                                                                      *'),nl,
  write('                        *                                                                                      *'),nl,
  write('                        *                                                                                      *'),nl,
  write('                        *                                                                                      *'),nl,
  write('                        *                                                                                      *'),nl,
  write('                        *                                                                                      *'),nl,
  write('                        *                                                                                      *'), nl,
  write('                        *                                                                                      *'),nl,
  write('                        *                                                                                      *'), nl,
  write('                        *                                 Press 0 to go back !                                 *'),nl,
  write('                        ****************************************************************************************'),nl.

%printFinalScore


printWinnerPlayer(ScorePlayer1,ScorePlayer2,NamePlayer1,_) :-

  ScorePlayer1 > ScorePlayer2,

  write('                        *'),

  atom_length(NamePlayer1,LengthNamePlayer),
  Total is LengthNamePlayer + 8,
  Spaces is 86 - Total,
  LeftSpaces is div(Spaces,2),
  printNSpaces(LeftSpaces),

  write('Winner: '), write(NamePlayer1),

  Remaining is 86 - Total - LeftSpaces,
  printNSpaces(Remaining),
  write('*'),nl.


printWinnerPlayer(ScorePlayer1,ScorePlayer2,_,NamePlayer2) :-

  ScorePlayer1 < ScorePlayer2,

  write('                        *'),
  atom_length(NamePlayer2,LengthNamePlayer),
  Total is LengthNamePlayer + 8,
  Spaces is 86 - Total,
  LeftSpaces is div(Spaces,2),
  printNSpaces(LeftSpaces),
  write('Winner: '), write(NamePlayer2),
  Remaining is 86 - Total - LeftSpaces,
  printNSpaces(Remaining),
  write('*'),nl.

printWinnerPlayer(ScorePlayer,ScorePlayer,_,_) :-

  write('                        *'),
  printNSpaces(37),
  write('It Was a Tie'),
  printNSpaces(37),
  write('*'),nl.

printPlayerScore(Player,PlayerScore) :-

  write('                        *'),
  atom_length(Player,LengthNamePlayer),
  Total is LengthNamePlayer + 10,
  Spaces is 86 - Total,
  LeftSpaces is div(Spaces,2),
  printNSpaces(LeftSpaces),
  write(Player), write(': '), write(PlayerScore), write(' Points'),
  Remaining is 86 - Total - LeftSpaces,
  printNSpaces(Remaining),
  write('*'),nl.


printFinalScore(ScorePlayer1,ScorePlayer2,NamePlayer1,NamePlayer2) :-
  write('                        ****************************************************************************************'),nl,
  write('                        *                                                                                      *'),nl,
  write('                        *                                     GAME IS OVER                                     *'),nl,
  write('                        *                                                                                      *'),nl,
  write('                        *                                                                                      *'),nl,
  printWinnerPlayer(ScorePlayer1,ScorePlayer2,NamePlayer1,NamePlayer2),
  write('                        *                                                                                      *'),nl,
  write('                        *                                                                                      *'),nl,
  write('                        *                                                                                      *'),nl,
  write('                        *                                     FINAL SCORE:                                     *'),nl,
  write('                        *                                                                                      *'),nl,
  write('                        *                                                                                      *'),nl,
  printPlayerScore(NamePlayer1,ScorePlayer1),
  write('                        *                                                                                      *'),nl,
  printPlayerScore(NamePlayer2,ScorePlayer2),
  write('                        *                                                                                      *'),nl,
  write('                        *                                                                                      *'),nl,
  write('                        *                                                                                      *'),nl,
  write('                        *                                                                                      *'),nl,
  write('                        *                                                                                      *'),nl,
  write('                        *                                                                                      *'), nl,
  write('                        *                             Press 0 to go to the Menu !                              *'),nl,
  write('                        ****************************************************************************************'),nl.



printNSpaces(0).

printNSpaces(N) :-

  write(' '),
  N1 is N - 1,
  printNSpaces(N1).

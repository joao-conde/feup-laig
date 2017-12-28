:- include('utils.pl').

numberOfPieces(20).

piece(1,[[1,1,1],[0,x,1],[0,0,0]]).
piece(2,[[1,1,1],[0,x,0],[0,0,1]]).
piece(3,[[1,1,1],[0,x,0],[0,1,0]]).
piece(4,[[1,1,1],[0,x,0],[1,0,0]]).
piece(5,[[1,1,1],[1,x,0],[0,0,0]]).
piece(6,[[1,1,0],[0,x,1],[0,0,1]]).
piece(7,[[1,1,0],[0,x,1],[0,1,0]]).
piece(8,[[1,1,0],[0,x,1],[1,0,0]]).
piece(9,[[1,1,0],[1,x,1],[0,0,0]]).
piece(10,[[1,1,0],[0,x,0],[0,1,1]]).
piece(11,[[1,1,0],[0,x,0],[1,0,1]]).
piece(12,[[1,1,0],[1,x,0],[0,0,1]]).
piece(13,[[1,1,0],[0,x,0],[1,1,0]]).
piece(14,[[1,1,0],[1,x,0],[0,1,0]]).
piece(15,[[1,0,0],[0,x,1],[1,0,1]]).
piece(16,[[1,0,0],[1,x,1],[0,0,1]]).
piece(17,[[1,0,0],[0,x,1],[1,1,0]]).
piece(18,[[1,0,0],[1,x,1],[0,1,0]]).
piece(19,[[0,1,0],[1,x,1],[0,1,0]]).
piece(20,[[1,0,1],[0,x,0],[1,0,1]]).

rotatePiece(Piece,PieceRotated,l,1) :-
  pieceRotate(Piece,PieceRotated,3).

rotatePiece(Piece,PieceRotated,r,1) :-
  pieceRotate(Piece,PieceRotated,1).

rotatePiece(Piece,PieceRotated,_,2) :-
  pieceRotate(Piece,PieceRotated,2).

rotatePiece(Piece,Piece,_,N) :-
  N > 2.

rotatePiece(Piece,Piece,_,0).

pieceRotate(Piece,Piece,0).
pieceRotate(Piece, PieceRotated, N) :-
    transpose(Piece,PieceAux),
    maplist(reverse,PieceAux,PieceAux2),
    N1 is N-1,
    pieceRotate(PieceAux2,PieceRotated,N1).

buildPiecesP1(Pieces) :-
  buildPieces(player1,Pieces).

buildPiecesP2(Pieces) :-
  buildPieces(player2,Pieces).

buildPieces(Player,PiecesPlayer1) :-
  buildPieces(Player,PiecesPlayer1,[],1).

buildPieces(_,PiecesPlayer,PiecesPlayer,N) :-

  numberOfPieces(X),
  N1 is X +1,
  N1 =:= N.

buildPieces(Player, PiecesPlayer, PiecesPlayerAux, N) :-

  buildNPiece(Player,N,Piece),
  append(PiecesPlayerAux,[Piece],PiecesPlayerAux2),
  N1 is N+1,
  buildPieces(Player,PiecesPlayer,PiecesPlayerAux2,N1).

buildNPiece(Player,N,Piece) :-

  Player = player1,
  buildNPieceP1(N,Piece).

buildNPiece(Player,N,Piece) :-

  Player = player2,
  buildNPieceP2(N,Piece).

buildNPieceP1(N,Piece) :-

  piece(N,[R1,R2,R3]),
  replace(x,1,R2,R2P1),
  Piece = [R1,R2P1,R3].

buildNPieceP2(N,Piece) :-

  piece(N,[R1,R2,R3]),
  replace(x,0,R2,R2P1),
  Piece = [R1,R2P1,R3].

playerFromPiece(Piece,player1) :-

  nth0(1,Piece,R2),
  nth0(1,R2,1).

playerFromPiece(Piece,player2) :-

  nth0(1,Piece,R2),
  nth0(1,R2,0).

playerFromPiece(Piece,empty) :-

  nth0(1,Piece,R2),
  nth0(1,R2,-1).


getRandomPieceNumber(Pieces,PieceNumber) :-

  length(Pieces,NumberOfPieces),
  Max is NumberOfPieces,
  Min is 0,
  random(Min,Max,PieceNumber).

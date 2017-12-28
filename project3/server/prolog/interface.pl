:- include('print.pl').

beginGame :-
  printMenuTitle, nl,
  readIntBetween(Option,0,3,'Choose your option with a dot!','Invalid Number'),

  (
    Option =:= 1 -> playOption;
    Option =:= 2 -> printRulesOption;
    Option =:= 3 -> printCreditsOption;
    Option =:= 0 -> write('Bye')

  ).

playOption :-

  printPlayMenu, nl,
  readIntBetween(Option,0,5,'Choose your option with a dot!','Invalid Number'),

  (
    Option =:= 1 -> playOption1vs1;
    Option =:= 2 -> playOption1vsCEasy;
    Option =:= 3 -> playOption1vsCMedium;
    Option =:= 4 -> playOption1vsCHard;
    Option =:= 5 -> playOptionCvsC;
    Option =:= 0 -> beginGame

  ).


printRulesOption :-
  printRules,
  read(Option),
  (
    Option =:= 0 -> beginGame;
    printRulesMenu

  ).

printCreditsOption :-
  printCredits,
  read(Option),
  (
    Option =:= 0 -> beginGame;
    printCreditsMenu
  ).


playOption1vs1:-

  player1Name(Player1Name),
  player2Name(Player2Name),

  preplay(Player1Pieces,Player2Pieces,InitialBoard),
  startPlay(Player1Pieces, InitialBoard, Player1PiecesAFM, BoardAFM,Player1Name,Player2Name),
  playCycle(Player1PiecesAFM, Player2Pieces,BoardAFM, player2, Player1Name, Player2Name).

playOption1vsCEasy :-

  player1Name(Player1Name),
  computer1Name(Computer1Name),
  preplay(Player1Pieces,ComputerPieces,InitialBoard),
  startPlay(Player1Pieces, InitialBoard, Player1PiecesAFM, BoardAFM,Player1Name,Computer1Name),
  playCycle1vsComp(Player1PiecesAFM, ComputerPieces,BoardAFM, player2, easy,Player1Name,Computer1Name).

playOption1vsCMedium :-
  player1Name(Player1Name),
  computer1Name(Computer1Name),
  preplay(Player1Pieces,ComputerPieces,InitialBoard),
  startPlay(Player1Pieces, InitialBoard, Player1PiecesAFM, BoardAFM,Player1Name,Computer1Name),
  playCycle1vsComp(Player1PiecesAFM, ComputerPieces,BoardAFM, player2, medium,Player1Name,Computer1Name).

playOption1vsCHard :-
  player1Name(Player1Name),
  computer2Name(Computer1Name),
  preplay(Player1Pieces,ComputerPieces,InitialBoard),
  startPlay(Player1Pieces, InitialBoard, Player1PiecesAFM, BoardAFM,Player1Name,Computer1Name),
  playCycle1vsComp(Player1PiecesAFM, ComputerPieces,BoardAFM, player2, hard,Player1Name,Computer1Name).

playOptionCvsC :-
  computer1Name(Computer1Name),
  computer2Name(Computer2Name),
  preplay(Computer1Pieces,Computer2Pieces,InitialBoard),
  startPlayComputer(Computer1Pieces, InitialBoard, Computer1PiecesAFM, BoardAFM,Computer1Name,Computer2Name),
  nl, write('Press Enter So The Computer Can Play!'),nl,
  get_char(_),
  playCycleCvsC(Computer1PiecesAFM, Computer2Pieces,BoardAFM, player2,Computer1Name,Computer2Name).

chooseFinalMessage(GlobalScorePlayer1,GlobalScorePlayer2,Player1Name,Player2Name) :-

  printFinalScore(GlobalScorePlayer1,GlobalScorePlayer2, Player1Name,Player2Name),
  readIntBetween(_,0,0,'Go back?','Invalid Number'),
  beginGame.

playCycle([],[],FinalBoard,_,Player1Name,Player2Name) :-

  printFullBoard(FinalBoard),

  calculateGlobalScore(FinalBoard,GlobalScorePlayer1,player1),
  calculateGlobalScore(FinalBoard,GlobalScorePlayer2,player2),
  chooseFinalMessage(GlobalScorePlayer1,GlobalScorePlayer2,Player1Name,Player2Name).

playCycle(PiecesPlayer1, PiecesPlayer2, CurrentBoard, CurrentPlayer,Player1Name,Player2Name) :-


  play(PiecesPlayer1, PiecesPlayer2, CurrentBoard, NewPiecesPlayer1, NewPiecesPlayer2, NextBoard, CurrentPlayer, NextPlayer,Player1Name,Player2Name),
  calculateGlobalScore(NextBoard,GlobalScore1,player1),
  calculateGlobalScore(NextBoard,GlobalScore2,player2),
  nl,write('Current Score:'),nl,
  write(Player1Name), write(': '), write(GlobalScore1),nl,
  write(Player2Name), write(': '), write(GlobalScore2),nl,nl,
  playCycle(NewPiecesPlayer1,NewPiecesPlayer2, NextBoard, NextPlayer,Player1Name,Player2Name).

playCycle1vsComp([],[],FinalBoard,_,_,Player1Name,Computer1Name) :-

  printFullBoard(FinalBoard),
  calculateGlobalScore(FinalBoard,GlobalScorePlayer1,player1),
  calculateGlobalScore(FinalBoard,GlobalScorePlayer2,player2),
  chooseFinalMessage(GlobalScorePlayer1,GlobalScorePlayer2,Player1Name,Computer1Name).

playCycle1vsComp(PiecesPlayer1,PiecesComputer,CurrentBoard,CurrentPlayer,Level,Player1Name,Computer1Name) :-


  play1VSComp(PiecesPlayer1, PiecesComputer, CurrentBoard, NewPiecesPlayer1, NewPiecesComputer, NextBoard, CurrentPlayer, NextPlayer,Level,Player1Name,Computer1Name),
  calculateGlobalScore(NextBoard,GlobalScore1,player1),
  calculateGlobalScore(NextBoard,GlobalScore2,player2),
  nl,write('Current Score:'),nl,
  write(Player1Name), write(': '), write(GlobalScore1),nl,
  write(Computer1Name), write(': '), write(GlobalScore2),nl,nl,
  playCycle1vsComp(NewPiecesPlayer1,NewPiecesComputer,NextBoard,NextPlayer,Level,Player1Name,Computer1Name).

playCycleCvsC([],[],FinalBoard,_,Computer1Name,Computer2Name) :-

  printFullBoard(FinalBoard),
  calculateGlobalScore(FinalBoard,GlobalScorePlayer1,player1),
  calculateGlobalScore(FinalBoard,GlobalScorePlayer2,player2),
  chooseFinalMessage(GlobalScorePlayer1,GlobalScorePlayer2,Computer1Name,Computer2Name).

playCycleCvsC(PiecesComputer1,PiecesComputer2,CurrentBoard,CurrentPlayer,Computer1Name,Computer2Name) :-

  playCompVSComp(PiecesComputer1,PiecesComputer2,CurrentBoard,NewPiecesComputer1,NewPiecesComputer2,NextBoard,CurrentPlayer,NextPlayer,Computer1Name,Computer2Name),
  nl, write('Press Enter So The Computer Can Play!'),nl,
  get_char(_),
  calculateGlobalScore(NextBoard,GlobalScore1,player1),
  calculateGlobalScore(NextBoard,GlobalScore2,player2),
  nl,write('Current Score:'),nl,
  write(Computer1Name), write(': '), write(GlobalScore1),nl,
  write(Computer2Name), write(': '), write(GlobalScore2),nl,nl,
  playCycleCvsC(NewPiecesComputer1,NewPiecesComputer2,NextBoard,NextPlayer,Computer1Name,Computer2Name).

preplay(PiecesPlayer1, PiecesPlayer2, InitialBoard) :-

  buildPiecesP1(PiecesPlayer1),
  buildPiecesP2(PiecesPlayer2),
  initialBoard(InitialBoard).

startPlay(PiecesPlayer1, InitialBoard, NewPiecesPlayer1, NextBoard, Player1Name,Player2Name) :-

  nl,write('Ok, Game On!!!!'),nl,
  write(Player1Name), write(' Against '),write(Player2Name),write('!!!!!'),nl,

  printFullBoard(InitialBoard),

  nl,write('It\'s '), write(Player1Name), write(' turn. Available Pieces:'),nl,

  printPlayerPieces(PiecesPlayer1,player1),
  askPieceNumber(PiecesPlayer1,FirstPieceNumber),
  askPieceRotation(PiecesPlayer1,FirstPieceNumber,Player1PiecesAR),
  playFirstPiece(InitialBoard, NextBoard, Player1PiecesAR, FirstPieceNumber, NewPiecesPlayer1).

startPlayComputer(PiecesComputer1,InitialBoard,NewPiecesComputer1,NextBoard,Computer1Name,Computer2Name) :-

  nl,write('Ok, Game On!!!!'),nl,
  write(Computer1Name), write(' Against '),write(Computer2Name),write('!!!!!'),nl,

  printFullBoard(InitialBoard),
  printPlayerPieces(PiecesComputer1,player1),
  askPieceNumberComputer(PiecesComputer1,PieceNumber),
  askPieceRotationComputer(PiecesComputer1,PieceNumber,PiecesComputer1AR),
  playFirstPiece(InitialBoard, NextBoard, PiecesComputer1AR, PieceNumber, NewPiecesComputer1).

playCompVSComp(PiecesComputer1, PiecesComputer2, Board, NewPiecesComputer1, PiecesComputer2, NextBoard, player1, player2,Computer1Name,_) :-

  printFullBoard(Board),
  nl,write('It\'s '), write(Computer1Name), write(' turn. Available Pieces:'),nl,
  printPlayerPieces(PiecesComputer1,player1),
  askPieceNumberComputer(PiecesComputer1,PieceNumber),
  askPieceRotationComputer(PiecesComputer1,PieceNumber,PiecesComputer1AR),
  askPiecePositionComputer(Board,Row,Column,medium,player1,player2),
  playPiece(Board, NextBoard, Row, Column, PieceNumber, PiecesComputer1AR, NewPiecesComputer1).

playCompVSComp(PiecesComputer1, PiecesComputer2, Board, PiecesComputer1, NewPiecesComputer2, NextBoard, player2, player1,_,Computer2Name) :-

  printFullBoard(Board),
  nl,write('It\'s '), write(Computer2Name), write(' turn. Available Pieces:'),nl,
  printPlayerPieces(PiecesComputer2,player2),
  askPieceNumberComputer(PiecesComputer2,PieceNumber),
  askPieceRotationComputer(PiecesComputer2,PieceNumber,PiecesComputer2AR),
  askPiecePositionComputer(Board,Row,Column,medium,player2,player1),
  playPiece(Board, NextBoard, Row, Column, PieceNumber, PiecesComputer2AR, NewPiecesComputer2).

play(PiecesPlayer1, PiecesPlayer2, Board, NewPiecesPlayer1, PiecesPlayer2, NextBoard, player1, player2,Player1Name,_) :-

  printFullBoard(Board),

  nl,write('It\'s '), write(Player1Name), write(' turn. Available Pieces:'),nl,

  printPlayerPieces(PiecesPlayer1,player1),

  askPieceNumber(PiecesPlayer1,PieceNumber),
  askPieceRotation(PiecesPlayer1,PieceNumber,Player1PiecesAR),
  askPiecePosition(Board,Row,Column),
  playPiece(Board, NextBoard, Row, Column, PieceNumber, Player1PiecesAR, NewPiecesPlayer1).

play(PiecesPlayer1, PiecesPlayer2, Board, PiecesPlayer1, NewPiecesPlayer2, NextBoard, player2, player1,_,Player2Name) :-

  printFullBoard(Board),

  nl, write('It\'s '), write(Player2Name), write(' turn. Available Pieces:'),nl,

  printPlayerPieces(PiecesPlayer2,player2),
  askPieceNumber(PiecesPlayer2,PieceNumber),
  askPieceRotation(PiecesPlayer2,PieceNumber,Player2PiecesAR),
  askPiecePosition(Board,Row,Column),
  playPiece(Board, NextBoard, Row, Column, PieceNumber, Player2PiecesAR, NewPiecesPlayer2).

play1VSComp(PiecesPlayer1, PiecesComputer, Board, NewPiecesPlayer1, PiecesComputer, NextBoard, player1, player2,_,Player1Name,_) :-

  printFullBoard(Board),
  nl,write('It\'s '), write(Player1Name), write(' turn. Available Pieces:'),nl,
  printPlayerPieces(PiecesPlayer1,player1),
  askPieceNumber(PiecesPlayer1,PieceNumber),
  askPieceRotation(PiecesPlayer1,PieceNumber,Player1PiecesAR),
  askPiecePosition(Board,Row,Column),
  playPiece(Board, NextBoard, Row, Column, PieceNumber, Player1PiecesAR, NewPiecesPlayer1).

play1VSComp(PiecesPlayer1, PiecesComputer, Board, PiecesPlayer1, NewPiecesComputer, NextBoard, player2, player1,Level,_,Computer1Name) :-

  printFullBoard(Board),
  nl,write('It\'s '), write(Computer1Name), write(' turn. Available Pieces:'),nl,
  printPlayerPieces(PiecesComputer,player2),
  askPieceNumberComputer(PiecesComputer,PieceNumber),
  askPieceRotationComputer(PiecesComputer,PieceNumber,PiecesComputerAR),
  askPiecePositionComputer(Board,Row,Column,Level,player2,player1),
  playPiece(Board, NextBoard, Row, Column, PieceNumber, PiecesComputerAR, NewPiecesComputer).

askPieceRotation(Pieces,PieceNumber,NewPieces) :-

  askPieceRotationDirection(Direction),
  askPieceRotationTimes(Times),
  rotatePlayerPiece(Pieces,PieceNumber,Direction,Times,NewPieces),
  !.

askPieceRotationTimes(Times) :-

  readInt(Times,'Choose Rotation Times','Invalid Number'),
  Times < 3,
  Times > -1.

askPieceRotationTimes(Times) :-
  write('Invalid Number of Times (Choose between 0 and 2)'),
  askPieceRotationTimes(Times).

askPieceRotationDirection(Direction) :-
  readChar(Direction,'Choose Rotation Direction', 'Invalid Direction'),
  (Direction = l; Direction = r).

askPieceRotationDirection(Direction) :-
  write('Invalid Direction'),
  askPieceRotationDirection(Direction).

askPiecePosition(Board, Row, Column) :-

  readInt(Row,'Insert Row Number','Invalid Row'),
  readInt(Column,'Insert Column Number','Invalid Column'),
  validPlay(Board,Row,Column).

askPiecePosition(Board,Row,Column) :-

  write('Invalid Position'),nl,
  askPiecePosition(Board,Row,Column).

askPieceNumber(Pieces,PieceNumber) :-

  readInt(PieceNumber,'Please select piece to play', 'Invalid Piece Number'),
  nth0(PieceNumber,Pieces,_).

askPieceNumber(Pieces,PieceNumber) :-

  write('Invalid Piece Index: '),nl,
  askPieceNumber(Pieces,PieceNumber).

askPieceNumberComputer(Pieces,PieceNumber) :-
  getRandomPieceNumber(Pieces,PieceNumber).

askPieceRotationComputer(Pieces,PieceNumber,NewPieces) :-

  random(0,2,RandomDir),
  randomPieceRotation(RandomDir,Direction),
  random(0,3,Times),
  rotatePlayerPiece(Pieces,PieceNumber,Direction,Times,NewPieces),
  !.

askPiecePositionComputer(Board,Row,Column,hard,Player,Opponent) :-

  getGoodPositionsBoardWithDefense(Board,Player,Opponent,GoodPositionsList),
  nth0(0,GoodPositionsList,[Row,Column]).

askPiecePositionComputer(Board,Row,Column,medium,Player,Opponent) :-

  getGoodPositionsBoard(Board,Player,AttackList),
  getGoodPositionsBoardWithDefense(Board,Player,Opponent,DefenseList),
  random(Random),
  getRandomElementAttackDefense(AttackList,DefenseList,Row,Column,Random).


askPiecePositionComputer(Board,Row,Column,easy,_,_) :-

  getAllValidPositions(Board,ValidPositionsList),
  length(ValidPositionsList,NumberOfValidPositions),
  random(0,NumberOfValidPositions,PositionToPlay),
  nth0(PositionToPlay,ValidPositionsList,[Row,Column]).


rotatePlayerPiece(Pieces,PieceNumber, Direction, Times, NewPieces) :-

  nth0(PieceNumber,Pieces,Piece),
  rotatePiece(Piece,PieceRotated,Direction,Times),
  replaceInPosition(Pieces,NewPieces,PieceNumber,PieceRotated).

randomPieceRotation(0,l).
randomPieceRotation(1,r).


getRandomElementAttackDefense(_, DefenseList, Row, Column, Random) :-

  defensePercentage(DefensePercentage),
  Random < DefensePercentage,
  nth0(0,DefenseList,[Row,Column]).

getRandomElementAttackDefense(AttackList, _, Row, Column, Random) :-

  defensePercentage(DefensePercentage),
  Random >= DefensePercentage,
  nth0(0,AttackList,[Row,Column]).


getPlayerName(PlayerName) :-

  read(PlayerNameCods),
  atom_codes(PlayerName,PlayerNameCods).

player1Name(Player1Name) :-

  write('Please Enter Player 1 Name: '),
  getPlayerName(Player1Name).

player2Name(Player2Name) :-

  write('Please Enter Player 2 Name: '),
  getPlayerName(Player2Name).

computer1Name('Neo').
computer2Name('Rachael').

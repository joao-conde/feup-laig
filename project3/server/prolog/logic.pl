:-include('pieces.pl').

defensePercentage(0.3).

initialBoard(InitialBoard) :-

  emptySpace(EmptySpace),

	InitialBoard = [

    [EmptySpace,EmptySpace,EmptySpace],
    [EmptySpace,EmptySpace,EmptySpace],
    [EmptySpace,EmptySpace,EmptySpace]

	].

insertBoardRowBeggining(Board,NewBoard) :-

  emptySpace(EmptySpace),
  insertRowBeggining(Board,NewBoard,EmptySpace).

insertBoardRowEnd(Board,NewBoard) :-

  emptySpace(EmptySpace),
  insertRowEnd(Board,NewBoard,EmptySpace).

insertBoardColumnBeggining(Board,NewBoard) :-

  emptySpace(EmptySpace),
  insertColumnBeggining(Board,NewBoard,EmptySpace).

insertBoardColumnEnd(Board,NewBoard) :-

  emptySpace(EmptySpace),
  insertColumnEnd(Board,NewBoard,EmptySpace).

updateBoardRows(CurrentBoard, GrownBoard, 0) :-

  insertBoardRowBeggining(CurrentBoard, GrownBoard).

updateBoardRows(CurrentBoard, CurrentBoard, Row) :-

  length(CurrentBoard, NumberOfRows),
  LastRow is NumberOfRows - 1,
  Row =\= LastRow.

updateBoardRows(CurrentBoard, GrownBoard, Row) :-

  NumberOfRows is Row + 1,
  length(CurrentBoard, NumberOfRows),
  insertBoardRowEnd(CurrentBoard, GrownBoard).

updateBoardColumns(CurrentBoard, GrownBoard, 0) :-

  insertBoardColumnBeggining(CurrentBoard, GrownBoard).

updateBoardColumns(CurrentBoard, CurrentBoard, Column) :-

  [FirstRow|_] = CurrentBoard,
  length(FirstRow, NumberOfColumns),
  LastColumn is NumberOfColumns - 1,
  Column =\= LastColumn.

updateBoardColumns(CurrentBoard, GrownBoard, Column) :-

  [FirstRow|_] = CurrentBoard,
  NumberOfColumns is Column+1,
  length(FirstRow,NumberOfColumns),
  insertBoardColumnEnd(CurrentBoard, GrownBoard).

growBoard(CurrentBoard, GrownBoard, Row, Column) :-

  updateBoardRows(CurrentBoard, GrownBoardRows, Row),
  updateBoardColumns(GrownBoardRows, GrownBoard, Column).

getPieceFromBoard(Board, Row, Column, Piece) :-

  getMatrixElement(Board, Piece, Row, Column).

getPieceFromBoard(Board, Row, Column, EmptySpace) :-

  \+ getMatrixElement(Board, EmptySpace, Row, Column),
  emptySpace(EmptySpace).

playFirstPiece(InitialBoard, CurrentBoard, Pieces, PieceNumber, NewPieces) :-

  nth0(PieceNumber,Pieces,Piece),
  replaceMatrixElement(InitialBoard, CurrentBoard, 1, 1, Piece),
  remove(Piece,Pieces,NewPieces).

playPiece(Board, NewBoard, Row, Column, PieceNumber, Pieces, NewPieces) :-

  nth0(PieceNumber,Pieces,Piece),
  replaceMatrixElement(Board, BoardWithPiece, Row, Column, Piece),
  growBoard(BoardWithPiece, NewBoard, Row, Column),
  remove(Piece,Pieces,NewPieces).

playPiece(Board,Board, Row, Column, _, Pieces, Pieces) :-

  \+ validPlay(Board,Row,Column),
  nl, write('invalid play'), nl.

validPlay(Board, Row, Column) :-

  getMatrixElement(Board, Element, Row, Column),
  emptySpace(EmptySpace),
  EmptySpace == Element,

  UpRow is Row - 1,
  DownRow is Row + 1,
  RightColumn is Column + 1,
  LeftColumn is Column - 1,

  getPieceFromBoard(Board, UpRow, Column, ElementUp),
  getPieceFromBoard(Board, DownRow, Column, ElementDown),
  getPieceFromBoard(Board, Row, RightColumn, ElementRight),
  getPieceFromBoard(Board, Row, LeftColumn, ElementLeft),

  (ElementUp \= EmptySpace ; ElementDown \= EmptySpace ; ElementLeft \= EmptySpace ; ElementRight \= EmptySpace).

retrievePiecePattern(Piece, _, _, _, []) :-

  [[-1|_]|_] = Piece.

retrievePiecePattern(Piece, Row, Column, Pattern) :-

  replaceMatrixElement(Piece, NeutralPiece, 1, 1, 0),

  [R1,R2,R3] = NeutralPiece,

  LeftColumn is Column - 1,
  RowNorth is Row - 1,
  RowSouth is Row + 1,

  parsePieceRow(R1,R1Pattern, [], RowNorth, LeftColumn),
  parsePieceRow(R2,R2Pattern, [], Row, LeftColumn),
  parsePieceRow(R3,R3Pattern, [], RowSouth, LeftColumn),
  append(R1Pattern, R2Pattern, RAux),
  append(RAux, R3Pattern, Pattern).

parsePieceRow([],List, List,_,_).

parsePieceRow(Row, List, ListAux, RowNumber, ColumNumber) :-

  [1| Rest] = Row,
  append(ListAux,[RowNumber,ColumNumber], ListAux2),

  NewColumnNumber is ColumNumber + 1,
  parsePieceRow(Rest,List,ListAux2,RowNumber,NewColumnNumber).

parsePieceRow(Row,List, ListAux, RowNumber,ColumNumber) :-

  [0| Rest] = Row,
  NewColumnNumber is ColumNumber + 1,
  parsePieceRow(Rest,List, ListAux,RowNumber, NewColumnNumber).

calculatePlayerScoreInPiece(Board,Row,Column,Score,Player) :-

  playerScoreInPiece(Board,Row,Column,Score,Player).

playerScoreInPiece(Board, Row, Column, 1,Player) :-

  playerGoodPiece(Board,Row,Column,Player).

playerScoreInPiece(Board, Row, Column, 0,Player) :-

  \+ playerGoodPiece(Board,Row,Column,Player).

playerGoodPiece(Board, Row, Column,Player) :-

  getPieceFromBoard(Board,Row,Column, Piece),

  retrievePiecePattern(Piece, Row, Column, PiecePattern),

  [RowPiece1,ColumnPiece1,RowPiece2,ColumnPiece2,RowPiece3,ColumnPiece3,RowPiece4,ColumnPiece4] = PiecePattern,

  getPieceFromBoard(Board, RowPiece1, ColumnPiece1, Piece1),
  getPieceFromBoard(Board, RowPiece2, ColumnPiece2, Piece2),
  getPieceFromBoard(Board, RowPiece3, ColumnPiece3, Piece3),
  getPieceFromBoard(Board, RowPiece4, ColumnPiece4, Piece4),

  playerFromPiece(Piece1,Player),
  playerFromPiece(Piece2,Player),
  playerFromPiece(Piece3,Player),
  playerFromPiece(Piece4,Player).

calculateScoreInRow(Board,RowScore,RowNumber,Player) :-

  [FirstRow|_] = Board,
  length(FirstRow, NumberOfColumns),
  calculateScoreInRow(Board,RowScore,RowNumber, 0, 0, NumberOfColumns,Player).

calculateScoreInRow(_,RowScore,_,RowScore,NumberOfColumns,NumberOfColumns,_).

calculateScoreInRow(Board,RowScore,RowNumber, ScoreAcc,ColumnNumber,NumberOfColumns,Player) :-

  calculatePlayerScoreInPiece(Board,RowNumber,ColumnNumber,CurrentScore,Player),
  NewScore is ScoreAcc + CurrentScore,
  NextColumn is ColumnNumber + 1,
  calculateScoreInRow(Board, RowScore, RowNumber, NewScore, NextColumn, NumberOfColumns,Player).

calculateGlobalScore(Board,GlobalScore,Player) :-

  length(Board,NumberOfRows),
  calculateGlobalScore(Board,GlobalScore,0,0,NumberOfRows,Player).

calculateGlobalScore(_,GlobalScore, GlobalScore, NumberOfRows, NumberOfRows,_).

calculateGlobalScore(Board,GlobalScore, ScoreAux, RowNumber, NumberOfRows,Player) :-

  calculateScoreInRow(Board, RowScore, RowNumber,Player),
  CurrentScore is ScoreAux + RowScore,
  NextRow is RowNumber + 1,
  calculateGlobalScore(Board,GlobalScore,CurrentScore,NextRow,NumberOfRows,Player).

getPatternPosList(Board,Pattern,PatternPosList) :-
  getPatternPosList(Board,Pattern,PatternPosList,[]).

getPatternPosList(_,[],PatternPosList,PatternPosList).

getPatternPosList(Board,Pattern,PatternPosList,AuxList) :-

  [RowP,ColumnP|Rest] = Pattern,
  getPieceFromBoard(Board,RowP,ColumnP,Piece),
  playerFromPiece(Piece,PlayerPiece),
  append(AuxList,[PlayerPiece,RowP,ColumnP],AuxList2),
  getPatternPosList(Board,Rest,PatternPosList,AuxList2).

checkDangerPiece(Board,Piece,PieceRow,PieceColumn,OpponentPlayer,Row,Column) :-

  retrievePiecePattern(Piece,PieceRow,PieceColumn,Pattern),
  getPatternPosList(Board,Pattern,PatternPosList),
  countElementInList(PatternPosList,empty,1),
  [PlayerPos1,Pos1Row,Pos1Column,PlayerPos2,Pos2Row,Pos2Column,PlayerPos3,Pos3Row,Pos3Column,PlayerPos4,Pos4Row,Pos4Column] = PatternPosList,

  (

    PlayerPos1 = empty, PlayerPos2 = OpponentPlayer, PlayerPos3 = OpponentPlayer, PlayerPos4 = OpponentPlayer, Row = Pos1Row, Column = Pos1Column;
    PlayerPos2 = empty, PlayerPos1 = OpponentPlayer, PlayerPos3 = OpponentPlayer, PlayerPos4 = OpponentPlayer, Row = Pos2Row, Column = Pos2Column;
    PlayerPos3 = empty, PlayerPos2 = OpponentPlayer, PlayerPos1 = OpponentPlayer, PlayerPos4 = OpponentPlayer, Row = Pos3Row, Column = Pos3Column;
    PlayerPos4 = empty, PlayerPos2 = OpponentPlayer, PlayerPos3 = OpponentPlayer, PlayerPos1 = OpponentPlayer, Row = Pos4Row, Column = Pos4Column

  ).

checkDangerPiece(_,_,_,_,_,-1,-1).

checkDefenseRow(PiecesRow,Board,PieceRow,Opponent,DangerList) :-

  length(PiecesRow,NumberOfColumns),
  checkDefenseRow(PiecesRow,Board,PieceRow,NumberOfColumns,0,Opponent,DangerList,[]).

checkDefenseRow([],_,_,Col,Col,_,DangerList,DangerList).

checkDefenseRow(PiecesRow,Board,PieceRow,PieceColumns,PieceColumnAux,Opponent,DangerList,DangerListAux) :-

  [Piece|Rest] = PiecesRow, playerFromPiece(Piece,Opponent),
  checkDangerPiece(Board,Piece,PieceRow,PieceColumnAux,Opponent,RowD,ColumnD),
  RowD =\= -1,
  ColumnD =\= -1,
  append(DangerListAux, [[RowD,ColumnD]], DangerListAux2),
  NewCol is PieceColumnAux + 1,
  checkDefenseRow(Rest,Board,PieceRow,PieceColumns,NewCol,Opponent,DangerList,DangerListAux2).

checkDefenseRow(PiecesRow,Board,PieceRow,PieceColumns,PieceColumnAux,Opponent,DangerList,DangerListAux) :-

  [_|Rest] = PiecesRow,
  NewCol is PieceColumnAux + 1,
  checkDefenseRow(Rest,Board,PieceRow,PieceColumns,NewCol,Opponent,DangerList,DangerListAux).

checkDefense(Board,Opponent,DangerList) :-

  length(Board,NumberOfRows),
  checkDefense(Board,Board,Opponent,NumberOfRows,0,DangerList,[]).

checkDefense(Board, Rows, Opponent, NumberOfRows, CurrentRow, DangerList, DangerListAux) :-

  [Row|Rest] = Rows,
  checkDefenseRow(Row,Board,CurrentRow,Opponent,DangerListRow),
  append(DangerListAux,DangerListRow,DangerListAux2),
  NextRow is CurrentRow + 1,
  checkDefense(Board,Rest,Opponent,NumberOfRows,NextRow,DangerList,DangerListAux2).

checkDefense(_,[],_,NumberOfRows,NumberOfRows,DangerList,DangerList).


getGoodPositionsBoardWithDefense(Board,_,Opponent,GoodPositionsList) :-

  checkDefense(Board,Opponent,GoodPositionsListWithInvalids),
  GoodPositionsListWithInvalids \= [],
  removeInvalidPositions(GoodPositionsListWithInvalids,Board,GoodPositionsList).

getGoodPositionsBoardWithDefense(Board,Player,_,GoodPositionsList) :-

  getGoodPositionsBoard(Board,Player,GoodPositionsList).

removeInvalidPositions(PositionsList,Board,PositionsFiltered) :-
  removeInvalidPositions(PositionsList,Board,PositionsFiltered,[]).

removeInvalidPositions([],_,PositionsFiltered,PositionsFiltered).

removeInvalidPositions(PositionsList,Board,PositionsFiltered,PositionsFilteredAux) :-

  [[Row,Column]|Rest] = PositionsList,
  \+ validPlay(Board,Row,Column),
  removeInvalidPositions(Rest,Board,PositionsFiltered,PositionsFilteredAux).

removeInvalidPositions(PositionsList,Board,PositionsFiltered,PositionsFilteredAux) :-

  [[Row,Column]|Rest] = PositionsList,
  validPlay(Board,Row,Column),
  append(PositionsFilteredAux,[[Row,Column]], PositionsFilteredAux2),
  removeInvalidPositions(Rest,Board,PositionsFiltered,PositionsFilteredAux2).


verifyGoodPositionEmpty(GoodPositionsList,GoodPositionsList,_) :-
  GoodPositionsList \= [].

verifyGoodPositionEmpty([],GoodPositionsList,Board) :-
  getAllValidPositions(Board,GoodPositionsList).

getGoodPositionsBoard(Board,Player,GoodPositionsList) :-

  getGoodPositionsBoard(Board,Board,Player,0,GoodPositionsListWithPriority,[]),
  keysort(GoodPositionsListWithPriority,GoodPositionsListWithPrioritySorted),
  removePriorityBeforeEmptySpace(GoodPositionsListWithPrioritySorted,GoodPositionsListPossibleEmpty),
  verifyGoodPositionEmpty(GoodPositionsListPossibleEmpty,GoodPositionsListWithInvalids,Board),
  removeInvalidPositions(GoodPositionsListWithInvalids,Board,GoodPositionsList).

getGoodPositionsBoard(_,[],_,_,GoodPositionsList,GoodPositionsList).

getGoodPositionsBoard(Board,Rows,Player, CurrentRow, GoodPositionsList, GoodPositionsListAux) :-

  [Row|Rest] = Rows,
  getGoodPositionsBoardRowPieces(Board,Player,Row,CurrentRow,GoodPositionsListRow),
  append(GoodPositionsListAux,GoodPositionsListRow,GoodPositionsListAux2),
  NextRow is CurrentRow + 1,
  getGoodPositionsBoard(Board,Rest,Player,NextRow, GoodPositionsList, GoodPositionsListAux2).

getGoodPositionsBoardRowPieces(Board,Player,Row,RowNumber,GoodPositionsList) :-

  getGoodPositionsBoardRowPieces(Board,Player,Row,RowNumber,0,GoodPositionsList,[]).

getGoodPositionsBoardRowPieces(_,_,[],_,_,GoodPositionsList,GoodPositionsList).

getGoodPositionsBoardRowPieces(Board,Player,Row,RowNumber,CurrentColumn,GoodPositionsList,GoodPositionsListAux) :-

  [Piece|Rest] = Row,
  playerFromPiece(Piece,Player),
  getGoodPositionsPiece(Board,Piece,Player,RowNumber,CurrentColumn,GoodPositionsCurrentPiece),
  append(GoodPositionsListAux,GoodPositionsCurrentPiece,GoodPositionsListAux2),
  NextColumn is CurrentColumn + 1,
  getGoodPositionsBoardRowPieces(Board,Player,Rest,RowNumber,NextColumn,GoodPositionsList, GoodPositionsListAux2).

getGoodPositionsBoardRowPieces(Board,Player,Row,RowNumber,CurrentColumn,GoodPositionsList,GoodPositionsListAux) :-

  [_|Rest] = Row,
  NextColumn is CurrentColumn + 1,
  getGoodPositionsBoardRowPieces(Board,Player,Rest,RowNumber,NextColumn,GoodPositionsList, GoodPositionsListAux).

getGoodPositionsPiece(Board,Piece,Player,PieceRow,PieceColumn,GoodPositionsList) :-

  retrievePiecePattern(Piece,PieceRow,PieceColumn,Pattern),
  getPatternPosList(Board,Pattern,PatternPosList),
  getEmptySpacesFromPatternPosList(PatternPosList,Player,GoodPositionsList).

insertPriorityBeforeEmptySpace(EmptySpacesWithoutPriority,NumberEmptyPos,Sum,EmptySpaces) :-

  insertPriorityBeforeEmptySpace(EmptySpacesWithoutPriority,NumberEmptyPos,Sum,EmptySpaces,[]).

insertPriorityBeforeEmptySpace([],_,_,EmptySpaces,EmptySpaces).

insertPriorityBeforeEmptySpace(EmptySpacesWithoutPriority,NumberEmptyPos,Sum,EmptySpaces,EmptySpacesAux) :-

  Sum =\= 4,
  [RowWP,ColWP|Rest] = EmptySpacesWithoutPriority,
  append(EmptySpacesAux,[4-[RowWP,ColWP]],EmptySpacesAux2),
  insertPriorityBeforeEmptySpace(Rest,NumberEmptyPos,Sum,EmptySpaces,EmptySpacesAux2).

insertPriorityBeforeEmptySpace(EmptySpacesWithoutPriority,NumberEmptyPos,4,EmptySpaces,EmptySpacesAux) :-

  [RowWP,ColWP|Rest] = EmptySpacesWithoutPriority,
  append(EmptySpacesAux,[NumberEmptyPos-[RowWP,ColWP]],EmptySpacesAux2),
  insertPriorityBeforeEmptySpace(Rest,NumberEmptyPos,4,EmptySpaces,EmptySpacesAux2).

removePriorityBeforeEmptySpace(GoodPositionsWithPriority,GoodPositions) :-

  removePriorityBeforeEmptySpace(GoodPositionsWithPriority,GoodPositions,[]).

removePriorityBeforeEmptySpace([],GoodPositions,GoodPositions).

removePriorityBeforeEmptySpace(GoodPositionsWithPriority,GoodPositions,GoodPositionsAux) :-

  [_-EmptySpace|Rest] = GoodPositionsWithPriority,
  append(GoodPositionsAux,[EmptySpace],GoodPositionsAux2),
  removePriorityBeforeEmptySpace(Rest,GoodPositions,GoodPositionsAux2).

getEmptySpacesFromPatternPosList(PatternList,Player,EmptySpaces) :-

  getEmptySpacesFromPatternPosListR(PatternList,EmptySpacesWithoutPriority,[]),

  [PlayerPos1,_,_,
  PlayerPos2,_,_,
  PlayerPos3,_,_,
  PlayerPos4,_,_] = PatternList,

  PositionsOwns = [PlayerPos1,PlayerPos2,PlayerPos3,PlayerPos4],

  countElementInList(PositionsOwns,empty,NumberOfEmptyPos),
  countElementInList(PositionsOwns,Player,NumberOfPlayerPos),
  EmptyPosPlusPlayerPos is NumberOfEmptyPos + NumberOfPlayerPos,

  insertPriorityBeforeEmptySpace(EmptySpacesWithoutPriority,NumberOfEmptyPos,EmptyPosPlusPlayerPos,EmptySpaces).

getEmptySpacesFromPatternPosListR([],EmptySpaces,EmptySpaces).

getEmptySpacesFromPatternPosListR(PatternList, EmptySpaces, EmptySpacesAux) :-

  [empty,EmptySpaceRow,EmptySpaceColumn|Rest] = PatternList,

  append(EmptySpacesAux,[EmptySpaceRow,EmptySpaceColumn],EmptySpacesAux2),

  getEmptySpacesFromPatternPosListR(Rest,EmptySpaces,EmptySpacesAux2).

getEmptySpacesFromPatternPosListR(PatternList, EmptySpaces, EmptySpacesAux) :-

  [_,_,_|Rest] = PatternList,
  getEmptySpacesFromPatternPosListR(Rest,EmptySpaces,EmptySpacesAux).

getAllValidPositions(Board,ValidPositionsList) :-
  getAllValidPositions(Board,Board,0,ValidPositionsList,[]).

getAllValidPositions(_,[],_,ValidPositionsList,ValidPositionsList).

getAllValidPositions(Board,Rows,CurrentRow,ValidPositionsList,ValidPositionsListAux) :-

  [Row|Rest] = Rows,
  getValidPositionsInRow(Board,Row,CurrentRow,ValidPositionsListCurrentRow),
  append(ValidPositionsListAux,ValidPositionsListCurrentRow,ValidPositionsListAux2),
  NextRow is CurrentRow + 1,
  getAllValidPositions(Board,Rest,NextRow,ValidPositionsList,ValidPositionsListAux2).

getValidPositionsInRow(Board,Row,RowNumber,ValidPositionsList) :-

  getValidPositionsInRow(Board,Row,RowNumber,0,ValidPositionsList,[]).

getValidPositionsInRow(_, [], _, _,ValidPositionsList, ValidPositionsList).

getValidPositionsInRow(Board, Row, RowNumber, CurrentColumn,ValidPositionsList, ValidPositionsListAux) :-

  [_|Rest] = Row,
  \+validPlay(Board,RowNumber,CurrentColumn),
  NextColumn is CurrentColumn + 1,
  getValidPositionsInRow(Board,Rest,RowNumber,NextColumn,ValidPositionsList,ValidPositionsListAux).

getValidPositionsInRow(Board, Row, RowNumber, CurrentColumn,ValidPositionsList, ValidPositionsListAux) :-

  [_|Rest] = Row,
  validPlay(Board,RowNumber,CurrentColumn),
  append(ValidPositionsListAux,[[RowNumber,CurrentColumn]],ValidPositionsListAux2),
  NextColumn is CurrentColumn + 1,
  getValidPositionsInRow(Board,Rest,RowNumber,NextColumn,ValidPositionsList,ValidPositionsListAux2).

import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import classNames from 'classnames';

const mazeData = [
  ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
  ['#', 'S', ' ', ' ', ' ', '#', ' ', ' ', ' ', '#'],
  ['#', '#', '#', '#', ' ', '#', ' ', '#', ' ', '#'],
  ['#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#'],
  ['#', ' ', '#', '#', '#', '#', '#', '#', ' ', '#'],
  ['#', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', '#'],
  ['#', '#', '#', '#', '#', '#', 'E', '#', '#', '#'],
];

const Maze = () => {
  const [maze, setMaze] = useState(mazeData);
  const [playerPosition, setPlayerPosition] = useState({ x: 1, y: 1 });
  const [isGameWon, setIsGameWon] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event) => {
      event.preventDefault();
      const { key } = event;

      if (isGameWon) return; // Stop movement if the game is won

      if (key === 'ArrowUp' && canMove(playerPosition.x, playerPosition.y - 1)) {
        movePlayer(playerPosition.x, playerPosition.y - 1);
      } else if (key === 'ArrowDown' && canMove(playerPosition.x, playerPosition.y + 1)) {
        movePlayer(playerPosition.x, playerPosition.y + 1);
      } else if (key === 'ArrowLeft' && canMove(playerPosition.x - 1, playerPosition.y)) {
        movePlayer(playerPosition.x - 1, playerPosition.y);
      } else if (key === 'ArrowRight' && canMove(playerPosition.x + 1, playerPosition.y)) {
        movePlayer(playerPosition.x + 1, playerPosition.y);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [playerPosition, isGameWon]);

  const movePlayer = (newX, newY) => {
    const newMaze = [...maze];
    newMaze[playerPosition.y][playerPosition.x] = ' ';
    newMaze[newY][newX] = 'P';
    setPlayerPosition({ x: newX, y: newY });
    setMaze(newMaze);

    if (newMaze[newY][newX] === 'E') {
      setIsGameWon(true);
    }
  };

  const canMove = (x, y) => {
    if (x >= 0 && x < maze[0].length && y >= 0 && y < maze.length) {
      const cell = maze[y][x];
      return cell !== '#' && cell !== 'P';
    }
    return false;
  };

  const handlers = useSwipeable({
    onSwipedUp: () => handleSwipe({ dir: 'Up' }),
    onSwipedDown: () => handleSwipe({ dir: 'Down' }),
    onSwipedLeft: () => handleSwipe({ dir: 'Left' }),
    onSwipedRight: () => handleSwipe({ dir: 'Right' }),
  });

  const handleSwipe = (event) => {
    if (isGameWon) return; // Stop movement if the game is won

    const { dir } = event;

    if (dir === 'Up' && canMove(playerPosition.x, playerPosition.y - 1)) {
      movePlayer(playerPosition.x, playerPosition.y - 1);
    } else if (dir === 'Down' && canMove(playerPosition.x, playerPosition.y + 1)) {
      movePlayer(playerPosition.x, playerPosition.y + 1);
    } else if (dir === 'Left' && canMove(playerPosition.x - 1, playerPosition.y)) {
      movePlayer(playerPosition.x - 1, playerPosition.y);
    } else if (dir === 'Right' && canMove(playerPosition.x + 1, playerPosition.y)) {
      movePlayer(playerPosition.x + 1, playerPosition.y);
    }
  };

  const handleResetGame = () => {
    setMaze(mazeData);
    setPlayerPosition({ x: 1, y: 1 });
    setIsGameWon(false);
  };

  const renderMaze = () => {
    return (
      <div className="maze">
        {maze.map((row, y) => (
          <div key={y} className="maze-row">
            {row.map((cell, x) => (
              <div key={x} className={classNames('maze-cell', { 'maze-wall': cell === '#', 'maze-player': cell === 'P' })}>
                {cell === 'S' && 'Start'}
                {cell === 'E' && 'Exit'}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="maze-container" {...handlers}>
      <h2>Maze Solver</h2>
      {renderMaze()}
      {isGameWon ? (
        <div className="win-message">
          <p>Congratulations! You've won!</p>
          <button onClick={handleResetGame}>Play Again</button>
        </div>
      ) : (
        <p>Use arrow keys or swipe to navigate. Reach the exit (E) to win!</p>
      )}
    </div>
  );
};

export default Maze;

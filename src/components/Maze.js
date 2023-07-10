import React, { useState, useEffect } from 'react';
import { useSwipeable } from 'react-swipeable';
import classNames from 'classnames';

const mazeData = [
  // maze data array...
];

const Maze = () => {
  const [maze, setMaze] = useState(mazeData);
  const [playerPosition, setPlayerPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleKeyDown = (event) => {
      event.preventDefault();
      const { key } = event;

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
  }, [playerPosition]);

  const movePlayer = (newX, newY) => {
    const newMaze = [...maze];
    newMaze[playerPosition.y][playerPosition.x] = ' ';
    newMaze[newY][newX] = 'P';
    setPlayerPosition({ x: newX, y: newY });
    setMaze(newMaze);
  };

  const canMove = (x, y) => {
    if (x >= 0 && x < maze[0].length && y >= 0 && y < maze.length) {
      const cell = maze[y][x];
      return cell !== '#';
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
    <div className="maze" {...handlers}>
      {renderMaze()}
    </div>
  );
};

export default Maze;

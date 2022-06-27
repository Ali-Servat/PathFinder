import React from "react";
import { useState, useEffect } from "react";
import Node from "./Node";
import aStar from "../aStarAlgorithm/aStar";
import "./PathFinder.css";

const cols = 30;
const rows = 10;

const NODE_START_ROW = 0;
const NODE_START_COL = 0;

const PathFinder = ({ endPoint }) => {
    let NODE_END_ROW = endPoint[1];
    let NODE_END_COL = endPoint[0];
    const [grid, setGrid] = useState([]);
    const [path, setPath] = useState([]);
    const [isFirstRender, setIsFirstRender] = useState(true);
    const [walls, setWalls] = useState([]);
    const [visitedNodes, setVisitedNodes] = useState([]);

    useEffect(() => {
        initializeGrid();
    }, [NODE_END_ROW]);

    const initializeGrid = () => {
        const grid = new Array(rows);

        for (let i = 0; i < rows; i++) {
            grid[i] = new Array(cols);
        }

        createSpot(grid);

        setGrid(grid);

        addNeighbours(grid);

        if (isFirstRender) {
            setIsFirstRender(false);
            const wallsArray = createWalls(grid);
            setWalls(wallsArray);
        } else {
            for (let i = 0; i < grid.length; i++) {
                for (let j = 0; j < grid[i].length; j++) {
                    if (walls[i][j]) {
                        grid[i][j].isWall = true;
                    }
                }
            }
        }

        const startNode = grid[NODE_START_ROW][NODE_START_COL];
        const endNode = grid[NODE_END_ROW][NODE_END_COL];

        let answer = aStar(startNode, endNode);

        setPath(answer.path);
        setVisitedNodes(answer.visitedNodes);
    };

    const createSpot = (grid) => {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                grid[i][j] = new Spot(i, j);
            }
        }
    };

    const addNeighbours = (grid) => {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                grid[i][j].addneighbours(grid);
            }
        }
    };

    const createWalls = (grid) => {
        const wallsArray = new Array(rows);
        for (let i = 0; i < rows; i++) {
            wallsArray[i] = new Array(cols);
        }

        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                if (
                    Math.random(1) < 0.2 &&
                    !grid[i][j].isStart &&
                    !grid[i][j].isEnd
                )
                    grid[i][j].isWall = true;
            }
        }

        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                if (grid[i][j].isWall) {
                    wallsArray[i][j] = true;
                } else {
                    wallsArray[i][j] = false;
                }
            }
        }

        return wallsArray;
    };

    function Spot(i, j) {
        this.x = i;
        this.y = j;
        this.isStart = this.x === NODE_START_ROW && this.y === NODE_START_COL;
        this.isEnd = this.x === NODE_END_ROW && this.y === NODE_END_COL;
        this.g = 0;
        this.h = 0;
        this.f = 0;
        this.neighbours = [];
        this.isWall = false;
        this.previous = undefined;
        this.addneighbours = function (grid) {
            let i = this.x;
            let j = this.y;
            if (i > 0) this.neighbours.push(grid[i - 1][j]);
            if (i < rows - 1) this.neighbours.push(grid[i + 1][j]);
            if (j > 0) this.neighbours.push(grid[i][j - 1]);
            if (j < cols - 1) this.neighbours.push(grid[i][j + 1]);
        };
    }

    const gridWithNodes = (
        <div>
            {grid.map((row, rowIndex) => {
                return (
                    <div key={rowIndex} className="rowWrapper">
                        {row.map((col, colIndex) => {
                            const { isStart, isEnd, isWall } = col;
                            return (
                                <Node
                                    key={colIndex}
                                    isStart={isStart}
                                    isEnd={isEnd}
                                    row={rowIndex}
                                    col={colIndex}
                                    isWall={isWall}
                                />
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );

    const visuaalizeShortestPath = (shortestPathNodes) => {
        for (let i = 0; i < shortestPathNodes.length; i++) {
            setTimeout(() => {
                const node = shortestPathNodes[i];
                document.getElementById(`node-${node.x}-${node.y}`).className =
                    "node node-shortest-path";
            }, 10 * i);
        }
    };

    const visualizePath = () => {
        resetBoard(grid);
        for (let i = 0; i <= visitedNodes.length; i++) {
            if (i === visitedNodes.length) {
                setTimeout(() => {
                    visuaalizeShortestPath(path);
                }, 20 * i);
            } else {
                setTimeout(() => {
                    const node = visitedNodes[i];
                    document.getElementById(
                        `node-${node.x}-${node.y}`
                    ).className = "node node-visited";
                }, 20 * i);
            }
        }
    };

    const resetBoard = (grid) => {
        for (let i = 0; i < grid.length; i++) {
            for (let j = 0; j < grid[i].length; j++) {
                const node = grid[i][j];
                document
                    .getElementById(`node-${node.x}-${node.y}`)
                    .classList.remove("node-shortest-path");
                document
                    .getElementById(`node-${node.x}-${node.y}`)
                    .classList.remove("node-visited");
            }
        }
    };

    return (
        <div className="wrapper">
            <div className="wrapper-top">
                <button onClick={visualizePath}>شروع مسیریابی</button>
                <h1>مسیریاب</h1>
            </div>
            {gridWithNodes}
        </div>
    );
};

export default PathFinder;

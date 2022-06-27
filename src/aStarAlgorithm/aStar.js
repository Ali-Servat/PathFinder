function aStar(startNode, endNode) {
    let openSet = [];
    let closedSet = [];
    let path = [];
    let visitedNodes = [];

    openSet.push(startNode);

    while (openSet.length > 0) {
        let leastCostIndex = 0;

        for (let i = 0; i < openSet.length; i++) {
            if (openSet[i].f < openSet[leastCostIndex].f) {
                leastCostIndex = i;
            }
        }
        let currentBestNode = openSet[leastCostIndex];
        visitedNodes.push(currentBestNode);

        if (currentBestNode === endNode) {
            let temp = currentBestNode;
            path.push(temp);
            while (temp.previous) {
                path.push(temp.previous);
                temp = temp.previous;
            }

            path = path.reverse();
            return { path, visitedNodes };
        }

        openSet = openSet.filter((node) => node !== currentBestNode);
        closedSet.push(currentBestNode);

        let neighbours = currentBestNode.neighbours;

        for (let i = 0; i < neighbours.length; i++) {
            let neighbour = neighbours[i];
            if (!closedSet.includes(neighbour) && !neighbour.isWall) {
                let temporaryG = currentBestNode.g + 1;
                let newPath = false;

                if (openSet.includes(neighbour)) {
                    if (temporaryG < neighbour.g) {
                        neighbour.g = temporaryG;
                        newPath = true;
                    }
                } else {
                    neighbour.g = temporaryG;
                    newPath = true;
                    openSet.push(neighbour);
                }
                if (newPath) {
                    neighbour.h = heuristic(neighbour, endNode);
                    neighbour.f = neighbour.g + neighbour.h;
                    neighbour.previous = currentBestNode;
                }
            }
        }
    }
    return { path, visitedNodes, error: "no path found!" };
}

function heuristic(nodeA, nodeB) {
    let distance = Math.abs(nodeB.x - nodeA.x) + Math.abs(nodeB.y - nodeA.y);
    return distance;
}

export default aStar;

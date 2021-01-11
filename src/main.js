const RunningMode = RunningModeType.Test;
const canvas = document.querySelector("#view");
const g = canvas.getContext("2d");

const GameInfo = {};
const FieldWidth = 10;
const FieldHeight = 20;
const Field = [];
const TetriminoQueue = [];

const clearLines = [];

let currentMino = null;

function initGame() {
	GameInfo.Over = false;
	GameInfo.Updates = 0;
	GameInfo.LastUpdate = 0;
	GameInfo.Lines = 0;
	GameInfo.Pause = false;
	GameInfo.Frames = 0;
	GameInfo.LockUntilUpdate = false;

	initField();
	initNextTetriminos();
}

function initField() {
	for (let y = 0; y < FieldHeight; y++) {
		Field[y] = Array(FieldWidth);
		Field[y].fill(0);
	}
}

function initHandlers() {
	window.addEventListener("keydown", (event) => {
		if (GameInfo.LockUntilUpdate) return;
		switch (event.code) {
			case "ArrowUp":
				rotateCurrentTetrimino();
				break;
			case "ArrowDown":
				moveCurrentTetrimino(0, 1);
				break;
			case "ArrowLeft":
				moveCurrentTetrimino(-1, 0);
				break;
			case "ArrowRight":
				moveCurrentTetrimino(1, 0);
				break;
			case "Enter":
				if (GameInfo.Over) {
					initGame();
				}
				break;
			case "Space":
				GameInfo.LockUntilUpdate = true;
				while (moveCurrentTetrimino(0, 1));
				break;
			case "Escape":
				if (GameInfo) {
					GameInfo.Pause = !GameInfo.Pause;
				}
		}
	});
}

function initNextTetriminos() {
	for (let i = TetriminoQueue.length; i < 3; i++) {
		const index = Math.floor(Math.random() * Tetriminos.length);
		const tetrimino = Tetriminos[index];
		TetriminoQueue.push({
			index,
			color: tetrimino.color,
			shape: tetrimino.shape.slice(),
			width: tetrimino.width,
			height: tetrimino.height,
			x: Math.floor(FieldWidth / 2 - tetrimino.width / 2),
			y: -tetrimino.height,
			rotate: 0,
		});
	}
}

function renderAll(partialTick) {
	g.fillStyle = "white";
	g.fillRect(0, 0, 300, 600);

	g.translate(275, 25);
	g.scale(0.5, 0.5);
	g.font = "bold 24px Comfortaa";
	g.textAlign = "center";
	g.textBaseline = "alphabetic";
	for (let i = TetriminoQueue.length - 1; i >= 0; i--) {
		const tetrimino = TetriminoQueue[i];
		g.translate(-(tetrimino.width + 1) * 25, 0);
		renderTetrimino(tetrimino, 0, 0);
		g.fillStyle = "#333";
		g.fillText(`${i + 1}`, 0, 0);
	}

	g.setTransform(1, 0, 0, 1, 0, 0);
	g.translate(25, 54);

	g.strokeStyle = "gray";
	g.lineWidth = 0.5;
	g.strokeRect(0, 0, 250, 500);

	for (let y = 0; y < FieldHeight; y++) {
		for (let x = 0; x < FieldWidth; x++) {
			if (clearLines.includes(y) && Math.floor(partialTick / 100) % 4 == 0) {
				g.globalAlpha = 0.5;
			} else {
				g.globalAlpha = 1.0;
			}
			block = Field[y][x];
			if (block === 0) {
				if ((x + y) % 2 == 0) {
					g.fillStyle = "white";
				} else {
					g.fillStyle = "whitesmoke";
				}
			} else {
				g.fillStyle = Tetriminos[(block - 1) % Tetriminos.length].color;
			}
			renderBlock(x, y);
		}
	}

	if (currentMino) {
		renderGhostTetrimino(currentMino);
		renderTetrimino(currentMino);
	}

	g.setTransform(1, 0, 0, 1, 0, 0);
	g.globalAlpha = 1.0;

	g.fillStyle = "#333";
	g.font = "bold 16px Comfortaa";
	g.textAlign = "center";
	g.textBaseline = "middle";
	g.fillText(`${GameInfo.Lines} Lines`, 150, 600 - 24);

	if (GameInfo.Over || GameInfo.Pause) {
		g.fillStyle = "#fff8";
		g.fillRect(0, 0, 300, 600);

		g.fillStyle = "#666";
		g.textAlign = "center";
		g.textBaseline = "middle";

		if (GameInfo.Over) {
			g.font = "bold 24px Comfortaa";
			g.fillText("GAME OVER", 150, 300 - 24);
			g.font = "bold 16px Comfortaa";
			g.fillText(`${GameInfo.Lines} Lines`, 150, 300);
			g.fillText("Press ENTER to retry", 150, 300 + 24);
		} else if (GameInfo.Pause) {
			g.font = "bold 24px Comfortaa";
			g.fillText("Pause", 150, 300 - 12);
			g.font = "bold 16px Comfortaa";
			g.fillText("Press Esc again to continue", 150, 300 + 12);
		}
	}

	GameInfo.Frames++;
}

function renderBlock(x, y) {
	g.fillRect(x * 25 + 2, y * 25 + 2, 21, 21);

	if (RunningMode === RunningModeType.Debug) {
		g.font = "11px comfortaa";
		g.fillStyle = "black";
		g.textAlign = "center";
		g.textBaseline = "middle";
		g.fillText(`${block}`, x * 25 + 12.5, y * 25 + 12.5);
	}
}

function renderTetrimino(tetrimino, renderX, renderY) {
	if (!tetrimino) {
		return;
	}
	g.fillStyle = tetrimino.color;
	const shape = tetrimino.shape;

	for (let y = 0; y < tetrimino.height; y++) {
		for (let x = 0; x < tetrimino.width; x++) {
			if (shape[y][x] === 0) continue;

			if (!isNaN(renderX) && !isNaN(renderY)) {
				if (renderY + y < 0) continue;
				g.fillRect((renderX + x) * 25 + 2, (renderY + y) * 25 + 2, 21, 21);
			} else {
				const [globalX, globalY] = getGlobalPosition(tetrimino, x, y);

				if (globalY < 0) continue;
				g.fillRect(globalX * 25 + 2, globalY * 25 + 2, 21, 21);
			}
		}
	}
}

function renderGhostTetrimino(tetrimino) {
	if (!tetrimino) {
		return;
	}

	const ghost = {
		index: tetrimino.index,
		color: "gray",
		shape: tetrimino.shape.slice(),
		width: tetrimino.width,
		height: tetrimino.height,
		x: tetrimino.x,
		y: tetrimino.y,
		rotate: tetrimino.rotate,
	};

	while (moveTetrimino(ghost, 0, 1));

	g.globalAlpha = Math.abs(Math.sin(GameInfo.Frames / 6 / Math.PI));
	renderTetrimino(ghost);
	g.globalAlpha = 1.0;
}

function updateAll() {
	GameInfo.LockUntilUpdate = false;
	if (GameInfo.Over || GameInfo.Pause) return;

	GameInfo.Lines += clearLines.length;

	clearLines.forEach((i) => {
		const line = Array(FieldWidth);
		line.fill(0);
		Field.splice(i, 1); //Remove element from i
		Field.unshift(line);
	});
	clearLines.splice(0); //Clear Array
	for (let y = 0; y < FieldHeight; y++) {
		if (Field[y].reduce((acc, cur) => acc * cur, 1) !== 0) {
			clearLines.push(y);
		}
	}

	if (!updateCurrentTetrimino()) {
		if (!stackCurrentTetrimino()) {
			GameInfo.Over = true;
		} else {
			if (clearLines.length === 0) {
				addTetriminoFromQueue();
			}
		}
	}

	GameInfo.Updates++;
}

function updateCurrentTetrimino() {
	return moveCurrentTetrimino(0, 1);
}

function moveCurrentTetrimino(mx, my) {
	return moveTetrimino(currentMino, mx, my);
}

function moveTetrimino(tetrimino, mx, my) {
	if (GameInfo && GameInfo.Pause) return false;
	if (!tetrimino) return false;
	if (clearLines.length !== 0) return false;
	for (let y = 0; y < tetrimino.height; y++) {
		for (let x = 0; x < tetrimino.width; x++) {
			if (tetrimino.shape[y][x] === 0) continue;
			let [globalX, globalY] = getGlobalPosition(tetrimino, x, y);

			globalX += mx;
			globalY += my;

			if (globalX < 0 || globalX >= FieldWidth) return false;
			if (globalY >= FieldHeight) return false;

			if (globalY > 0) {
				const target = Field[globalY][globalX];
				if (target !== 0) return false;
			}
		}
	}
	tetrimino.x += mx;
	tetrimino.y += my;
	return true;
}

function rotateCurrentTetrimino() {
	for (let i = 0; i < 4; i++) {
		if (rotateTetrimino(currentMino)) {
			return true;
		}
	}
	return false;
}

function rotateTetrimino(tetrimino) {
	if (GameInfo && GameInfo.Pause) return false;
	if (!tetrimino) return false;

	const rotated = Array(tetrimino.width);
	for (let i = 0; i < tetrimino.width; i++) {
		rotated[i] = Array(tetrimino.height);
		rotated[i].fill(0);
	}

	for (let y = 0; y < tetrimino.height; y++) {
		for (let x = 0; x < tetrimino.width; x++) {
			if (tetrimino.shape[y][x] === 0) continue;
			const tx = tetrimino.height - y - 1;
			const ty = x;

			const [globalX, globalY] = getGlobalPosition(tetrimino, tx, ty);

			if (globalY >= FieldHeight) return false;
			if (globalX < 0 || globalX >= FieldWidth) return false;

			if (globalY >= 0) {
				if (Field[globalY][globalX] !== 0) return false;
			}

			rotated[ty][tx] = tetrimino.shape[y][x];
		}
	}

	[tetrimino.width, tetrimino.height] = [tetrimino.height, tetrimino.width];
	tetrimino.shape = rotated;
	tetrimino.rotate++;

	return true;
}

function stackCurrentTetrimino() {
	if (GameInfo && GameInfo.Pause) return true;
	if (!currentMino) return true;
	if (clearLines.length !== 0) return true;
	for (let y = 0; y < currentMino.height; y++) {
		for (let x = 0; x < currentMino.width; x++) {
			if (currentMino.shape[y][x] === 0) continue;
			const [globalX, globalY] = getGlobalPosition(currentMino, x, y);
			if (globalY < 0) return false;
			Field[globalY][globalX] = currentMino.index + 1;
		}
	}
	return true;
}

function addTetriminoFromQueue() {
	currentMino = TetriminoQueue.shift();
	initNextTetriminos();
}

function getGlobalPosition(tetrimino, x, y) {
	const global = { x: null, y: null };
	if (!tetrimino) return global;

	global.x = tetrimino.x + x - Math.floor(tetrimino.width / 2);
	global.y = tetrimino.y + y - Math.floor(tetrimino.height / 2);

	return [global.x, global.y];
}

if (RunningMode !== RunningModeType.Test) {
	initHandlers();
	initGame();
	addTetriminoFromQueue();
	(function () {
		now = Date.now();
		if (now - GameInfo.LastUpdate > 1000) {
			updateAll();
			GameInfo.LastUpdate = now;
		}
		renderAll((now - GameInfo.LastUpdate) / 1000.0);
		window.requestAnimationFrame(arguments.callee);
	})();
}

const playerOneSpan = document.querySelectorAll('.players .player')[0];
const playerTwoSpan = document.querySelectorAll('.players .player')[1];
const playerOneScore = document.querySelectorAll('.score-container .score .number')[0];
const playerTwoScore = document.querySelectorAll('.score-container .score .number')[1];
const restartButton = document.querySelector('button.reset');
const cells = document.querySelectorAll('.cells .cell');
const lineVertical = document.querySelector('.line-vertical');
const lineHorizontal = document.querySelector('.line-horizontal');
const lineRotated = document.querySelector('.line-rotated');

toastr.options = {
  "closeButton": false,
  "debug": false,
  "newestOnTop": false,
  "progressBar": true,
  "positionClass": "toast-top-center",
  "preventDuplicates": true,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "3000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut"
}

class TicTacToe {
	constructor() {
		this.score = {
			player1: 0,
			player2: 0
		};
		this.turn = Math.floor(Math.random() * [1, 2].length + 1);
		this.lastWinner = null;
		this.selecteds = 0;
		this.win = false;
		this.lines = {
			vertical: {
				leftSide: {
					top: '-100px',
					left: '47px'
				},
				midSide: {
					top: '-100px',
					left: '147px'
				},
				rightSide: {
					top: '-100px',
					left: '247px'
				}
			},

			horizontal: {
				topSide: {
					top: '-55px',
					left: '0px'
				},
				midSide: {
					top: '45px',
					left: '0px'
				},
				bottomSide: {
					top: '147px',
					left: '0px'
				}
			},

			rotated: {
				up: function() {
					lineRotated.style.visibility = 'visible';
					lineRotated.classList.remove('down');
					lineRotated.classList.add('up');
				},
				down: function() {
					lineRotated.style.visibility = 'visible';
					lineRotated.classList.remove('up');
					lineRotated.classList.add('down');
				}
			}
		}
	}

	addScore(player) {
		this.score[`player${player}`] = this.getScore(player) + 1;
	}

	getScore(player) {
		return this.score[`player${player}`];
	}

	checkTurn() {
		if (this.turn == 1) {
			playerOneSpan.classList.remove('disabled');
			playerOneScore.classList.remove('disabled');
			playerTwoSpan.classList.add('disabled');
			playerTwoScore.classList.add('disabled');
		} else if (this.turn == 2) {
			playerTwoSpan.classList.remove('disabled');
			playerTwoScore.classList.remove('disabled');
			playerOneSpan.classList.add('disabled');
			playerOneScore.classList.add('disabled');
		}
	}

	switchTurn() {
		this.turn = this.turn == 1 ? 2 : 1;
	}

	restart()  {
		this.selecteds = 0;
		this.checkTurn();
		
		for (cell of cells) {
			cell.querySelector('.symbol').innerText = '';
			cell.dataset.selected = 'false';
		}
	}

	reset() {
		this.score.player1 = 0;
		this.score.player2 = 0;
		this.selecteds = 0;
		this.turn = Math.floor(Math.random() * [1, 2].length + 1);
		this.lastWinner = null;
		this.checkTurn();
		
		for (cell of cells) {
			cell.querySelector('.symbol').innerText = '';
			cell.dataset.selected = 'false';
		}

		this.updateScore();
	}

	getSymbol() {
		return this.turn == 1 ? 'X' : 'O';
	}

	addSymbolInCell(event) {
		if (event.currentTarget.dataset.selected == 'false') {
			event.currentTarget.querySelector('.symbol').innerText = this.getSymbol();
			event.currentTarget.dataset.selected = true;

			this.selecteds++;

			this.switchTurn();
			this.checkTurn();
			this.checkWinner();
		}
	}

	showLinesOnWin() {
		if (
			cells[0].innerText == 'X' &&
			cells[3].innerText == 'X' &&
			cells[6].innerText == 'X' ||
			cells[0].innerText == 'O' &&
			cells[3].innerText == 'O' &&
			cells[6].innerText == 'O'
		) {
			lineVertical.style.top = this.lines.vertical.leftSide.top;
			lineVertical.style.left = this.lines.vertical.leftSide.left;
			lineVertical.style.visibility = 'visible';
		} else if (
			cells[1].innerText == 'X' &&
			cells[4].innerText == 'X' &&
			cells[7].innerText == 'X' ||
			cells[1].innerText == 'O' &&
			cells[4].innerText == 'O' &&
			cells[7].innerText == 'O'
		) {
			lineVertical.style.top = this.lines.vertical.midSide.top;
			lineVertical.style.left = this.lines.vertical.midSide.left;
			lineVertical.style.visibility = 'visible';
		} else if (
			cells[2].innerText == 'X' &&
			cells[5].innerText == 'X' &&
			cells[8].innerText == 'X' ||
			cells[2].innerText == 'O' &&
			cells[5].innerText == 'O' &&
			cells[8].innerText == 'O'
		) {
			lineVertical.style.top = this.lines.vertical.rightSide.top;
			lineVertical.style.left = this.lines.vertical.rightSide.left;
			lineVertical.style.visibility = 'visible';
		} else if (
			cells[0].innerText == 'X' &&
			cells[1].innerText == 'X' &&
			cells[2].innerText == 'X' ||
			cells[0].innerText == 'O' &&
			cells[1].innerText == 'O' &&
			cells[2].innerText == 'O'
		) {
			lineHorizontal.style.top = this.lines.horizontal.topSide.top;
			lineHorizontal.style.left = this.lines.horizontal.topSide.left;
			lineHorizontal.style.visibility = 'visible';
		} else if (
			cells[3].innerText == 'X' &&
			cells[4].innerText == 'X' &&
			cells[5].innerText == 'X' ||
			cells[3].innerText == 'O' &&
			cells[4].innerText == 'O' &&
			cells[5].innerText == 'O'
		) {
			lineHorizontal.style.top = this.lines.horizontal.midSide.top;
			lineHorizontal.style.left = this.lines.horizontal.midSide.left;
			lineHorizontal.style.visibility = 'visible';
		} else if (
			cells[6].innerText == 'X' &&
			cells[7].innerText == 'X' &&
			cells[8].innerText == 'X' ||
			cells[6].innerText == 'O' &&
			cells[7].innerText == 'O' &&
			cells[8].innerText == 'O'
		) {
			lineHorizontal.style.top = this.lines.horizontal.bottomSide.top;
			lineHorizontal.style.left = this.lines.horizontal.bottomSide.left;
			lineHorizontal.style.visibility = 'visible';
		} else if (
			cells[0].innerText == 'X' &&
			cells[4].innerText == 'X' &&
			cells[8].innerText == 'X' ||
			cells[0].innerText == 'O' &&
			cells[4].innerText == 'O' &&
			cells[8].innerText == 'O'
		) {
			this.lines.rotated.down();
		} else if (
			cells[2].innerText == 'X' &&
			cells[4].innerText == 'X' &&
			cells[6].innerText == 'X' ||
			cells[2].innerText == 'O' &&
			cells[4].innerText == 'O' &&
			cells[6].innerText == 'O'
		) {
			this.lines.rotated.up();
		}
	}

	checkWinner() {
		this.showLinesOnWin();

		if (
			cells[0].innerText == 'X' &&
			cells[1].innerText == 'X' &&
			cells[2].innerText == 'X' ||
			cells[3].innerText == 'X' &&
			cells[4].innerText == 'X' &&
			cells[5].innerText == 'X' ||
			cells[6].innerText == 'X' &&
			cells[7].innerText == 'X' &&
			cells[8].innerText == 'X' ||
			cells[0].innerText == 'X' &&
			cells[3].innerText == 'X' &&
			cells[6].innerText == 'X' ||
			cells[1].innerText == 'X' &&
			cells[4].innerText == 'X' &&
			cells[7].innerText == 'X' ||
			cells[2].innerText == 'X' &&
			cells[5].innerText == 'X' &&
			cells[8].innerText == 'X' ||
			cells[0].innerText == 'X' &&
			cells[4].innerText == 'X' &&
			cells[8].innerText == 'X' ||
			cells[2].innerText == 'X' &&
			cells[4].innerText == 'X' &&
			cells[6].innerText == 'X'
		) {
			this.addScore(1);
			this.turn = 1;
			this.lastWinner = 1;
			this.win = true;
			toastr["success"]("Player 1 venceu!", "Vitória");

			setTimeout(() => {
				this.restart();
				this.updateScore();
				this.win = false;
				lineVertical.style.visibility = 'hidden';
				lineHorizontal.style.visibility = 'hidden';
				lineRotated.style.visibility = 'hidden';
			}, 2000);
		} else if (
			cells[0].innerText == 'O' &&
			cells[1].innerText == 'O' &&
			cells[2].innerText == 'O' ||
			cells[3].innerText == 'O' &&
			cells[4].innerText == 'O' &&
			cells[5].innerText == 'O' ||
			cells[6].innerText == 'O' &&
			cells[7].innerText == 'O' &&
			cells[8].innerText == 'O' ||
			cells[0].innerText == 'O' &&
			cells[3].innerText == 'O' &&
			cells[6].innerText == 'O' ||
			cells[1].innerText == 'O' &&
			cells[4].innerText == 'O' &&
			cells[7].innerText == 'O' ||
			cells[2].innerText == 'O' &&
			cells[5].innerText == 'O' &&
			cells[8].innerText == 'O' ||
			cells[0].innerText == 'O' &&
			cells[4].innerText == 'O' &&
			cells[8].innerText == 'O' ||
			cells[2].innerText == 'O' &&
			cells[4].innerText == 'O' &&
			cells[6].innerText == 'O'	
		) {
			this.addScore(2);
			this.turn = 2;
			this.lastWinner = 2;
			this.win = true;
			toastr["success"]("Player 2 venceu!", "Vitória");
			
			setTimeout(() => {
				this.restart();
				this.updateScore();
				this.win = false;
				lineVertical.style.visibility = 'hidden';
				lineHorizontal.style.visibility = 'hidden';
				lineRotated.style.visibility = 'hidden';
			}, 2000);
		} else if (this.selecteds === 9) {
			this.turn = Math.floor(Math.random() * [1, 2].length + 1);
			this.lastWinner = null;
			this.restart();
			toastr["warning"]("Nenhum vencedor!", "Empate");
		}
	}

	updateScore() {
		playerOneScore.innerText = this.getScore(1);
		playerTwoScore.innerText = this.getScore(2);
	}
}

const ticTacToe = new TicTacToe();

ticTacToe.checkTurn();

for (cell of cells) {
	cell.addEventListener('click', (event) => {
		if (!ticTacToe.win) {
			ticTacToe.addSymbolInCell(event);
		}
	});
}

restartButton.addEventListener('click', () => {
	ticTacToe.reset();
});
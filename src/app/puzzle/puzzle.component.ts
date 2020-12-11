import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-puzzle',
  templateUrl: './puzzle.component.html',
  styleUrls: ['./puzzle.component.scss']
})
export class PuzzleComponent implements OnInit {
  count = 0;
  disabledUndo = true;
  rowEmpty!: number;
  colEmpty!: number;
  currentPosition = [
    {
      id: 1,
      row: 0,
      col: 0,
      isEmt: false
    }, {
      id: 2,
      row: 0,
      col: 1,
      isEmt: false
    }, {
      id: 3,
      row: 0,
      col: 2,
      isEmt: false
    }, {
      id: 4,
      row: 0,
      col: 3,
      isEmt: false
    },
    {
      id: 5,
      row: 1,
      col: 0,
      isEmt: false
    }, {
      id: 6,
      row: 1,
      col: 1,
      isEmt: false
    }, {
      id: 7,
      row: 1,
      col: 2,
      isEmt: false
    }, {
      id: 8,
      row: 1,
      col: 3,
      isEmt: false
    },
    {
      id: 9,
      row: 2,
      col: 0,
      isEmt: false
    }, {
      id: 10,
      row: 2,
      col: 1,
      isEmt: false
    }, {
      id: 11,
      row: 2,
      col: 2,
      isEmt: false
    }, {
      id: 12,
      row: 2,
      col: 3,
      isEmt: false
    },
    {
      id: 13,
      row: 3,
      col: 0,
      isEmt: false
    }, {
      id: 14,
      row: 3,
      col: 1,
      isEmt: false
    }, {
      id: 15,
      row: 3,
      col: 2,
      isEmt: false
    }, {
      id: 16,
      row: 3,
      col: 3,
      isEmt: true
    }
  ];
  currentUndo = [] as any;
  moves: any = [];

  constructor() {
    this.shuffle(this.currentPosition);
  }

  ngOnInit(): void {
    console.log(this.dataRow);

  }

  getRow(index: number): any {
    if (index >= 0 && index < 4) {
      return 0;
    }
    if (index >= 4 && index < 8) {
      return 1;
    }
    if (index >= 8 && index < 12) {
      return 2;
    } else {
      return 3;
    }
  }

  getCol(index: number): any {
    return index % 4;
  }

  getClass(el: any, item: any): any {
    const row = el.getAttribute('data-row');
    const col = el.getAttribute('data-col');
    if (item.isEmt === true) {
      this.colEmpty = col;
      this.rowEmpty = row;
      return 'empty';
    } else if (item.row == row && item.col == col) {
      return 'set';
    } else {
      return 'grid-item';
    }
  }

  onClick(el: any): any {
    const row = el.getAttribute('data-row');
    const col = el.getAttribute('data-col');
    const digit = el.getAttribute('data-digit');
    const digitEmpty = 16;
    if ((row === this.rowEmpty && Math.abs(col - this.colEmpty) === 1) || (col === this.colEmpty && Math.abs(row - this.rowEmpty) === 1)) {
      const index = this.currentPosition.findIndex(x => x.id == digit);
      const indexEmpty = this.currentPosition.findIndex(x => x.id == digitEmpty);
      this.swap(this.currentPosition, index, indexEmpty);
      this.counter(digit, row, col, digitEmpty, this.rowEmpty, this.colEmpty);
    }
  }

  swap(mass: any, a: number, b: number): void {
    [mass[a], mass[b]] = [mass[b], mass[a]];
  }

  shuffle(array: any): any {
    array.sort(() => Math.random() - 0.5);
  }

  counter(digit: any, row: any, col: any, digitEmpty: any, rowEmpty: any, colEmpty: any): any {
    this.count++;
    const value = {
      total: this.count,
      id: digit,
      row,
      col,
      idEmpty: digitEmpty,
      rowEmpty,
      colEmpty
    };
    if (this.moves.length < 5) {
      this.moves.push(value);
    } else {
      this.moves.shift();
      this.moves.push(value);
    }
    this.disabledUndo = false;
  }

  reset(): any {
    this.shuffle(this.currentPosition);
    this.count = 0;
  }

  undo(): any {
    this.currentUndo = this.moves[this.moves.length - 1];
    if (this.moves.length !== 0) {
      const index = this.currentPosition.findIndex(x => x.id == this.currentUndo.id);
      const indexEmpty = this.currentPosition.findIndex(x => x.id == this.currentUndo.idEmpty);
      this.swap(this.currentPosition, index, indexEmpty);
      this.count--;
      this.moves.splice(this.moves.length - 1, 1);
    }
    if (this.moves.length <= 0) {
      this.disabledUndo = true;
    }
  }
}

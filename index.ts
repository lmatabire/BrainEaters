
namespace BrainEaters {
    interface IGame {
        c: HTMLCanvasElement;
        context: CanvasRenderingContext2D;
        area: number;
        hashTable: Map<{}, {}>;
    }

    export class Game implements IGame {
        c: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById('canvas');
        context: CanvasRenderingContext2D = this.c.getContext('2d');
        hashTable: Map<{}, {}>;
        area: number;
        constructor() {
            this.area = (this.c.height / unit) * (this.c.width / unit);
            this.hashTable = new Map();
        }
    }
    export class Tile {
        public unit: number = 50;
        public image: HTMLImageElement;
        public w: number;
        public h: number;
        public type: string;
        constructor(
            image: string, public x: number, public y: number
        ) {
            this.image = new Image();
            this.image.src = image;
            this.image.height = 50;
            this.image.width = 50;
            this.w = this.unit;
            this.h = this.unit;
            this.image.onload = () => {
                this.drawTile();
            }
        }

        public drawTile() {
            game.context.drawImage(this.image, this.x, this.y, this.w, this.h);
            game.hashTable.set(JSON.stringify(new Point(this.x, this.y)), this);
        }
        clearTile() {
            game.hashTable.delete(JSON.stringify(new Point(this.x, this.y)));
            game.context.clearRect(this.x, this.y, this.w, this.h);
        }

        moveUp() {
            if (this.canMoveImage('up')) {
                this.clearTile();
                this.y -= this.unit;
                this.drawTile();
            }
        }

        moveDown() {
            if (this.canMoveImage('down')) {
                this.clearTile();
                this.y += this.unit;
                this.drawTile();
            }
        }

        moveLeft() {
            if (this.canMoveImage('left')) {
                this.clearTile();
                this.x -= this.unit;
                this.drawTile();
            }
        }

        moveRight() {
            if (this.canMoveImage('right')) {
                this.clearTile();
                this.x += this.unit;
                this.drawTile();
            }
        }

        canMoveImage(direction: string) {
            switch (direction) {
                case 'up':
                    let destUp = JSON.stringify(new Point(this.x, this.y - this.unit));
                    return !game.hashTable.get(destUp) ? this.y > 0 : false;
                case 'down':
                    let destDown = JSON.stringify(new Point(this.x, this.y + this.unit));
                    return !game.hashTable.get(destDown) ? (this.y + this.h) < game.c.height : false;
                case 'left':
                    let destLeft = JSON.stringify(new Point(this.x - this.unit, this.y));
                    return !game.hashTable.get(destLeft) ? this.x > 0 : false;
                case 'right':
                    let destRight = JSON.stringify(new Point(this.x + this.unit, this.y));
                    return !game.hashTable.get(destRight) ? (this.x + this.w) < game.c.width : false;
            }
        }
    }

    class Player extends Tile {
        type: string = 'Player';
        constructor(
            image: string,
            x: number,
            y: number
        ) {
            super(image, x, y);
            this.createControls();
        }

        createControls() {
            document.addEventListener('keydown', (event) => {
                switch (event.key) {
                    case 'ArrowUp':
                        this.moveUp();
                        break;
                    case 'ArrowDown':
                        this.moveDown();
                        break;
                    case 'ArrowLeft':
                        this.moveLeft();
                        break;
                    case 'ArrowRight':
                        this.moveRight();
                        break;
                }
            }, false);
        }
    }
    export class Zombie extends Tile {
        public type: string = "Zombie";
    }

    export class Wall extends Tile {
        public type: string = "Wall";

    }

    export class Point {
        constructor(
            public x: number,
            public y: number
        ) { }
    }

   let player = new Player("Assets/playerone.png",0 ,0);
   let brick = [
     new BrainEaters.Wall("Assets/tile.png", 100, 50),
     new BrainEaters.Wall("Assets/tile.png", 0, 50),
     new BrainEaters.Wall("Assets/tile.png", 100, 50),
     new BrainEaters.Wall("Assets/tile.png", 100, 50)
   ];
    let zombies = [
        new BrainEaters.Zombie("Assets/zombie1.gif", 50, 50),
        new BrainEaters.Zombie("Assets/zombie1.gif", 0, 50),
        new BrainEaters.Zombie("Assets/zombie1.gif", 150, 50)
    ];
    // mapWidth = 16;
    // mapHeight = 10;
    // let wall = [
    //   x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,x,
    //   x,y,y,y,y,y,y,y,y,y,y,y,y,y,y,x,
    //   x,y,y,y,y,y,y,y,y,y,y,y,y,y,y,x,
    //   x,y,y,y,y,y,y,y,y,y,y,y,y,y,y,x,
    //   x,y,y,y,y,y,y,y,y,y,y,y,y,y,y,x,
    //
    // ];

    // for (var i=0; i < array.length; i++)

    const unit = 50;
    let game = new Game();

}

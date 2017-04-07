var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var BrainEaters;
(function (BrainEaters) {
    var Game = (function () {
        function Game() {
            this.c = document.getElementById('canvas');
            this.context = this.c.getContext('2d');
            this.area = (this.c.height / unit) * (this.c.width / unit);
            this.hashTable = new Map();
        }
        return Game;
    }());
    BrainEaters.Game = Game;
    var Tile = (function () {
        function Tile(image, x, y) {
            var _this = this;
            this.x = x;
            this.y = y;
            this.unit = 50;
            this.image = new Image();
            this.image.src = image;
            this.image.height = 50;
            this.image.width = 50;
            this.w = this.unit;
            this.h = this.unit;
            this.image.onload = function () {
                _this.drawTile();
            };
        }
        Tile.prototype.drawTile = function () {
            game.context.drawImage(this.image, this.x, this.y, this.w, this.h);
            game.hashTable.set(JSON.stringify(new Point(this.x, this.y)), this);
        };
        Tile.prototype.clearTile = function () {
            game.hashTable.delete(JSON.stringify(new Point(this.x, this.y)));
            game.context.clearRect(this.x, this.y, this.w, this.h);
        };
        Tile.prototype.moveUp = function () {
            if (this.canMoveImage('up')) {
                this.clearTile();
                this.y -= this.unit;
                this.drawTile();
            }
        };
        Tile.prototype.moveDown = function () {
            if (this.canMoveImage('down')) {
                this.clearTile();
                this.y += this.unit;
                this.drawTile();
            }
        };
        Tile.prototype.moveLeft = function () {
            if (this.canMoveImage('left')) {
                this.clearTile();
                this.x -= this.unit;
                this.drawTile();
            }
        };
        Tile.prototype.moveRight = function () {
            if (this.canMoveImage('right')) {
                this.clearTile();
                this.x += this.unit;
                this.drawTile();
            }
        };
        Tile.prototype.canMoveImage = function (direction) {
            switch (direction) {
                case 'up':
                    var destUp = JSON.stringify(new Point(this.x, this.y - this.unit));
                    return !game.hashTable.get(destUp) ? this.y > 0 : false;
                case 'down':
                    var destDown = JSON.stringify(new Point(this.x, this.y + this.unit));
                    return !game.hashTable.get(destDown) ? (this.y + this.h) < game.c.height : false;
                case 'left':
                    var destLeft = JSON.stringify(new Point(this.x - this.unit, this.y));
                    return !game.hashTable.get(destLeft) ? this.x > 0 : false;
                case 'right':
                    var destRight = JSON.stringify(new Point(this.x + this.unit, this.y));
                    return !game.hashTable.get(destRight) ? (this.x + this.w) < game.c.width : false;
            }
        };
        return Tile;
    }());
    BrainEaters.Tile = Tile;
    var Player = (function (_super) {
        __extends(Player, _super);
        function Player(image, x, y) {
            var _this = _super.call(this, image, x, y) || this;
            _this.type = 'Player';
            _this.createControls();
            return _this;
        }
        Player.prototype.createControls = function () {
            var _this = this;
            document.addEventListener('keydown', function (event) {
                switch (event.key) {
                    case 'ArrowUp':
                        _this.moveUp();
                        break;
                    case 'ArrowDown':
                        _this.moveDown();
                        break;
                    case 'ArrowLeft':
                        _this.moveLeft();
                        break;
                    case 'ArrowRight':
                        _this.moveRight();
                        break;
                }
            }, false);
        };
        return Player;
    }(Tile));
    var Zombie = (function (_super) {
        __extends(Zombie, _super);
        function Zombie() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.type = "Zombie";
            return _this;
        }
        return Zombie;
    }(Tile));
    BrainEaters.Zombie = Zombie;
    var Wall = (function (_super) {
        __extends(Wall, _super);
        function Wall() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.type = "Wall";
            return _this;
        }
        return Wall;
    }(Tile));
    BrainEaters.Wall = Wall;
    var Point = (function () {
        function Point(x, y) {
            this.x = x;
            this.y = y;
        }
        return Point;
    }());
    BrainEaters.Point = Point;
    var player = new Player("Assets/playerone.png", 0, 0);
    var brick = [
        new BrainEaters.Wall("Assets/tile.png", 100, 50),
        new BrainEaters.Wall("Assets/tile.png", 0, 50),
        new BrainEaters.Wall("Assets/tile.png", 100, 50),
        new BrainEaters.Wall("Assets/tile.png", 100, 50)
    ];
    var zombies = [
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
    var unit = 50;
    var game = new Game();
})(BrainEaters || (BrainEaters = {}));
//# sourceMappingURL=index.js.map
function Game(){
    this.food = new Food()
    this.snake = new Snake()
    that = this
}

Game.prototype.runSnack = function(map){
    let timer = setInterval(() => {
        this.snake.move(map)
        this.snake.render(map)

        let maxHeight = map.offsetHeight / this.snake.height
        let maxWidth = map.offsetWidth / this.snake.width

        let headX = this.snake.body[0].x
        let headY = this.snake.body[0].y

        let hX = headX * this.snake.width
        let hY = headY * this.snake.height

        if(headX < 0 || headX == maxWidth || headY < 0 || headY == maxHeight){
            clearInterval(timer)
        }

        // console.log(food.elements);
        for (var i = 0; i < food.elements.length; i++) {
            if (food.elements[i].offsetLeft === hX && food.elements[i].offsetTop === hY) {
                console.log(222);
                food.remove(map, i);
                food.render(map);
                let last = that.snake.body[that.snake.body.length - 1];
                that.snake.body.push({
                x: last.x,
                y: last.y,
                color: last.color
                });
            }
        }
            
    },150)
}

Game.prototype.bindKey = function (){
    document.onkeydown = function(e){
        switch (e.keyCode) {
            case 37:
              that.snake.direction = "left";
              break;
            case 38:
              that.snake.direction = "top";
              break;
            case 39:
              that.snake.direction = "right";
              break;
            case 40:
              that.snake.direction = "bottom";
              break;
          }
    }
}


// let game = new Game()
// game.runSnack(map)
// game.bindKey()
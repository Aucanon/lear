(function(){
    var that
    function Game(map){
        this.food = new Food()
        this.snake = new Snake()
        this.map = map
        that = this
    }

    function runSnack(){
        var timer = setInterval(()=>{
            that.snake.move()
            that.snake.remove(that.map)
            that.snake.render(that.map)

            var maxWidth = that.map.offsetWidth / that.snake.width
            var maxHeight = that.map.offsetHeight / that.snake.height
            var headX = that.snake.body[0].x
            var headY = that.snake.body[0].y

            //蛇头
            var hX = headX * that.snake.width
            var hY = headY * that.snake.height

            for (var i = 0; i < that.food.elements.length; i++) {
                if (that.food.elements[i].offsetLeft === hX && that.food.elements[i].offsetTop === hY) {
                  // 吃到了食物2
                  // 让食物删除，然后渲染一个新的食物
                  that.food.remove(that.map, i);
                  that.food.render(that.map);
                  // 添加一个新的蛇节
                  var last = that.snake.body[that.snake.body.length - 1];
                  that.snake.body.push({
                    x: last.x,
                    y: last.y,
                    color: last.color
                  });
                }
              }

            if(headX < 0 || headX >= maxWidth || headY < 0 || headY >= maxHeight){
                clearInterval(timer)
            }
        },150)
    }

    function bindKey(){
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

    Game.prototype.start = function(){
        this.food.render(this.map)
        this.food.render(this.map)
        this.food.render(this.map)
        this.snake.render(this.map)
        this.snake.move()
        runSnack()
        bindKey()
        // this.snake.remove(this.map)
        // this.snake.render(this.map)
    }
    window.Game = Game
})()


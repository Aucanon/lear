;(function (window,undefined) {
    // 制作一个工具对象，内部添加多种工具的方法
    var Tools = {
      // 获取一个范围内部的随机整数
      getRandom: function (min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; //含最大值，含最小值
      },
      // 获取随机颜色的方法
      getColor: function () {
        // rgb(r,g,b)  三个色值的颜色可以随机获取 0-255 之间的数字
        // 获取三个色值
        var r = this.getRandom(0, 255);
        var g = this.getRandom(0, 255);
        var b = this.getRandom(0, 255);
        // 返回一个 颜色值
        return "rgb(" + r + "," + g + "," + b + ")";
      }
    };
    window.Tools = Tools;
  })(window,undefined)

  ;(function(window,undefined){
    function Food(option){
        option = option instanceof Object ? option : {}
        this.width = option.width || 20
        this.height = option.height || 20
        this.x = option.x || 0
        this.y = option.y || 0
        this.color = option.color || 'green'
        this.elements = []
    }
    
    var ps = "absolute"
    
    Food.prototype.render = function(map){
        var ele = document.createElement('div')
        this.x = Tools.getRandom(0,map.clientWidth / this.width - 1) * this.width
        this.y = Tools.getRandom(0,map.clientHeight / this.height - 1) * this.height
        ele.style.width = this.width + 'px'
        ele.style.height = this.height + 'px'
        ele.style.left = this.x + 'px'
        ele.style.top = this.y + 'px'
        ele.style.backgroundColor = this.color
        ele.style.position = ps
        map.appendChild(ele)
        this.elements.push(ele)
    }
    
    Food.prototype.remove = function(map,i){
        map.removeChild(this.elements[i])
        this.elements.splice(i,1)
    }
    window.Food = Food
    
})(window,undefined)

// var map = document.getElementById('map')
    
//     var food = new Food()
//     food.render(map)


;(function(window,undefined){
    var ps = 'absolute'
    function Snake(option){
        option = option instanceof Object ? option : {}
        this.width = option.width || 20
        this.height = option.height || 20
        this.body = [
            {x:3,y:2,color:'red'},
            {x:2,y:2,color:'blue'},
            {x:1,y:2,color:'blue'}
        ]
        this.direction = "right"
        this.elements = []
    }
    Snake.prototype.render = function(map){
        for(var i = 0,len = this.body.length;i < len;i++){
            var piece = this.body[i]
            var ele = document.createElement('div')
            ele.style.width = this.width + 'px'
            ele.style.height = this.height + 'px'
            ele.style.left = piece.x * this.width + 'px'
            ele.style.top = piece.y * this.height + 'px'
            ele.style.position = ps
            ele.style.backgroundColor = piece.color
            map.appendChild(ele)
            this.elements.push(ele)
        }
        
    }
    Snake.prototype.move = function(){
        for(var i = this.body.length - 1;i > 0;i--){
            this.body[i].x = this.body[i - 1].x
            this.body[i].y = this.body[i - 1].y
        }
        var head = this.body[0]
        switch(this.direction){
            case 'right':
                head.x++
                break
            case 'left':
                head.x--
                break
            case 'top':
                head.y--
                break
            case 'bottom':
                head.y++
                break
        }
    }
    Snake.prototype.remove = function(map){        
        for(var i = this.elements.length - 1;i >= 0;i--){
            map.removeChild(this.elements[i])
        }
        this.elements = []
    }
    window.Snake = Snake
})(window,undefined)
// var map = document.getElementById('map')
// var snack = new Snake()
// snack.render(map)


;(function(window,undefined){
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
})(window,undefined)



;(function(window,undefined) {
    var map = document.getElementById('map')
    var game = new Game(map)
    game.start()
})(window,undefined)
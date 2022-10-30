(function(){
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
    
})()

// var map = document.getElementById('map')
    
//     var food = new Food()
//     food.render(map)
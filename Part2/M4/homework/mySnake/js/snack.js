function Snake(){
    this.width = 20
    this.height = 20
    this.body = [
        {x:3,y:2,color:'red'},
        {x:2,y:2,color:'blue'},
        {x:1,y:2,color:'blue'}
    ]
    this.direction = 'right'
    this.elements = []
}
Snake.prototype.render = function(map){
    for(let i = 0;i < this.body.length;i++){
        let p = this.body[i]
        let ele = document.createElement('div')
        ele.style.width = this.width + 'px'
        ele.style.height = this.height + 'px'
        ele.style.left = p.x * this.width + 'px'
        ele.style.top = p.y * this.height + 'px'
        ele.style.position = 'absolute'
        ele.style.backgroundColor = p.color
        map.appendChild(ele)
        this.elements.push(ele)
    }
}
Snake.prototype.move = function(){
    for(let i = this.body.length - 1;i > 0;i--){
        this.body[i].x = this.body[i - 1].x
        this.body[i].y = this.body[i - 1].y
        // map.removeChild(this.element[i])
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
    for(var i = this.elements.length - 1;i >= 0;i--){
        map.removeChild(this.elements[i])
    }
    this.elements = []
}
// var snack = new Snake()
// snack.render(map)
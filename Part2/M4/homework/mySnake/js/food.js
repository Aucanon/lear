function Food(){
    this.width = 20
    this.height = 20
    this.x =  0
    this.y =  0
    this.color = 'green'
    this.elements = []
}
Food.prototype.render = function(map){
    let ele = document.createElement('div')
    this.x = getRandomInt(0,map.clientWidth / this.width - 1) * this.width
    this.y = getRandomInt(0,map.clientHeight / this.height - 1) * this.height
    ele.style.width = this.width + 'px'
    ele.style.height = this.height + 'px'
    ele.style.left = this.x + 'px'
    ele.style.top = this.y + 'px'
    ele.style.backgroundColor = this.color
    ele.style.position = "absolute"
    map.appendChild(ele)
    this.elements.push(ele)
    console.log(this.elements);
}

Food.prototype.remove = function(map,i){
    map.removeChild(this.elements[i])
    this.elements.splice(i,1)
}

let map = document.getElementById('map')
let food = new Food()
food.render(map)
food.render(map)
food.render(map)

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //不含最大值，含最小值
}
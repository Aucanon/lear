var lunbo = document.getElementById("lunbo")
var list = lunbo.children
var btnLeft = document.getElementById("btn-left")
var btnRight = document.getElementById("btn-right")
var dian = document.getElementById("dian")
var list2 = dian.children

var timer = null
var nowLeft = 0
var index = 0

lunbo.addEventListener('mouseover',function(){
    clearInterval(timer)
})
dian.addEventListener('mouseover',function(){
    clearInterval(timer)
})
btnLeft.addEventListener('mouseover',function(){
    clearInterval(timer)
})
btnRight.addEventListener('mouseover',function(){
    clearInterval(timer)
})

lunbo.addEventListener('mouseout',function(){
    timer = setInterval(changeRight,1000)
})
dian.addEventListener('mouseout',function(){
    timer = setInterval(changeRight,1000)
})
btnLeft.addEventListener('mouseout',function(){
    timer = setInterval(changeRight,1000)
})
btnRight.addEventListener('mouseout',function(){
    timer = setInterval(changeRight,1000)
})

timer = setInterval(changeRight,1000)

btnRight.addEventListener('click',changeRight)
btnLeft.addEventListener('click',changeLeft)



function changeRight() {
    nowLeft -= 100
    index++
    if(nowLeft < -400){
        nowLeft = 0
    }
    if(index > 4){
        index = 0
    }
    lunbo.style.left = nowLeft + '%'
    for (var i = 0 ; i < list.length ; i++) {
        list2[i].className = "";
    }
    list2[index].className = "current";
    
}
function changeLeft() {
    index--
    if(nowLeft == 0){
        nowLeft = -400
    }else{
        nowLeft += 100
    }
    
    if(index < 0){
        index = 4
    }
    lunbo.style.left = nowLeft + '%'
    for (var i = 0 ; i < list.length ; i++) {
        list2[i].className = "";
    }
    // 保留自己
    list2[index].className = "current";
    
}
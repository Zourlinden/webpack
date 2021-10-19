import $ from 'jquery'
// 导入样式(在webpack中，一切皆模块，都可以通过es6导入语法进行导入和使用)
import './css/index.css'
import './css/index.less'

// 导入 src/js/test/info.js
import './js/test/infos.js'

// 1、导入图片，得到图片文件
import logo from './images/logo.jpg'
// 2、给img标签的 src 动态赋值
$('.box').attr('src', logo)
$(function(){
    $('li:odd').css('background-color','yellow')
    $('li:even').css('background-color','cyan')
})

// 定义装饰器函数
function info(target){
    target.info = "Person info."
}
// 定义一个普通的类
@info
class Person{}

console.log(Person.info)
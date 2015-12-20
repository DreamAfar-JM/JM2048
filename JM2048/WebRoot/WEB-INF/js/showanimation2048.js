/**
 * Created by Administrator on 2014-11-02.
 */
function showNumberWithAnimation(i, j, randNumber) {

    var numberCell = $("#number-cell-" + i + "-" + j);
    //背景色
    numberCell.css('background-color', getNumberBackgroundColor(randNumber));
    //前景色
    numberCell.css('color', getNumberColor(randNumber));
    //显示
  //  numberCell.text(randNumber);
    var text=getTextValue(randNumber);
    numberCell.text(text);

    //使用jQuery的动画效果
    /*
     *animate() 方法执行 CSS 属性集的自定义动画。
     该方法通过CSS样式将元素从一个状态改变为另一个状态。
     CSS属性值是逐渐改变的，这样就可以创建动画效果。
     * */
    numberCell.animate({
        width: "100px",
        height: "100px",
        top: getPosTop(i, j),
        left: getPosLeft(i, j)
    }, 50);
}
/*
 * 从board[fromx][fromy]位置移动到board[tox][toy]位置
 * */
function showMoveAnimation(fromx, fromy, tox, toy) {
    var numberCell = $('#number-cell-' + fromx + '-' + fromy);
    numberCell.animate(
        {
            top: getPosTop(tox, toy),
            left: getPosLeft(tox, toy)
        }, 150);
}
function updateScore(score)
{
    $('#score').text(score);
}
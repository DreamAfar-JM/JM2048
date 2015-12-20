/**
 * Created by Administrator on 2014-11-02.
 */
var board = new Array();
var score = 0;
var myPosNumber = 2;
var hasConflicted = new Array();

$(document).ready(function () {
    newgame();
    gameover();
});

function newgame() {
    $('#gameOver').css("display","none");
//初始化棋盘格
    init();
//随机在两个格子里生成数字
    generateOneNumber();
    generateOneNumber();
}
function init() {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            //获取元素
            var gridCell = $("#grid-cell-" + i + "-" + j);
            //根据坐标信息算出top值和left值
            gridCell.css("top", getPosTop(i, j));
            gridCell.css("left", getPosLeft(i, j));
        }
    }
    //初始化board
    for (var i = 0; i < 4; i++) {
        //board成为二维数组
        board[i] = new Array();
        hasConflicted[i] = new Array();
        for (var j = 0; j < 4; j++) {
            //初始化board的值为0
            board[i][j] = 0;
            hasConflicted[i][j] = false;
        }
    }
    updateBoardView();
    score = 0;
}
//根据board变量的值对前端numberCell元素进行操作
//用户每一次操作，board中的值都要发生变化，则要调用此方法
function updateBoardView() {
    //删除已有的number-cell元素
    $(".number-cell").remove();
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            //动态生成number-cell:给每一个块元素附上一个number-cell
            $("#grid-container").append('<div class="number-cell" id="number-cell-' + i + '-' + j + '"></div>');
            //取得当前number-cell
            var theNumberCell = $('#number-cell-' + i + '-' + j);

            //初始化board的每一个值均为0
            if (board[i][j] == 0) {
                //当board的值为0时，不进行显示；
                theNumberCell.css('width', '0px');
                theNumberCell.css('height', '0px');
                theNumberCell.css('top', getPosTop(i, j) + 50);
                theNumberCell.css('left', getPosLeft(i, j) + 50);

            } else {
                theNumberCell.css('width', '100px');
                theNumberCell.css('height', '100px');
                theNumberCell.css('top', getPosTop(i, j));
                theNumberCell.css('left', getPosLeft(i, j));

                //根据数字更换背景颜色
                theNumberCell.css('background-color', getNumberBackgroundColor(board[i][j]));
                //更换前景色
                theNumberCell.css('color', getNumberColor(board[i][j]));
                //显示数字的值
              //theNumberCell.text(board[i][j]);
                var text=getTextValue(board[i][j]);
                theNumberCell.text(text);
                //更新职位
                var newPosNumber = board[i][j];
                var position = $('#position');
                //如果新职位高于原来的职位,则替换原职务
                if(newPosNumber>myPosNumber){
                    myPosNumber = newPosNumber;
                    position.text(getTextValue(myPosNumber));
                }
            }
            hasConflicted[i][j] = false;
        }
    }
}
function generateOneNumber() {
    //nospace()函数：检测board是否有空余位置，没有空余位置则返回true
    if (nospace(board)) {
        return false;
    }
    //随机一个位置
    //Math.random()产生0~1之间的浮点随机数
    //Math.floor()向下取整：直接去掉小数部分
    //parseInt()转化为整型
    var randx = parseInt(Math.floor(Math.random() * 4));
    var randy = parseInt(Math.floor(Math.random() * 4));
    /*
     //死循环，直到生成一个空闲位置的坐标
     while (true) {
     //判断随机生成的位置[randx,randy]是否是空闲位置
     if (board[randx][randy] == 0) {
     break;
     }
     randx = parseInt(Math.floor(Math.random() * 4));
     randy = parseInt(Math.floor(Math.random() * 4));
     }*/
    var times = 0;
    while (times < 50) {
        if (board[randx][randy] == 0) {
            break;
        }
        randx = parseInt(Math.floor(Math.random() * 4));
        randy = parseInt(Math.floor(Math.random() * 4));

        times++;
    }
    //如果50次循环后没有生成可用位置
    if (times == 50) {
        for (var i = 0; i < 4; i++) {
            for (var j = 1; j < 4; j++) {
                if (board[i][j] == 0) {
                    randx = i;
                    randy = j;
                }
            }
        }

    }
//随机一个数字
//以 1/2 概率生成2或者4
    var randNumber = Math.random() < 0.5 ? 2 : 4;
//在生成的随机位置上显示随机数字
    board[randx][randy] = randNumber;
    //动画效果显示数字
    showNumberWithAnimation(randx, randy, randNumber);

    return true;
}
//根据玩家按键反应
$(document).keydown(function (event) {
    switch (event.keyCode) {
        case 37://left
            //根据moveLeft()函数返回值 判断是否向左进行了移动
            if (moveLeft()) {
                //向左发生移动后，随机生成新的数字2或者4
                setTimeout("generateOneNumber()", 210);
                //判断向左移动后，是否游戏结束
                setTimeout("isgameover()", 300);
            }
            break;
        case 38://up
            //根据moveUp()函数返回值 判断是否向上进行了移动
            if (moveUp()) {
                //向上发生移动后，随机生成新的数字2或者4
                setTimeout("generateOneNumber()", 210);
                //判断向上移动后，是否游戏结束
                setTimeout("isgameover()", 300);
            }
            break;
        case 40://down
            //根据moveDown()函数返回值 判断是否向下进行了移动
            if (moveDown()) {
                //向下发生移动后，随机生成新的数字2或者4
                setTimeout("generateOneNumber()", 210);
                //判断向下移动后，是否游戏结束
                setTimeout("isgameover()", 300);
            }
            break;
        case 39://right
            //根据moveRight()函数返回值 判断是否向右进行了移动
            if (moveRight()) {
                //向右发生移动后，随机生成新的数字2或者4
                setTimeout("generateOneNumber()", 210);
                //判断向右移动后，是否游戏结束
                setTimeout("isgameover()", 300);
            }
            break;
        default://default
            break;
    }
});
function isgameover() {
    //判断是否无法移动了
    if (nospace(board) && nomove(board)) {
        gameover();
    }
}
function gameover() {
    $('#gameOver').show(500);
}
//向左移动
function moveLeft() {
    //canMoveLeft()函数：判断当前情况下是否可以向左移动，可以移动则返回true
    if (!canMoveLeft(board)) {
        return false;
    }
    //向左移动
    for (var i = 0; i < 4; i++)
        for (var j = 1; j < 4; j++) {
            if (board[i][j] != 0) {
                //对当前位置的左侧的所有元素进行考察
                for (var k = 0; k < j; k++) {
                    //board[i][k]处为0，并且从当前位置（board[i][j]）到board[i][k]位置中间没有障碍物（中间都为0）
                    //noBlockHorizontal（i, k, j, board）函数：在第i行上，从第k列到第j列中间是否没有障碍物
                    if (board[i][k] == 0 && noBlockHorizontal(i, k, j, board)) {
                        //向左进行一次移动
                        //showMoveAnimation(i, j, i, k)从board[i][j]位置移动到board[i][k]位置
                        showMoveAnimation(i, j, i, k);
                        //移动以后，赋值
                        board[i][k] = board[i][j];
                        board[i][j] = 0;

                        continue;
                    }
                    //当前位置（board[i][j]）和board[i][k]上的值相等，并且并且从当前位置到board[i][k]位置中间没有障碍物（中间都为0）
                    else if (board[i][k] == board[i][j] && noBlockHorizontal(i, k, j, board) && !hasConflicted[i][k]) {
                        //向左移动
                        //showMoveAnimation(i, j, i, k)从board[i][j]位置移动到board[i][k]位置
                        showMoveAnimation(i, j, i, k);
                        //数字相加
                        board[i][k] += board[i][j];
                        board[i][j] = 0;

                        //加分
                        score += board[i][k];
                        //更新前台分数
                        updateScore(score);

                        //发生碰撞后
                        hasConflicted[i][k] = true;
                        continue;
                    }
                }
            }
        }
    //刷新
    setTimeout("updateBoardView()", 150);
    return true;
}
//向右移动
function moveRight() {
    //canMoveRight()函数：判断当前情况下是否可以向右移动，可以移动则返回true
    if (!canMoveRight(board)) {
        return false;
    }
    //向右移动
    for (var i = 0; i < 4; i++)
        for (var j = 2; j >= 0; j--) {
            if (board[i][j] != 0) {
                //对当前位置的右侧的所有元素进行考察
                for (var k = 3; k > j; k--) {
                    //board[i][k]处为0，并且从当前位置（board[i][j]）到board[i][k]位置中间没有障碍物（中间都为0）
                    //noBlockHorizontal（i, k, j, board）函数：在第i行上，从第k列到第j列中间是否没有障碍物
                    if (board[i][k] == 0 && noBlockHorizontal(i, j, k, board)) {
                        //向右进行一次移动
                        //showMoveAnimation(i, j, i, k)从board[i][j]位置移动到board[i][k]位置
                        showMoveAnimation(i, j, i, k);
                        //移动以后，赋值
                        board[i][k] = board[i][j];
                        board[i][j] = 0;

                        continue;
                    }
                    //当前位置（board[i][j]）和board[i][k]上的值相等，并且并且从当前位置到board[i][k]位置中间没有障碍物（中间都为0）
                    else if (board[i][k] == board[i][j] && noBlockHorizontal(i, j, k, board) && !hasConflicted[i][k]) {
                        //向右移动
                        //showMoveAnimation(i, j, i, k)从board[i][j]位置移动到board[i][k]位置
                        showMoveAnimation(i, j, i, k);
                        //数字相加
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        //加分
                        score += board[i][k];
                        //更新前台分数
                        updateScore(score);

                        hasConflicted[i][k] = true;
                        continue;
                    }
                }
            }
        }
    //刷新
    setTimeout("updateBoardView()", 150);
    return true;
}
//向上移动
function moveUp() {
    //canMoveUp()函数：判断当前情况下是否可以向上移动，可以移动则返回true
    if (!canMoveUp(board)) {
        return false;
    }
    //向上移动
    for (var j = 0; j < 4; j++)
        for (var i = 1; i < 4; i++) {
            if (board[i][j] != 0) {
                //对当前位置的上方的所有元素进行考察
                for (var k = 0; k < i; k++) {
                    //board[i][k]处为0，并且从当前位置（board[i][j]）到board[i][k]位置中间没有障碍物（中间都为0）
                    //noBlockHorizontal（i, k, j, board）函数：在第i行上，从第k列到第j列中间是否没有障碍物
                    if (board[k][j] == 0 && noBlockVertical(j, i, k, board)) {
                        //向右进行一次移动
                        //showMoveAnimation(i, j, i, k)从board[i][j]位置移动到board[i][k]位置
                        showMoveAnimation(i, j, k, j);
                        //移动以后，赋值
                        board[k][j] = board[i][j];
                        board[i][j] = 0;

                        continue;
                    }
                    //当前位置（board[i][j]）和board[i][k]上的值相等，并且并且从当前位置到board[i][k]位置中间没有障碍物（中间都为0）
                    else if (board[k][j] == board[i][j] && noBlockVertical(j, i, k, board) && !hasConflicted[k][j]) {
                        //向右移动
                        //showMoveAnimation(i, j, i, k)从board[i][j]位置移动到board[i][k]位置
                        showMoveAnimation(i, j, k, j);
                        //数字相加
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        //加分
                        score += board[k][j];
                        //更新前台分数
                        updateScore(score);

                        hasConflicted[i][k] = true;
                        continue;
                    }
                }
            }
        }
    //刷新
    setTimeout("updateBoardView()", 150);
    return true;
}
//向下移动
function moveDown() {
    //canMoveDown()函数：判断当前情况下是否可以向上移动，可以移动则返回true
    if (!canMoveDown(board)) {
        return false;
    }
    //向下移动
    for (var j = 0; j < 4; j++)
        for (var i = 2; i >= 0; i--) {
            if (board[i][j] != 0) {
                //对当前位置的下方的所有元素进行考察
                for (var k = 3; k > i; k--) {
                    //board[k][j]处为0，并且从当前位置（board[i][j]）到board[k][j]位置中间没有障碍物（中间都为0）
                    //noBlockHorizontal（i, k, j, board）函数：在第i行上，从第k列到第j列中间是否没有障碍物
                    if (board[k][j] == 0 && noBlockVertical(j, i, k, board)) {
                        //向右进行一次移动
                        //showMoveAnimation(i, j, k, j)从board[i][j]位置移动到board[k][j]位置
                        showMoveAnimation(i, j, k, j);
                        //移动以后，赋值
                        board[k][j] = board[i][j];
                        board[i][j] = 0;

                        continue;
                    }
                    //当前位置（board[i][j]）和board[i][k]上的值相等，并且并且从当前位置到board[i][k]位置中间没有障碍物（中间都为0）
                    else if (board[k][j] == board[i][j] && noBlockVertical(j, i, k, board) && !hasConflicted[k][j]) {
                        //向下移动
                        //showMoveAnimation(i, j, k, j)从board[i][j]位置移动到board[k][j]位置
                        showMoveAnimation(i, j, k, j);
                        //数字相加
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        //加分
                        score += board[k][j];
                        //更新前台分数
                        updateScore(score);

                        hasConflicted[i][k] = true;
                        continue;
                    }
                }
            }
        }
    //刷新
    setTimeout("updateBoardView()", 150);
    return true;
}



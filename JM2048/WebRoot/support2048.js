/**
 * Created by Administrator on 2014-11-02.
 */
function getPosTop(i, j) {
    return 20 + i * 120;
}
function getPosLeft(i, j) {
    return 20 + j * 120;
}
function getTextValue(number){
    switch(number){
        case 2: return "小白"; break;
        case 4: return "实习僧"; break;
        case 8: return "码农"; break;
        case 16: return "程序猿"; break;
        case 32: return "攻城狮"; break;
        case 64: return "项目经理"; break;
        case 128: return "部门主管"; break;
        case 256: return "经理秘书"; break;
        case 512: return "总经理"; break;
        case 1024: return "执行官"; break;
        case 2048: return "董事长"; break;
        case 4096: return "嘉诚女婿"; break;
        case 8192: return "盖茨基友"; break;
        case 16384: return "~神~"; break;
        case 32768: return "~超神~"; break;
        default: return "END";break;
    }
    return "black";
}

function getNumberBackgroundColor(number) {
    switch (number) {
        case 2:
            return "#eee4da";
            break;
        case 4:
            return "#ede0c8";
            break;
        case 8:
            return "#f2b179";
            break;
        case 16:
            return "#f59563";
            break;
        case 32:
            return "#f07c5f";
            break;
        case 64:
            return "#ff5e3b";
            break;
        case 128:
            return "#edcf72";
            break;
        case 256:
            return "#fd0361";
            break;
        case 512:
            return "#9c0";
            break;
        case 1024:
            return "#33b5e5";
            break;
        case 2048:
            return "#09c";
            break;
        case 4096:
            return "#a6c";
            break;
        case 8192:
            return "#93c";
            break;
        case 16384:
            return "#888";
            break;
        default:
            return "#111";
            break;
    }
    return "black";
}
function getNumberColor(number) {
    if (number <= 4) {
        return "#776e65";
    }
    return "white";
}

//检查棋盘格是否有空余空间，没有位置则返回true,
function nospace(board) {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            //board有空余位置时，返回false
            if (board[i][j] == 0) {
                return false;
            }
        }
    }
    return true;
}
/*
 * 此函数用来判断是否可以向左移动
 * 1.左边是否有数字？
 * 2.左边数字是否和自己相等？
 * */
function canMoveLeft(board) {
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j < 4; j++) {
            if (board[i][j] != 0) {
                //左侧元素为0或者左侧元素的值和自身相等，则可以向左移动
                if (board[i][j - 1] == 0
                    || board[i][j - 1] == board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}
function canMoveRight(board) {
    for (var i = 0; i < 4; i++) {
        for (var j = 2; j >= 0; j--) {
            if (board[i][j] != 0) {
                //左侧元素为0或者左侧元素的值和自身相等，则可以向左移动
                if (board[i][j + 1] == 0
                    || board[i][j + 1] == board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}
function canMoveUp(board) {
    for (var j = 0; j < 4; j++) {
        for (var i = 1; i < 4; i++) {
            if (board[i][j] != 0) {
                //左侧元素为0或者左侧元素的值和自身相等，则可以向左移动
                if (board[i - 1][j] == 0
                    || board[i - 1][j] == board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}
function canMoveDown(board) {
    for (var j = 0; j < 4; j++) {
        for (var i = 2; i >= 0; i--) {
            if (board[i][j] != 0) {
                //左侧元素为0或者左侧元素的值和自身相等，则可以向左移动
                if (board[i + 1][j] == 0
                    || board[i + 1][j] == board[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}

/*
 * 函数说明：判断在第row行上，从第col1列到第col2列中间是否没有障碍物
 */
function noBlockHorizontal(row, col1, col2, board) {
    for (var i = col1 + 1; i < col2; i++) {
        //有障碍物
        if (board[row][i] != 0) {
            return false;
        }
    }
    return true;
}
function noBlockVertical(col, row1, row2, board) {
    for (var j = row1 + 1; j < row2; j++) {
        //有障碍物
        if (board[j][col] != 0) {
            return false;
        }
    }
    return true;
}
function nomove(board) {
    if (canMoveLeft(board) || canMoveRight(board) || canMoveUp(board) || canMoveDown(board)) {
        return false;
    }
    return true;
}
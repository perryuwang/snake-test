// 获取画布和绘图上下文
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// 画布设置
const canvasSize = 400;
canvas.width = canvasSize;
canvas.height = canvasSize;

// 蛇的初始设置
const blockSize = 20;
let snake = [
    { x: 10 * blockSize, y: 10 * blockSize }
];

// 食物设置
let food = {
    x: Math.floor(Math.random() * (canvasSize / blockSize)) * blockSize,
    y: Math.floor(Math.random() * (canvasSize / blockSize)) * blockSize
};

// 方向设置
let direction = 'right';

// 游戏循环
function gameLoop() {
    // 清除画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 绘制蛇
    drawSnake();

    // 绘制食物
    drawFood();

    // 移动蛇
    moveSnake();

    // 检查碰撞
    checkCollision();

    // 定时调用游戏循环
    setTimeout(gameLoop, 100);
}

// 绘制蛇
function drawSnake() {
    snake.forEach(segment => {
        ctx.fillStyle = 'green';
        ctx.fillRect(segment.x, segment.y, blockSize, blockSize);
    });
}

// 绘制食物
function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, blockSize, blockSize);
}

// 移动蛇
function moveSnake() {
    let head = { ...snake[0] };
    switch (direction) {
        case 'right':
            head.x += blockSize;
            break;
        case 'left':
            head.x -= blockSize;
            break;
        case 'up':
            head.y -= blockSize;
            break;
        case 'down':
            head.y += blockSize;
            break;
    }
    snake.unshift(head);

    // 检查是否吃到食物
    if (head.x === food.x && head.y === food.y) {
        // 生成新的食物
        food = {
            x: Math.floor(Math.random() * (canvasSize / blockSize)) * blockSize,
            y: Math.floor(Math.random() * (canvasSize / blockSize)) * blockSize
        };
    } else {
        // 移除蛇尾
        snake.pop();
    }
}

// 检查碰撞
function checkCollision() {
    let head = snake[0];

    // 检查是否撞到墙壁
    if (head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize) {
        alert('游戏结束！');
        location.reload();
    }

    // 检查是否撞到自己
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            alert('游戏结束！');
            location.reload();
        }
    }
}

// 监听键盘事件
document.addEventListener('keydown', function (event) {
    switch (event.key) {
        case 'ArrowRight':
            if (direction !== 'left') direction = 'right';
            break;
        case 'ArrowLeft':
            if (direction !== 'right') direction = 'left';
            break;
        case 'ArrowUp':
            if (direction !== 'down') direction = 'up';
            break;
        case 'ArrowDown':
            if (direction !== 'up') direction = 'down';
            break;
    }
});

// 启动游戏循环
gameLoop();
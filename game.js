var game = new Phaser.Game(600, 480, Phaser.AUTO, 'game', { preload: preload, create: create, update: update });
var paddle, ball;

function preload() {
}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.checkCollision.left = false;
    game.physics.arcade.checkCollision.right = false;
    cursors = game.input.keyboard.createCursorKeys();
    var bmd = game.add.bitmapData(20,20 );

    bmd.circle(10, 10, 10, '#fff');

    ball = game.add.sprite(game.world.centerX, game.world.centerY, bmd);
    game.physics.enable(ball, Phaser.Physics.ARCADE);
    ball.anchor.set(0.5,0.5);
    ball.checkWorldBounds = true;
    ball.body.velocity.setTo(350, 350);
    ball.body.collideWorldBounds = true;
    ball.body.bounce.set(1,1);
    ball.events.onOutOfBounds.add(ballLost, this);

    var paddle = game.add.bitmapData(10, 80);
    paddle.rect(0, 0, 10, 80, "#fff");
    
    paddle1 = game.add.sprite(50, 50, paddle);
    game.physics.enable(paddle1, Phaser.Physics.ARCADE);
    paddle1.anchor.set(0.5,0.5)
    paddle1.checkWorldBounds = true;
    paddle1.body.collideWorldBounds = true;
    paddle1.body.bounce.set(1,1);
    paddle1.body.immovable = true;

    paddle2 = game.add.sprite(1.9 * game.world.centerX, game.world.centerY, paddle);
    game.physics.enable(paddle2, Phaser.Physics.ARCADE);
    paddle2.anchor.set(0.5,0.5)
    paddle2.checkWorldBounds = true;
    paddle2.body.collideWorldBounds = true;
    paddle2.body.bounce.set(1,1);
    paddle2.body.immovable = true;
}

function ballLost() {
    game.state.restart();
}

function ballHitPaddle(_ball, _paddle) {
    var diff = 0;

    if (_ball.x < _paddle.x)
    {
        //  Ball is on the left-hand side of the paddle
        diff = _paddle.x - _ball.x;
        _ball.body.velocity.x = (-10 * diff);
    }
    else if (_ball.x > _paddle.x)
    {
        //  Ball is on the right-hand side of the paddle
        diff = _ball.x -_paddle.x;
        _ball.body.velocity.x = (10 * diff);
    }
    else
    {
        //  Ball is perfectly in the middle
        //  Add a little random X to stop it bouncing straight up!
        _ball.body.velocity.x = 2 + Math.random() * 8;
    }
}

function update() {
    game.physics.arcade.collide(ball, paddle1, ballHitPaddle, null, this );
    game.physics.arcade.collide(ball, paddle2, ballHitPaddle, null, this );
    if (ball.y > 40 && ball.y < 440) {
        paddle2.y = ball.y;
        paddle1.y = ball.y;
    }

    if (cursors.left.isDown)
    {
        paddle1.body.velocity.y = -300;
    }
    else if (cursors.right.isDown)
    {
        paddle1.body.velocity.y = 300;
    } 
    else
    {
        paddle1.body.velocity.setTo(0, 0);
    }
}

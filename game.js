var game = new Phaser.Game(800, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });
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
    ball.body.velocity.setTo(250, 250);
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

function update() {
    game.physics.arcade.collide(paddle1, ball);
    game.physics.arcade.collide(paddle2, ball);
    paddle2.y = ball.y;

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
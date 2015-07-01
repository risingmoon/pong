var BasicGame = {
    WIDTH: 600,
    HEIGHT: 480,
    PADDLE_WIDTH: 10,
    PADDLE_HEIGHT: 50,
    BALL_RADIUS: 5,
    BALL_VELOCITY: 300,
    COLOR: "#fff",
    EDGE_DISTANCE: 50,
    STYLE: {
	font: "32px PixelMix",
	fill:  "#fff",
	align: "center" },
}

BasicGame.Game = function(game){
}

BasicGame.Game.prototype = {
    preload: function() {
       //this.load.bitmapFont('desyrel', 'assets/fonts/bitmapFonts/desyrel.png', 'assets/fonts/bitmapFonts/desyrel.xml');
    },
    create: function() {
        this.physics.startSystem(Phaser.Physics.ARCADE);
        this.physics.arcade.checkCollision.left = false;
        this.physics.arcade.checkCollision.right = false;
	var style = { font: "32px PixelMix", fill:  BasicGame.COLOR, align: "center" };
        this.title = this.add.text(game.world.centerX, game.world.centerY*0.5, "PONG", style);
	this.title.anchor.set(0.5, 0.5);
        this.input.onDown.addOnce(this.start, this);

        bmd = game.add.bitmapData(BasicGame.BALL_RADIUS*2, BasicGame.BALL_RADIUS*2);
        bmd.circle(BasicGame.BALL_RADIUS, BasicGame.BALL_RADIUS, BasicGame.BALL_RADIUS, BasicGame.COLOR);
        this.ball = game.add.sprite(game.world.centerX, game.world.centerY, bmd);
        this.physics.enable(this.ball, Phaser.Physics.ARCADE);
        this.ball.anchor.set(0.5,0.5);
        this.ball.checkWorldBounds = true;
        this.ball.body.collideWorldBounds = true;
        this.ball.body.bounce.set(1,1);
        this.ball.events.onOutOfBounds.add(this.ballLost, this);
	this.ball.visible = false;

        var paddle = game.add.bitmapData(BasicGame.PADDLE_WIDTH, BasicGame.PADDLE_HEIGHT);
        paddle.rect(0, 0, BasicGame.PADDLE_WIDTH, BasicGame.PADDLE_HEIGHT, BasicGame.COLOR);
        
        this.paddle1 = game.add.sprite(BasicGame.EDGE_DISTANCE, game.world.centerY, paddle);
        this.physics.enable(this.paddle1, Phaser.Physics.ARCADE);
        this.paddle1.anchor.set(0.5,0.5)
        this.paddle1.checkWorldBounds = true;
        this.paddle1.body.collideWorldBounds = true;
        this.paddle1.body.bounce.set(1,1);
        this.paddle1.body.immovable = true;

        this.paddle2 = game.add.sprite(BasicGame.WIDTH-BasicGame.EDGE_DISTANCE, game.world.centerY, paddle);
        this.physics.enable(this.paddle2, Phaser.Physics.ARCADE);
        this.paddle2.anchor.set(0.5,0.5)
        this.paddle2.checkWorldBounds = true;
        this.paddle2.body.collideWorldBounds = true;
        this.paddle2.body.bounce.set(1,1);
        this.paddle2.body.immovable = true;

	var score = 50;
	this.score1 = 0;
	this.score2 = 0;
	this.scoreText1 = game.add.text(game.world.centerX-score, game.world.centerY*0.25, this.score1.toString(), style);
	this.scoreText1.anchor.set(0.5, 0.5);
	this.scoreText2 = game.add.text(game.world.centerX+score, game.world.centerY*0.25, this.score2.toString(), style);
	this.scoreText2.anchor.set(0.5, 0.5);
    },
    start: function() {
	this.title.visible = false;
	this.serve();
    },
    serve: function() {
	this.ball.reset(game.world.centerX, game.world.centerY);
        this.ball.body.velocity.setTo(BasicGame.BALL_VELOCITY, BasicGame.BALL_VELOCITY * Math.random());
    },
    ballLost: function() {
        if (this.ball.x < this.paddle1.x) {
	    this.score2++;
	    this.scoreText2.setText(this.score2.toString());    
	} else {
	
	    this.score1++;
	    this.scoreText1.setText(this.score1.toString());    
	}
	this.check();
	this.ball.kill();
        this.input.onDown.addOnce(this.serve, this);
    },
    ballHitPaddle: function(ball, paddle) {
    },
    check: function() {
        player1Win = this.score1 == 1;
	player2Win = this.score2 == 1;
        if ( player1Win || player2Win ) {
	    endText = "You ";
	    endText += player1Win ? "Win":"Lose";
	    this.endText = this.add.text(game.world.centerX, game.world.centerY, endText, BasicGame.STYLE);
	    this.endText.anchor.set(0.5, 0.5);
	    this.input.onDown.addOnce(this.restart, this);
	}
    },
    restart: function() {
        this.state.restart();
    },
    update: function() {
        this.physics.arcade.collide(this.ball, this.paddle1);
        this.physics.arcade.collide(this.ball, this.paddle2);
        PADDLE_TOP_LIMIT = BasicGame.PADDLE_HEIGHT * 0.5,
        PADDLE_BOTTOM_LIMIT =  BasicGame.HEIGHT - BasicGame.PADDLE_HEIGHT * 0.5
        mouseY = this.input.y
        ////console.log(this.input.speed);
        if ( mouseY > PADDLE_TOP_LIMIT && mouseY < PADDLE_BOTTOM_LIMIT) {
            this.paddle1.y = mouseY;
        }
        if (this.ball.y > PADDLE_TOP_LIMIT && this.ball.y < PADDLE_BOTTOM_LIMIT ) {
        //    //this.paddle2.y = this.ball.y + Math.random() * 100;
            var diff = this.ball.y - this.paddle2.y;
            if (diff < 100) {
               this.paddle2.body.velocity.y =  6 * diff;
            }//paddle1.y = ball.y;
        }
    
        //else
        //{
        //    this.paddle1.body.velocity.setTo(0, 0);
        //}
    }
    
}

var game = new Phaser.Game(BasicGame.WIDTH, BasicGame.HEIGHT, Phaser.AUTO, 'game');
game.state.add('play', BasicGame.Game);
game.state.start('play');

    SkiFree.Game = function(game) {


    };

    SkiFree.Game.prototype = {

        create: function() {
            this.game.stage.backgroundColor = '#ffffff';
            this.player = this.game.add.sprite(250, 100, 'square');
            this.player.anchor.setTo(0.5, 0.5);

            this.trees = this.game.add.group();
            this.trees2 = this.game.add.group();

            this.game.physics.startSystem(Phaser.Physics.ARCADE);
            this.game.physics.arcade.enable([this.player, this.trees]);

            this.game.world.setBounds(0, 0, this.game.width, 2000);
            this.game.camera.follow(this.player);

            this.addTrees();
            this.trees2.y = 1500;

        },

        update: function() {

            this.playerController();
            this.game.physics.arcade.collide(this.player, this.trees, this.dead, null, this);

            // wrapping
            this.buildSlopes();

        },

        buildSlopes: function() {
            if(!this.wrapping && this.player.y > this.game.height) {
                this.game.world.wrap(this.player, -(this.game.height/2), false, false, true);
                this.addTrees();
                this.wrapping = true;
            }
        },

        dead: function() {
            console.error('YOU DEAD');
        },

        addTrees: function() {

            this.trees.enableBody = true;

            var tree;

            for (var i = 1; i < 30; i += 1) {
                tree = this.trees.create(this.game.world.randomX, this.game.world.randomY, 'tree');
                tree.body.immovable = true;
            }
            for (var j = 1; j < 30; j += 1) {
                tree = this.trees2.create(this.game.world.randomX, this.game.world.randomY, 'tree2');
                //tree.body.immovable = true;
            }
        },

        playerController: function() {

            this.cursors = this.game.input.keyboard.createCursorKeys();
            // Touch
            var pointerplus = this.game.input.activePointer.x + 20,
                pointerminus = this.game.input.activePointer.x - 20;
            if (this.game.input.activePointer.isDown) {
                if (this.player.x < this.game.input.activePointer.x) {
                    this.player.body.velocity.x = 350;
                } else if (this.player.x > this.game.input.activePointer.x) {
                    this.player.body.velocity.x = -350;
                }
                if (this.between(this.player.x, pointerminus, pointerplus)) {
                    this.player.body.velocity.x = 0;
                }
            } else {
                this.player.body.velocity.x = 0;
                this.player.body.velocity.y = 0;
            }

            // Keyboard
            if (this.cursors.left.isDown) {
                this.player.body.velocity.x = -350;
            } else if (this.cursors.right.isDown) {
                this.player.body.velocity.x = 350;
            }

            if (this.cursors.down.isDown) {
                this.player.body.velocity.y = 450;
            } else if (this.cursors.up.isDown) {
                this.player.body.velocity.y = -450;
            }
        },

        between: function(x, min, max) {
            return x >= min && x <= max;
        },

        quitGame: function(pointer) {

            //  Here you should destroy anything you no longer need.
            //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

            //  Then let's go back to the main menu.
            this.state.start('MainMenu');

        }

    };

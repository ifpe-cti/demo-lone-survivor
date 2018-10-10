/*
MIT License

Copyright (c) 2018 Jean Bispo, Marcelino Barros, Nadson Cavalcante e Tiago Eduardo

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 520 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var player;
var enemie;
var platforms;
var cursors;
var controls = {};
var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('ceu','img/Céu.png');
    this.load.image('chao','img/chao 1.png');
    this.load.image('arvore','img/arvore.png');
    this.load.image('folhas','img/Folhas.png');
    this.load.image('mato','img/Mato.png');
    this.load.spritesheet('amriel','img/Amriel Sprites Sword.png', { frameWidth: 92.2, frameHeight: 125 });
    //this.load.spritesheet('dude','img/dude.png'), { frameWidth: 32, frameHeight: 48 };
}

function create ()
{
    this.add.sprite(400,300,'ceu'); 

    platforms = this.physics.add.staticGroup();

    platforms.create(0,585,'chao').refreshBody();
    platforms.create(80,585,'chao');
    platforms.create(160,585,'chao');
    platforms.create(240,585,'chao');
    platforms.create(320,585,'chao');
    platforms.create(400,585,'chao');
    platforms.create(480,585,'chao');
    platforms.create(560,585,'chao');
    platforms.create(640,585,'chao');
    platforms.create(720,585,'chao');
    platforms.create(800,585,'chao');

    this.add.sprite(300,460,'arvore');
    this.add.sprite(660,460,'arvore');

    this.add.sprite(340,560,'folhas');
    this.add.sprite(700,560,'folhas');

    this.add.sprite(180,565,'mato');
    this.add.sprite(570,565,'mato');

    //enemie = this.physics.add.sprite(300, 500, 'dude');
    player = this.physics.add.sprite(100, 500, 'amriel');

    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('amriel', { start: 2, end: 5 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'amriel', frame: 6 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('amriel', { start: 6, end: 9 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'right-sword',
        frames: this.anims.generateFrameNumbers('amriel', { start: 10, end: 10 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'left-sword',
        frames: this.anims.generateFrameNumbers('amriel', { start: 1, end: 1 }),
        frameRate: 10,
        repeat: -1
    });

    cursors = this.input.keyboard.createCursorKeys();
    /*controls = {
        right: this.input.keyboard.addKey(Phaser.keyboard.D),
        left: this.input.keyboard.addKey(Phaser.keyboard.A),
        up: this.input.keyboard.addKey(Phaser.keyboard.W),
        sword: this.input.keyboard.addKey(Phaser.keyboard.SPACE)
    }*/

    this.physics.add.collider(player, platforms);
}

function update ()
{
    if (cursors.left.isDown)
    {
        player.setVelocityX(-160);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);

        player.anims.play('right', true);
    }
    else
    {
        player.setVelocityX(0);

        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-330);
    }
/*
    if (controls.sword.isDown && controls.right.isDown)
    {
        player.setVelocityX(160);
        player.anims.play('right-sword');
    }

    if (controls.sword.isDown && controls.left.isDown)
    {
        player.setVelocityX(-160);
        player.anims.play('left-sword');
    }*/

}
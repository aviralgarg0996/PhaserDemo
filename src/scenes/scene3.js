var group,tween;
export class Scene3 extends Phaser.Scene{
 preload ()
{
    this.load.image('background','assets/sky.png');
    
    this.load.spritesheet('balls', 'assets/balls.png', { frameWidth: 17, frameHeight: 17 });
}

 create ()
{
    var circle = new Phaser.Geom.Circle(400, 300, 220);

    group = this.add.group({ key: 'balls', frame: [0, 1, 5], repeat: 15 });

    Phaser.Actions.PlaceOnCircle(group.getChildren(), circle);

    tween = this.tweens.addCounter({
        from: 220,
        to: 50,
        duration: 1000,
        delay: 100,
        ease: 'Sine.easeInOut',
        repeat: -1,
        yoyo: true
    });
}

 update ()
{
    Phaser.Actions.RotateAroundDistance(group.getChildren(), { x: 400, y: 300 }, 0.02, tween.getValue());
}
}
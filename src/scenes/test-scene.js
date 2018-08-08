    
    var button;
    var background;
    
export class TestScene extends Phaser.Scene{
preload() {
    
        // this.load.spritesheet('button', 'assets/button_sprite_sheet.png', 193, 71);
        this.load.image('background','assets/sky.png');
        this.load.image('gem','assets/ruby.png');
        
    }
 create() {
    
        // this.stage.backgroundColor = '#182d3b';
        background = this.add.tileSprite(0, 0, 1800, 1600, 'background');
        var text = this.add.text(350, 270, '', { font: '16px Courier', fill: 'red' });
        // background = this.add.tileSprite(0, 0, 1800, 1600, 'background');
        var gem = this.add.image(200, 300, 'gem')
        
        gem.setData({ name: 'Red Gem Stone', level: 1, owner: 'Link', 'gold': 50 });
        
            //  Whenever a data value is updated the `changedata` event is fired and we listen for it:
            gem.on('changedata', function (gameObject, key, value) {
        
                text.setText([
                    'Name: ' + gem.getData('name'),
                    'Level: ' + gem.getData('level'),
                    'Value: ' + gem.getData('gold') + ' gold',
                    'Owner: ' + gem.getData('owner')
                ]);
        
            });
        
            //  Change the 'value' property when the mouse is clicked
            this.input.on('pointerdown', function () {
        
                gem.data.values.gold += 50;
        
                if (gem.data.values.gold % 200 === 0)
                {
                    gem.data.values.level++;
                }
        
            });
   
}
}
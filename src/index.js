const messageEl = document.createElement('div');
import { showMessage } from './messager';
import 'phaser';

import { SimpleScene } from './scenes/simple-scene';
import {TestScene} from "./scenes/test-scene"
import {Scene3} from "./scenes/scene3"


showMessage('Game Design!');
messageEl.textContent = 'I was put here by JavaScript!';
document.body.appendChild(messageEl);
var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 300 },
          debug: false
      }
  },
  scene: Scene3
};

new Phaser.Game(config);
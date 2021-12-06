import Controller from '@ember/controller';
import { inject as service } from '@ember/service'

export default class GameController extends Controller {
  @service game;

  get firstPlayer() {
    return this.game.firstPlayer;
  }

  get secondPlayer() {
    return this.game.secondPlayer;
  }
}

import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default class BoardComponent extends Component {
  @service game;

  get board() {
    return this.game.board;
  }

  get gameResult() {
    return this.game.gameResult;
  }

  get selectTile() {
    return this.game.selectTile;
  }

  get resetGame() {
    return this.game.clearBoard;
  }
}

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import click from '@ember/test-helpers/dom/click';

module('Integration | Component | board', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`<Board />`);
  
    // confirm if board has reset button  
    assert.dom(this.element).hasText('Reset');
  });

  test('two players are taking turn in filling the board', async function (assert) {
    await render(hbs`<Board />`);

    // action
    await click('[data-test-id=tile-00]')
    await click('[data-test-id=tile-01]')
    await click('[data-test-id=tile-02]')
    await click('[data-test-id=tile-10]')
    
    // assertion checks
    assert.dom('[data-test-id=tile-00]').hasText('X');
    assert.dom('[data-test-id=tile-01]').hasText('O');
    assert.dom('[data-test-id=tile-02]').hasText('X');
    assert.dom('[data-test-id=tile-10]').hasText('O');
    assert.dom('[data-test-id=tile-11]').hasText('');
    assert.dom('[data-test-id=tile-12]').hasText('');
    assert.dom('[data-test-id=tile-20]').hasText('');
    assert.dom('[data-test-id=tile-21]').hasText('');
    assert.dom('[data-test-id=tile-22]').hasText('');
  });

  test('should not mark occupied tile space', async function (assert) {
    await render(hbs`<Board />`);

    // action
    await click('[data-test-id=tile-00]')
    await click('[data-test-id=tile-00]')
    
    // assertion checks
    assert.dom('[data-test-id=tile-00]').hasText('X');
    assert.dom('[data-test-id=tile-01]').hasText('');
    assert.dom('[data-test-id=tile-02]').hasText('');
    assert.dom('[data-test-id=tile-10]').hasText('');
    assert.dom('[data-test-id=tile-11]').hasText('');
    assert.dom('[data-test-id=tile-12]').hasText('');
    assert.dom('[data-test-id=tile-20]').hasText('');
    assert.dom('[data-test-id=tile-21]').hasText('');
    assert.dom('[data-test-id=tile-22]').hasText('');
  });

  test('first player horizontal win', async function (assert) {
    await render(hbs`<Board />`);

    // action
    await click('[data-test-id=tile-11]')
    await click('[data-test-id=tile-00]')
    await click('[data-test-id=tile-10]')
    await click('[data-test-id=tile-02]')
    await click('[data-test-id=tile-12]')
    
    // assertion checks
    assert.dom('[data-test-id=tile-00]').hasText('O');
    assert.dom('[data-test-id=tile-01]').hasText('');
    assert.dom('[data-test-id=tile-02]').hasText('O');
    assert.dom('[data-test-id=tile-10]').hasText('X');
    assert.dom('[data-test-id=tile-11]').hasText('X');
    assert.dom('[data-test-id=tile-12]').hasText('X');
    assert.dom('[data-test-id=tile-20]').hasText('');
    assert.dom('[data-test-id=tile-21]').hasText('');
    assert.dom('[data-test-id=tile-22]').hasText('');
    assert.dom('[data-test-id=result]').hasText('Banana Pudding won the game!');
  });

  test('second player vertical win', async function (assert) {
    await render(hbs`<Board />`);

    // action
    await click('[data-test-id=tile-11]')
    await click('[data-test-id=tile-02]')
    await click('[data-test-id=tile-01]')
    await click('[data-test-id=tile-12]')
    await click('[data-test-id=tile-20]')
    await click('[data-test-id=tile-22]')
    
    // assertion checks
    assert.dom('[data-test-id=tile-00]').hasText('');
    assert.dom('[data-test-id=tile-01]').hasText('X');
    assert.dom('[data-test-id=tile-02]').hasText('O');
    assert.dom('[data-test-id=tile-10]').hasText('');
    assert.dom('[data-test-id=tile-11]').hasText('X');
    assert.dom('[data-test-id=tile-12]').hasText('O');
    assert.dom('[data-test-id=tile-20]').hasText('X');
    assert.dom('[data-test-id=tile-21]').hasText('');
    assert.dom('[data-test-id=tile-22]').hasText('O');
    assert.dom('[data-test-id=result]').hasText('Strawberry Soup won the game!');
  });

  test('first player diagonal win', async function (assert) {
    await render(hbs`<Board />`);

    // action
    await click('[data-test-id=tile-11]')
    await click('[data-test-id=tile-01]')
    await click('[data-test-id=tile-00]')
    await click('[data-test-id=tile-10]')
    await click('[data-test-id=tile-22]')

    // assertion checks
    assert.dom('[data-test-id=tile-00]').hasText('X');
    assert.dom('[data-test-id=tile-01]').hasText('O');
    assert.dom('[data-test-id=tile-02]').hasText('');
    assert.dom('[data-test-id=tile-10]').hasText('O');
    assert.dom('[data-test-id=tile-11]').hasText('X');
    assert.dom('[data-test-id=tile-12]').hasText('');
    assert.dom('[data-test-id=tile-20]').hasText('');
    assert.dom('[data-test-id=tile-21]').hasText('');
    assert.dom('[data-test-id=tile-22]').hasText('X');
    assert.dom('[data-test-id=result]').hasText('Banana Pudding won the game!');
  });

  test('no more empty tile space', async function (assert) {
    await render(hbs`<Board />`);

    // action
    await click('[data-test-id=tile-00]')
    await click('[data-test-id=tile-10]')
    await click('[data-test-id=tile-01]')
    await click('[data-test-id=tile-02]')
    await click('[data-test-id=tile-11]')
    await click('[data-test-id=tile-21]')
    await click('[data-test-id=tile-20]')
    await click('[data-test-id=tile-22]')
    await click('[data-test-id=tile-12]')

    // assertion checks
    assert.dom('[data-test-id=tile-00]').hasText('X');
    assert.dom('[data-test-id=tile-01]').hasText('X');
    assert.dom('[data-test-id=tile-02]').hasText('O');
    assert.dom('[data-test-id=tile-10]').hasText('O');
    assert.dom('[data-test-id=tile-11]').hasText('X');
    assert.dom('[data-test-id=tile-12]').hasText('X');
    assert.dom('[data-test-id=tile-20]').hasText('X');
    assert.dom('[data-test-id=tile-21]').hasText('O');
    assert.dom('[data-test-id=tile-22]').hasText('O');
    assert.dom('[data-test-id=result]').hasText('Game over! Nobody wins.');
  });

  test('reset game', async function (assert) {
    await render(hbs`<Board />`);

    // action - fill board
    await click('[data-test-id=tile-11]')
    await click('[data-test-id=tile-02]')

    // assertion checks
    assert.dom('[data-test-id=tile-00]').hasText('');
    assert.dom('[data-test-id=tile-01]').hasText('');
    assert.dom('[data-test-id=tile-02]').hasText('O');
    assert.dom('[data-test-id=tile-10]').hasText('');
    assert.dom('[data-test-id=tile-11]').hasText('X');
    assert.dom('[data-test-id=tile-12]').hasText('');
    assert.dom('[data-test-id=tile-20]').hasText('');
    assert.dom('[data-test-id=tile-21]').hasText('');
    assert.dom('[data-test-id=tile-22]').hasText('');

    // action - click reset button
    await click('[data-test-id=reset')

    // assertion checks
    assert.dom('[data-test-id=tile-00]').hasText('');
    assert.dom('[data-test-id=tile-01]').hasText('');
    assert.dom('[data-test-id=tile-02]').hasText('');
    assert.dom('[data-test-id=tile-10]').hasText('');
    assert.dom('[data-test-id=tile-11]').hasText('');
    assert.dom('[data-test-id=tile-12]').hasText('');
    assert.dom('[data-test-id=tile-20]').hasText('');
    assert.dom('[data-test-id=tile-21]').hasText('');
    assert.dom('[data-test-id=tile-22]').hasText('');
  });

  test('board is locked after win', async function (assert) {
    await render(hbs`<Board />`);

    // action
    await click('[data-test-id=tile-11]')
    await click('[data-test-id=tile-00]')
    await click('[data-test-id=tile-10]')
    await click('[data-test-id=tile-02]')
    await click('[data-test-id=tile-12]')
    await click('[data-test-id=tile-01]')
    
    // assertion checks
    assert.dom('[data-test-id=tile-00]').hasText('O');
    assert.dom('[data-test-id=tile-01]').hasText('');
    assert.dom('[data-test-id=tile-02]').hasText('O');
    assert.dom('[data-test-id=tile-10]').hasText('X');
    assert.dom('[data-test-id=tile-11]').hasText('X');
    assert.dom('[data-test-id=tile-12]').hasText('X');
    assert.dom('[data-test-id=tile-20]').hasText('');
    assert.dom('[data-test-id=tile-21]').hasText('');
    assert.dom('[data-test-id=tile-22]').hasText('');
    assert.dom('[data-test-id=result]').hasText('Banana Pudding won the game!');
    
  });

});

import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | player', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function (assert) {
    await render(hbs`<Player @mark={{"X"}} @playerName={{"Banana Pudding"}} @color={{"red"}} />`);
    assert.dom(this.element).hasText('X Banana Pudding');
  });
});

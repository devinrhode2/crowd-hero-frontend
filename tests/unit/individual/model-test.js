import { moduleForModel, test } from 'ember-qunit';

moduleForModel('individual', 'Unit | Model | individual', {
  // Specify the other units that are required for this test.
  needs: ['model:org']
});

test('it exists', function(assert) {
  let model = this.subject();
  // let store = this.store();
  assert.ok(!!model);
});

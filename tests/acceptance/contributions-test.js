import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var application;
var originalConfirm;
var confirmCalledWith;

module('Acceptance: Contribution', {
  beforeEach: function() {
    application = startApp();
    originalConfirm = window.confirm;
    window.confirm = function() {
      confirmCalledWith = [].slice.call(arguments);
      return true;
    };
  },
  afterEach: function() {
    Ember.run(application, 'destroy');
    window.confirm = originalConfirm;
    confirmCalledWith = null;
  }
});

test('visiting /contributions without data', function(assert) {
  visit('/contributions');

  andThen(function() {
    assert.equal(currentPath(), 'contributions.index');
    assert.equal(find('#blankslate').text().trim(), 'No Contributions found');
  });
});

test('visiting /contributions with data', function(assert) {
  server.create('contribution');
  visit('/contributions');

  andThen(function() {
    assert.equal(currentPath(), 'contributions.index');
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('create a new contribution', function(assert) {
  visit('/contributions');
  click('a:contains(New Contribution)');

  andThen(function() {
    assert.equal(currentPath(), 'contributions.new');

    fillIn('label:contains(Type) input', 'MyString');
    fillIn('label:contains(Contributor) input', 'MyString');
    fillIn('label:contains(Causes) input', []);
    fillIn('label:contains(Event) input', 'MyString');
    fillIn('label:contains(Donationamount) input', 'MyString');
    fillIn('label:contains(Hours) input', 42);
    fillIn('label:contains(Skilled) input', false);

    click('input:submit');
  });

  andThen(function() {
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('update an existing contribution', function(assert) {
  server.create('contribution');
  visit('/contributions');
  click('a:contains(Edit)');

  andThen(function() {
    assert.equal(currentPath(), 'contributions.edit');

    fillIn('label:contains(Type) input', 'MyString');
    fillIn('label:contains(Contributor) input', 'MyString');
    fillIn('label:contains(Causes) input', []);
    fillIn('label:contains(Event) input', 'MyString');
    fillIn('label:contains(Donationamount) input', 'MyString');
    fillIn('label:contains(Hours) input', 42);
    fillIn('label:contains(Skilled) input', false);

    click('input:submit');
  });

  andThen(function() {
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('show an existing contribution', function(assert) {
  server.create('contribution');
  visit('/contributions');
  click('a:contains(Show)');

  andThen(function() {
    assert.equal(currentPath(), 'contributions.show');

    assert.equal(find('p strong:contains(Type:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Contributor:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Causes:)').next().text(), []);
    assert.equal(find('p strong:contains(Event:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Donationamount:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Hours:)').next().text(), 42);
    assert.equal(find('p strong:contains(Skilled:)').next().text(), false);
  });
});

test('delete a contribution', function(assert) {
  server.create('contribution');
  visit('/contributions');
  click('a:contains(Remove)');

  andThen(function() {
    assert.equal(currentPath(), 'contributions.index');
    assert.deepEqual(confirmCalledWith, ['Are you sure?']);
    assert.equal(find('#blankslate').length, 1);
  });
});

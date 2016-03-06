import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var application;
var originalConfirm;
var confirmCalledWith;

module('Acceptance: Individual', {
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

test('visiting /individuals without data', function(assert) {
  visit('/individuals');

  andThen(function() {
    assert.equal(currentPath(), 'individuals.index');
    assert.equal(find('#blankslate').text().trim(), 'No Individuals found');
  });
});

test('visiting /individuals with data', function(assert) {
  server.create('individual');
  visit('/individuals');

  andThen(function() {
    assert.equal(currentPath(), 'individuals.index');
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('create a new individual', function(assert) {
  visit('/individuals');
  click('a:contains(New Individual)');

  andThen(function() {
    assert.equal(currentPath(), 'individuals.new');

    fillIn('label:contains(Org) input', 'MyString');
    fillIn('label:contains(Hourlyrate) input', 42);
    fillIn('label:contains(Locations) input', []);
    fillIn('label:contains(Causes) input', []);
    fillIn('label:contains(Contributions) input', 'MyString');
    fillIn('label:contains(Industries) input', []);
    fillIn('label:contains(Receivedcontributions) input', 'MyString');
    fillIn('label:contains(Skills) input', []);
    fillIn('label:contains(Name) input', 'MyString');
    fillIn('label:contains(Email) input', 'MyString');

    click('input:submit');
  });

  andThen(function() {
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('update an existing individual', function(assert) {
  server.create('individual');
  visit('/individuals');
  click('a:contains(Edit)');

  andThen(function() {
    assert.equal(currentPath(), 'individuals.edit');

    fillIn('label:contains(Org) input', 'MyString');
    fillIn('label:contains(Hourlyrate) input', 42);
    fillIn('label:contains(Locations) input', []);
    fillIn('label:contains(Causes) input', []);
    fillIn('label:contains(Contributions) input', 'MyString');
    fillIn('label:contains(Industries) input', []);
    fillIn('label:contains(Receivedcontributions) input', 'MyString');
    fillIn('label:contains(Skills) input', []);
    fillIn('label:contains(Name) input', 'MyString');
    fillIn('label:contains(Email) input', 'MyString');

    click('input:submit');
  });

  andThen(function() {
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('show an existing individual', function(assert) {
  server.create('individual');
  visit('/individuals');
  click('a:contains(Show)');

  andThen(function() {
    assert.equal(currentPath(), 'individuals.show');

    assert.equal(find('p strong:contains(Org:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Hourlyrate:)').next().text(), 42);
    assert.equal(find('p strong:contains(Locations:)').next().text(), []);
    assert.equal(find('p strong:contains(Causes:)').next().text(), []);
    assert.equal(find('p strong:contains(Contributions:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Industries:)').next().text(), []);
    assert.equal(find('p strong:contains(Receivedcontributions:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Skills:)').next().text(), []);
    assert.equal(find('p strong:contains(Name:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Email:)').next().text(), 'MyString');
  });
});

test('delete a individual', function(assert) {
  server.create('individual');
  visit('/individuals');
  click('a:contains(Remove)');

  andThen(function() {
    assert.equal(currentPath(), 'individuals.index');
    assert.deepEqual(confirmCalledWith, ['Are you sure?']);
    assert.equal(find('#blankslate').length, 1);
  });
});

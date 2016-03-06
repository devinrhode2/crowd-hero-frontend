import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var application;
var originalConfirm;
var confirmCalledWith;

module('Acceptance: Org', {
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

test('visiting /orgs without data', function(assert) {
  visit('/orgs');

  andThen(function() {
    assert.equal(currentPath(), 'orgs.index');
    assert.equal(find('#blankslate').text().trim(), 'No Orgs found');
  });
});

test('visiting /orgs with data', function(assert) {
  server.create('org');
  visit('/orgs');

  andThen(function() {
    assert.equal(currentPath(), 'orgs.index');
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('create a new org', function(assert) {
  visit('/orgs');
  click('a:contains(New Org)');

  andThen(function() {
    assert.equal(currentPath(), 'orgs.new');

    fillIn('label:contains(Type) input', 'MyString');
    fillIn('label:contains(Members) input', 'MyString');
    fillIn('label:contains(Partners) input', 'MyString');
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

test('update an existing org', function(assert) {
  server.create('org');
  visit('/orgs');
  click('a:contains(Edit)');

  andThen(function() {
    assert.equal(currentPath(), 'orgs.edit');

    fillIn('label:contains(Type) input', 'MyString');
    fillIn('label:contains(Members) input', 'MyString');
    fillIn('label:contains(Partners) input', 'MyString');
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

test('show an existing org', function(assert) {
  server.create('org');
  visit('/orgs');
  click('a:contains(Show)');

  andThen(function() {
    assert.equal(currentPath(), 'orgs.show');

    assert.equal(find('p strong:contains(Type:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Members:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Partners:)').next().text(), 'MyString');
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

test('delete a org', function(assert) {
  server.create('org');
  visit('/orgs');
  click('a:contains(Remove)');

  andThen(function() {
    assert.equal(currentPath(), 'orgs.index');
    assert.deepEqual(confirmCalledWith, ['Are you sure?']);
    assert.equal(find('#blankslate').length, 1);
  });
});

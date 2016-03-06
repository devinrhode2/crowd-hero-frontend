import Ember from 'ember';
import { module, test } from 'qunit';
import startApp from '../helpers/start-app';

var application;
var originalConfirm;
var confirmCalledWith;

module('Acceptance: Event', {
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

test('visiting /events without data', function(assert) {
  visit('/events');

  andThen(function() {
    assert.equal(currentPath(), 'events.index');
    assert.equal(find('#blankslate').text().trim(), 'No Events found');
  });
});

test('visiting /events with data', function(assert) {
  server.create('event');
  visit('/events');

  andThen(function() {
    assert.equal(currentPath(), 'events.index');
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('create a new event', function(assert) {
  visit('/events');
  click('a:contains(New Event)');

  andThen(function() {
    assert.equal(currentPath(), 'events.new');

    fillIn('label:contains(Type) input', 'MyString');
    fillIn('label:contains(Starttime) input', new Date());
    fillIn('label:contains(Endtime) input', new Date());
    fillIn('label:contains(Location) input', 'MyString');
    fillIn('label:contains(Organizer) input', 'MyString');
    fillIn('label:contains(Causes) input', []);
    fillIn('label:contains(Contributors) input', 'MyString');
    fillIn('label:contains(Beneficiary) input', 'MyString');
    fillIn('label:contains(Eventimagesrc) input', 'MyString');
    fillIn('label:contains(Description) input', 'MyString');
    fillIn('label:contains(Name) input', 'MyString');
    fillIn('label:contains(Expectedvolunteers) input', 'MyString');

    click('input:submit');
  });

  andThen(function() {
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('update an existing event', function(assert) {
  server.create('event');
  visit('/events');
  click('a:contains(Edit)');

  andThen(function() {
    assert.equal(currentPath(), 'events.edit');

    fillIn('label:contains(Type) input', 'MyString');
    fillIn('label:contains(Starttime) input', new Date());
    fillIn('label:contains(Endtime) input', new Date());
    fillIn('label:contains(Location) input', 'MyString');
    fillIn('label:contains(Organizer) input', 'MyString');
    fillIn('label:contains(Causes) input', []);
    fillIn('label:contains(Contributors) input', 'MyString');
    fillIn('label:contains(Beneficiary) input', 'MyString');
    fillIn('label:contains(Eventimagesrc) input', 'MyString');
    fillIn('label:contains(Description) input', 'MyString');
    fillIn('label:contains(Name) input', 'MyString');
    fillIn('label:contains(Expectedvolunteers) input', 'MyString');

    click('input:submit');
  });

  andThen(function() {
    assert.equal(find('#blankslate').length, 0);
    assert.equal(find('table tbody tr').length, 1);
  });
});

test('show an existing event', function(assert) {
  server.create('event');
  visit('/events');
  click('a:contains(Show)');

  andThen(function() {
    assert.equal(currentPath(), 'events.show');

    assert.equal(find('p strong:contains(Type:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Starttime:)').next().text(), new Date());
    assert.equal(find('p strong:contains(Endtime:)').next().text(), new Date());
    assert.equal(find('p strong:contains(Location:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Organizer:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Causes:)').next().text(), []);
    assert.equal(find('p strong:contains(Contributors:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Beneficiary:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Eventimagesrc:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Description:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Name:)').next().text(), 'MyString');
    assert.equal(find('p strong:contains(Expectedvolunteers:)').next().text(), 'MyString');
  });
});

test('delete a event', function(assert) {
  server.create('event');
  visit('/events');
  click('a:contains(Remove)');

  andThen(function() {
    assert.equal(currentPath(), 'events.index');
    assert.deepEqual(confirmCalledWith, ['Are you sure?']);
    assert.equal(find('#blankslate').length, 1);
  });
});

define('crowd-hero-frontend/tests/acceptance/contributions-test', ['exports', 'ember', 'qunit', 'crowd-hero-frontend/tests/helpers/start-app'], function (exports, _ember, _qunit, _crowdHeroFrontendTestsHelpersStartApp) {

  var application;
  var originalConfirm;
  var confirmCalledWith;

  (0, _qunit.module)('Acceptance: Contribution', {
    beforeEach: function beforeEach() {
      application = (0, _crowdHeroFrontendTestsHelpersStartApp['default'])();
      originalConfirm = window.confirm;
      window.confirm = function () {
        confirmCalledWith = [].slice.call(arguments);
        return true;
      };
    },
    afterEach: function afterEach() {
      _ember['default'].run(application, 'destroy');
      window.confirm = originalConfirm;
      confirmCalledWith = null;
    }
  });

  (0, _qunit.test)('visiting /contributions without data', function (assert) {
    visit('/contributions');

    andThen(function () {
      assert.equal(currentPath(), 'contributions.index');
      assert.equal(find('#blankslate').text().trim(), 'No Contributions found');
    });
  });

  (0, _qunit.test)('visiting /contributions with data', function (assert) {
    server.create('contribution');
    visit('/contributions');

    andThen(function () {
      assert.equal(currentPath(), 'contributions.index');
      assert.equal(find('#blankslate').length, 0);
      assert.equal(find('table tbody tr').length, 1);
    });
  });

  (0, _qunit.test)('create a new contribution', function (assert) {
    visit('/contributions');
    click('a:contains(New Contribution)');

    andThen(function () {
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

    andThen(function () {
      assert.equal(find('#blankslate').length, 0);
      assert.equal(find('table tbody tr').length, 1);
    });
  });

  (0, _qunit.test)('update an existing contribution', function (assert) {
    server.create('contribution');
    visit('/contributions');
    click('a:contains(Edit)');

    andThen(function () {
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

    andThen(function () {
      assert.equal(find('#blankslate').length, 0);
      assert.equal(find('table tbody tr').length, 1);
    });
  });

  (0, _qunit.test)('show an existing contribution', function (assert) {
    server.create('contribution');
    visit('/contributions');
    click('a:contains(Show)');

    andThen(function () {
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

  (0, _qunit.test)('delete a contribution', function (assert) {
    server.create('contribution');
    visit('/contributions');
    click('a:contains(Remove)');

    andThen(function () {
      assert.equal(currentPath(), 'contributions.index');
      assert.deepEqual(confirmCalledWith, ['Are you sure?']);
      assert.equal(find('#blankslate').length, 1);
    });
  });
});
define('crowd-hero-frontend/tests/acceptance/contributions-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - acceptance/contributions-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/contributions-test.js should pass jshint.');
  });
});
define('crowd-hero-frontend/tests/acceptance/events-test', ['exports', 'ember', 'qunit', 'crowd-hero-frontend/tests/helpers/start-app'], function (exports, _ember, _qunit, _crowdHeroFrontendTestsHelpersStartApp) {

  var application;
  var originalConfirm;
  var confirmCalledWith;

  (0, _qunit.module)('Acceptance: Event', {
    beforeEach: function beforeEach() {
      application = (0, _crowdHeroFrontendTestsHelpersStartApp['default'])();
      originalConfirm = window.confirm;
      window.confirm = function () {
        confirmCalledWith = [].slice.call(arguments);
        return true;
      };
    },
    afterEach: function afterEach() {
      _ember['default'].run(application, 'destroy');
      window.confirm = originalConfirm;
      confirmCalledWith = null;
    }
  });

  (0, _qunit.test)('visiting /events without data', function (assert) {
    visit('/events');

    andThen(function () {
      assert.equal(currentPath(), 'events.index');
      assert.equal(find('#blankslate').text().trim(), 'No Events found');
    });
  });

  (0, _qunit.test)('visiting /events with data', function (assert) {
    server.create('event');
    visit('/events');

    andThen(function () {
      assert.equal(currentPath(), 'events.index');
      assert.equal(find('#blankslate').length, 0);
      assert.equal(find('table tbody tr').length, 1);
    });
  });

  (0, _qunit.test)('create a new event', function (assert) {
    visit('/events');
    click('a:contains(New Event)');

    andThen(function () {
      assert.equal(currentPath(), 'events.new');

      fillIn('label:contains(Type) input', 'MyString');
      fillIn('label:contains(String) input', 'MyString');
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

    andThen(function () {
      assert.equal(find('#blankslate').length, 0);
      assert.equal(find('table tbody tr').length, 1);
    });
  });

  (0, _qunit.test)('update an existing event', function (assert) {
    server.create('event');
    visit('/events');
    click('a:contains(Edit)');

    andThen(function () {
      assert.equal(currentPath(), 'events.edit');

      fillIn('label:contains(Type) input', 'MyString');
      fillIn('label:contains(String) input', 'MyString');
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

    andThen(function () {
      assert.equal(find('#blankslate').length, 0);
      assert.equal(find('table tbody tr').length, 1);
    });
  });

  (0, _qunit.test)('show an existing event', function (assert) {
    server.create('event');
    visit('/events');
    click('a:contains(Show)');

    andThen(function () {
      assert.equal(currentPath(), 'events.show');

      assert.equal(find('p strong:contains(Type:)').next().text(), 'MyString');
      assert.equal(find('p strong:contains(String:)').next().text(), 'MyString');
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

  (0, _qunit.test)('delete a event', function (assert) {
    server.create('event');
    visit('/events');
    click('a:contains(Remove)');

    andThen(function () {
      assert.equal(currentPath(), 'events.index');
      assert.deepEqual(confirmCalledWith, ['Are you sure?']);
      assert.equal(find('#blankslate').length, 1);
    });
  });
});
define('crowd-hero-frontend/tests/acceptance/events-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - acceptance/events-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/events-test.js should pass jshint.');
  });
});
define('crowd-hero-frontend/tests/acceptance/individuals-test', ['exports', 'ember', 'qunit', 'crowd-hero-frontend/tests/helpers/start-app'], function (exports, _ember, _qunit, _crowdHeroFrontendTestsHelpersStartApp) {

  var application;
  var originalConfirm;
  var confirmCalledWith;

  (0, _qunit.module)('Acceptance: Individual', {
    beforeEach: function beforeEach() {
      application = (0, _crowdHeroFrontendTestsHelpersStartApp['default'])();
      originalConfirm = window.confirm;
      window.confirm = function () {
        confirmCalledWith = [].slice.call(arguments);
        return true;
      };
    },
    afterEach: function afterEach() {
      _ember['default'].run(application, 'destroy');
      window.confirm = originalConfirm;
      confirmCalledWith = null;
    }
  });

  (0, _qunit.test)('visiting /individuals without data', function (assert) {
    visit('/individuals');

    andThen(function () {
      assert.equal(currentPath(), 'individuals.index');
      assert.equal(find('#blankslate').text().trim(), 'No Individuals found');
    });
  });

  (0, _qunit.test)('visiting /individuals with data', function (assert) {
    server.create('individual');
    visit('/individuals');

    andThen(function () {
      assert.equal(currentPath(), 'individuals.index');
      assert.equal(find('#blankslate').length, 0);
      assert.equal(find('table tbody tr').length, 1);
    });
  });

  (0, _qunit.test)('create a new individual', function (assert) {
    visit('/individuals');
    click('a:contains(New Individual)');

    andThen(function () {
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

    andThen(function () {
      assert.equal(find('#blankslate').length, 0);
      assert.equal(find('table tbody tr').length, 1);
    });
  });

  (0, _qunit.test)('update an existing individual', function (assert) {
    server.create('individual');
    visit('/individuals');
    click('a:contains(Edit)');

    andThen(function () {
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

    andThen(function () {
      assert.equal(find('#blankslate').length, 0);
      assert.equal(find('table tbody tr').length, 1);
    });
  });

  (0, _qunit.test)('show an existing individual', function (assert) {
    server.create('individual');
    visit('/individuals');
    click('a:contains(Show)');

    andThen(function () {
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

  (0, _qunit.test)('delete a individual', function (assert) {
    server.create('individual');
    visit('/individuals');
    click('a:contains(Remove)');

    andThen(function () {
      assert.equal(currentPath(), 'individuals.index');
      assert.deepEqual(confirmCalledWith, ['Are you sure?']);
      assert.equal(find('#blankslate').length, 1);
    });
  });
});
define('crowd-hero-frontend/tests/acceptance/individuals-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - acceptance/individuals-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/individuals-test.js should pass jshint.');
  });
});
define('crowd-hero-frontend/tests/acceptance/orgs-test', ['exports', 'ember', 'qunit', 'crowd-hero-frontend/tests/helpers/start-app'], function (exports, _ember, _qunit, _crowdHeroFrontendTestsHelpersStartApp) {

  var application;
  var originalConfirm;
  var confirmCalledWith;

  (0, _qunit.module)('Acceptance: Org', {
    beforeEach: function beforeEach() {
      application = (0, _crowdHeroFrontendTestsHelpersStartApp['default'])();
      originalConfirm = window.confirm;
      window.confirm = function () {
        confirmCalledWith = [].slice.call(arguments);
        return true;
      };
    },
    afterEach: function afterEach() {
      _ember['default'].run(application, 'destroy');
      window.confirm = originalConfirm;
      confirmCalledWith = null;
    }
  });

  (0, _qunit.test)('visiting /orgs without data', function (assert) {
    visit('/orgs');

    andThen(function () {
      assert.equal(currentPath(), 'orgs.index');
      assert.equal(find('#blankslate').text().trim(), 'No Orgs found');
    });
  });

  (0, _qunit.test)('visiting /orgs with data', function (assert) {
    server.create('org');
    visit('/orgs');

    andThen(function () {
      assert.equal(currentPath(), 'orgs.index');
      assert.equal(find('#blankslate').length, 0);
      assert.equal(find('table tbody tr').length, 1);
    });
  });

  (0, _qunit.test)('create a new org', function (assert) {
    visit('/orgs');
    click('a:contains(New Org)');

    andThen(function () {
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

    andThen(function () {
      assert.equal(find('#blankslate').length, 0);
      assert.equal(find('table tbody tr').length, 1);
    });
  });

  (0, _qunit.test)('update an existing org', function (assert) {
    server.create('org');
    visit('/orgs');
    click('a:contains(Edit)');

    andThen(function () {
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

    andThen(function () {
      assert.equal(find('#blankslate').length, 0);
      assert.equal(find('table tbody tr').length, 1);
    });
  });

  (0, _qunit.test)('show an existing org', function (assert) {
    server.create('org');
    visit('/orgs');
    click('a:contains(Show)');

    andThen(function () {
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

  (0, _qunit.test)('delete a org', function (assert) {
    server.create('org');
    visit('/orgs');
    click('a:contains(Remove)');

    andThen(function () {
      assert.equal(currentPath(), 'orgs.index');
      assert.deepEqual(confirmCalledWith, ['Are you sure?']);
      assert.equal(find('#blankslate').length, 1);
    });
  });
});
define('crowd-hero-frontend/tests/acceptance/orgs-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - acceptance/orgs-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/orgs-test.js should pass jshint.');
  });
});
define('crowd-hero-frontend/tests/acceptance/users-test', ['exports', 'ember', 'qunit', 'crowd-hero-frontend/tests/helpers/start-app'], function (exports, _ember, _qunit, _crowdHeroFrontendTestsHelpersStartApp) {

  var application;
  var originalConfirm;
  var confirmCalledWith;

  (0, _qunit.module)('Acceptance: User', {
    beforeEach: function beforeEach() {
      application = (0, _crowdHeroFrontendTestsHelpersStartApp['default'])();
      originalConfirm = window.confirm;
      window.confirm = function () {
        confirmCalledWith = [].slice.call(arguments);
        return true;
      };
    },
    afterEach: function afterEach() {
      _ember['default'].run(application, 'destroy');
      window.confirm = originalConfirm;
      confirmCalledWith = null;
    }
  });

  (0, _qunit.test)('visiting /users without data', function (assert) {
    visit('/users');

    andThen(function () {
      assert.equal(currentPath(), 'users.index');
      assert.equal(find('#blankslate').text().trim(), 'No Users found');
    });
  });

  (0, _qunit.test)('visiting /users with data', function (assert) {
    server.create('user');
    visit('/users');

    andThen(function () {
      assert.equal(currentPath(), 'users.index');
      assert.equal(find('#blankslate').length, 0);
      assert.equal(find('table tbody tr').length, 1);
    });
  });

  (0, _qunit.test)('create a new user', function (assert) {
    visit('/users');
    click('a:contains(New User)');

    andThen(function () {
      assert.equal(currentPath(), 'users.new');

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

    andThen(function () {
      assert.equal(find('#blankslate').length, 0);
      assert.equal(find('table tbody tr').length, 1);
    });
  });

  (0, _qunit.test)('update an existing user', function (assert) {
    server.create('user');
    visit('/users');
    click('a:contains(Edit)');

    andThen(function () {
      assert.equal(currentPath(), 'users.edit');

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

    andThen(function () {
      assert.equal(find('#blankslate').length, 0);
      assert.equal(find('table tbody tr').length, 1);
    });
  });

  (0, _qunit.test)('show an existing user', function (assert) {
    server.create('user');
    visit('/users');
    click('a:contains(Show)');

    andThen(function () {
      assert.equal(currentPath(), 'users.show');

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

  (0, _qunit.test)('delete a user', function (assert) {
    server.create('user');
    visit('/users');
    click('a:contains(Remove)');

    andThen(function () {
      assert.equal(currentPath(), 'users.index');
      assert.deepEqual(confirmCalledWith, ['Are you sure?']);
      assert.equal(find('#blankslate').length, 1);
    });
  });
});
define('crowd-hero-frontend/tests/acceptance/users-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - acceptance/users-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'acceptance/users-test.js should pass jshint.');
  });
});
define('crowd-hero-frontend/tests/app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'app.js should pass jshint.');
  });
});
define('crowd-hero-frontend/tests/contribution/adapter.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - contribution/adapter.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'contribution/adapter.js should pass jshint.');
  });
});
define('crowd-hero-frontend/tests/contribution/model.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - contribution/model.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'contribution/model.js should pass jshint.');
  });
});
define('crowd-hero-frontend/tests/contributions/edit/route.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - contributions/edit/route.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'contributions/edit/route.js should pass jshint.');
  });
});
define('crowd-hero-frontend/tests/contributions/index/route.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - contributions/index/route.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'contributions/index/route.js should pass jshint.');
  });
});
define('crowd-hero-frontend/tests/contributions/new/route.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - contributions/new/route.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'contributions/new/route.js should pass jshint.');
  });
});
define('crowd-hero-frontend/tests/event/adapter.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - event/adapter.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'event/adapter.js should pass jshint.');
  });
});
define('crowd-hero-frontend/tests/event/model.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - event/model.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'event/model.js should pass jshint.');
  });
});
define('crowd-hero-frontend/tests/events/edit/route.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - events/edit/route.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'events/edit/route.js should pass jshint.');
  });
});
define('crowd-hero-frontend/tests/events/index/route.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - events/index/route.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'events/index/route.js should pass jshint.');
  });
});
define('crowd-hero-frontend/tests/events/new/route.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - events/new/route.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'events/new/route.js should pass jshint.');
  });
});
define('crowd-hero-frontend/tests/helpers/destroy-app', ['exports', 'ember'], function (exports, _ember) {
  exports['default'] = destroyApp;

  function destroyApp(application) {
    _ember['default'].run(application, 'destroy');
  }
});
define('crowd-hero-frontend/tests/helpers/destroy-app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers/destroy-app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/destroy-app.js should pass jshint.');
  });
});
define('crowd-hero-frontend/tests/helpers/module-for-acceptance', ['exports', 'qunit', 'crowd-hero-frontend/tests/helpers/start-app', 'crowd-hero-frontend/tests/helpers/destroy-app'], function (exports, _qunit, _crowdHeroFrontendTestsHelpersStartApp, _crowdHeroFrontendTestsHelpersDestroyApp) {
  exports['default'] = function (name) {
    var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

    (0, _qunit.module)(name, {
      beforeEach: function beforeEach() {
        this.application = (0, _crowdHeroFrontendTestsHelpersStartApp['default'])();

        if (options.beforeEach) {
          options.beforeEach.apply(this, arguments);
        }
      },

      afterEach: function afterEach() {
        if (options.afterEach) {
          options.afterEach.apply(this, arguments);
        }

        (0, _crowdHeroFrontendTestsHelpersDestroyApp['default'])(this.application);
      }
    });
  };
});
define('crowd-hero-frontend/tests/helpers/module-for-acceptance.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers/module-for-acceptance.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/module-for-acceptance.js should pass jshint.');
  });
});
define('crowd-hero-frontend/tests/helpers/resolver', ['exports', 'crowd-hero-frontend/resolver', 'crowd-hero-frontend/config/environment'], function (exports, _crowdHeroFrontendResolver, _crowdHeroFrontendConfigEnvironment) {

  var resolver = _crowdHeroFrontendResolver['default'].create();

  resolver.namespace = {
    modulePrefix: _crowdHeroFrontendConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _crowdHeroFrontendConfigEnvironment['default'].podModulePrefix
  };

  exports['default'] = resolver;
});
define('crowd-hero-frontend/tests/helpers/resolver.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers/resolver.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/resolver.js should pass jshint.');
  });
});
define('crowd-hero-frontend/tests/helpers/start-app', ['exports', 'ember', 'crowd-hero-frontend/app', 'crowd-hero-frontend/config/environment'], function (exports, _ember, _crowdHeroFrontendApp, _crowdHeroFrontendConfigEnvironment) {
  exports['default'] = startApp;

  function startApp(attrs) {
    var application = undefined;

    var attributes = _ember['default'].merge({}, _crowdHeroFrontendConfigEnvironment['default'].APP);
    attributes = _ember['default'].merge(attributes, attrs); // use defaults, but you can override;

    _ember['default'].run(function () {
      application = _crowdHeroFrontendApp['default'].create(attributes);
      application.setupForTesting();
      application.injectTestHelpers();
    });

    return application;
  }
});
define('crowd-hero-frontend/tests/helpers/start-app.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - helpers/start-app.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'helpers/start-app.js should pass jshint.');
  });
});
define('crowd-hero-frontend/tests/index/route.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - index/route.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'index/route.js should pass jshint.');
  });
});
define('crowd-hero-frontend/tests/individual/adapter.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - individual/adapter.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'individual/adapter.js should pass jshint.');
  });
});
define('crowd-hero-frontend/tests/individual/model.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - individual/model.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'individual/model.js should pass jshint.');
  });
});
define('crowd-hero-frontend/tests/individuals/edit/route.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - individuals/edit/route.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'individuals/edit/route.js should pass jshint.');
  });
});
define('crowd-hero-frontend/tests/individuals/index/route.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - individuals/index/route.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'individuals/index/route.js should pass jshint.');
  });
});
define('crowd-hero-frontend/tests/individuals/new/route.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - individuals/new/route.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'individuals/new/route.js should pass jshint.');
  });
});
define('crowd-hero-frontend/tests/mirage/config.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - mirage/config.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mirage/config.js should pass jshint.');
  });
});
define('crowd-hero-frontend/tests/mirage/factories/contact.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - mirage/factories/contact.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mirage/factories/contact.js should pass jshint.');
  });
});
define('crowd-hero-frontend/tests/mirage/factories/contribution.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - mirage/factories/contribution.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mirage/factories/contribution.js should pass jshint.');
  });
});
define('crowd-hero-frontend/tests/mirage/factories/event.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - mirage/factories/event.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mirage/factories/event.js should pass jshint.');
  });
});
define('crowd-hero-frontend/tests/mirage/factories/individual.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - mirage/factories/individual.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mirage/factories/individual.js should pass jshint.');
  });
});
define('crowd-hero-frontend/tests/mirage/factories/org.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - mirage/factories/org.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mirage/factories/org.js should pass jshint.');
  });
});
define('crowd-hero-frontend/tests/mirage/factories/user.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - mirage/factories/user.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mirage/factories/user.js should pass jshint.');
  });
});
define('crowd-hero-frontend/tests/mirage/scenarios/default.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - mirage/scenarios/default.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mirage/scenarios/default.js should pass jshint.');
  });
});
define('crowd-hero-frontend/tests/mixins/contributions/save-model-mixin.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - mixins/contributions/save-model-mixin.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mixins/contributions/save-model-mixin.js should pass jshint.');
  });
});
define('crowd-hero-frontend/tests/mixins/events/save-model-mixin.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - mixins/events/save-model-mixin.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mixins/events/save-model-mixin.js should pass jshint.');
  });
});
define('crowd-hero-frontend/tests/mixins/individuals/save-model-mixin.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - mixins/individuals/save-model-mixin.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mixins/individuals/save-model-mixin.js should pass jshint.');
  });
});
define('crowd-hero-frontend/tests/mixins/orgs/save-model-mixin.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - mixins/orgs/save-model-mixin.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mixins/orgs/save-model-mixin.js should pass jshint.');
  });
});
define('crowd-hero-frontend/tests/mixins/users/save-model-mixin.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - mixins/users/save-model-mixin.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'mixins/users/save-model-mixin.js should pass jshint.');
  });
});
define('crowd-hero-frontend/tests/org/adapter.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - org/adapter.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'org/adapter.js should pass jshint.');
  });
});
define('crowd-hero-frontend/tests/org/model.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - org/model.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'org/model.js should pass jshint.');
  });
});
define('crowd-hero-frontend/tests/orgs/edit/route.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - orgs/edit/route.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'orgs/edit/route.js should pass jshint.');
  });
});
define('crowd-hero-frontend/tests/orgs/index/route.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - orgs/index/route.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'orgs/index/route.js should pass jshint.');
  });
});
define('crowd-hero-frontend/tests/orgs/new/route.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - orgs/new/route.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'orgs/new/route.js should pass jshint.');
  });
});
define('crowd-hero-frontend/tests/resolver.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - resolver.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'resolver.js should pass jshint.');
  });
});
define('crowd-hero-frontend/tests/router.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - router.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'router.js should pass jshint.');
  });
});
define('crowd-hero-frontend/tests/test-helper', ['exports', 'crowd-hero-frontend/tests/helpers/resolver', 'ember-qunit'], function (exports, _crowdHeroFrontendTestsHelpersResolver, _emberQunit) {

  (0, _emberQunit.setResolver)(_crowdHeroFrontendTestsHelpersResolver['default']);
});
define('crowd-hero-frontend/tests/test-helper.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - test-helper.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'test-helper.js should pass jshint.');
  });
});
define('crowd-hero-frontend/tests/transforms/array.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - transforms/array.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(false, 'transforms/array.js should pass jshint.\ntransforms/array.js: line 7, col 14, \'Em\' is not defined.\ntransforms/array.js: line 9, col 14, \'Em\' is not defined.\ntransforms/array.js: line 14, col 14, \'Em\' is not defined.\ntransforms/array.js: line 16, col 14, \'Em\' is not defined.\n\n4 errors');
  });
});
define('crowd-hero-frontend/tests/unit/event/model-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('event', 'Unit | Model | event', {
    // Specify the other units that are required for this test.
    needs: ['model:user']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('crowd-hero-frontend/tests/unit/event/model-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/event/model-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/event/model-test.js should pass jshint.');
  });
});
define('crowd-hero-frontend/tests/unit/index/route-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('route:index', 'Unit | Route | index', {
    // Specify the other units that are required for this test.
    // needs: ['controller:foo']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var route = this.subject();
    assert.ok(route);
  });
});
define('crowd-hero-frontend/tests/unit/index/route-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/index/route-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/index/route-test.js should pass jshint.');
  });
});
define('crowd-hero-frontend/tests/unit/individual/model-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('individual', 'Unit | Model | individual', {
    // Specify the other units that are required for this test.
    needs: ['model:org']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('crowd-hero-frontend/tests/unit/individual/model-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/individual/model-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/individual/model-test.js should pass jshint.');
  });
});
define('crowd-hero-frontend/tests/unit/org/model-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('org', 'Unit | Model | org', {
    // Specify the other units that are required for this test.
    needs: ['model:user', 'model:org']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('crowd-hero-frontend/tests/unit/org/model-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/org/model-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/org/model-test.js should pass jshint.');
  });
});
define('crowd-hero-frontend/tests/unit/transforms/array-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleFor)('transform:array', 'Unit | Transform | array', {
    // Specify the other units that are required for this test.
    // needs: ['serializer:foo']
  });

  // Replace this with your real tests.
  (0, _emberQunit.test)('it exists', function (assert) {
    var transform = this.subject();
    assert.ok(transform);
  });
});
define('crowd-hero-frontend/tests/unit/transforms/array-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/transforms/array-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/transforms/array-test.js should pass jshint.');
  });
});
define('crowd-hero-frontend/tests/unit/user/model-test', ['exports', 'ember-qunit'], function (exports, _emberQunit) {

  (0, _emberQunit.moduleForModel)('user', 'Unit | Model | user', {
    // Specify the other units that are required for this test.
    needs: ['model:contribution']
  });

  (0, _emberQunit.test)('it exists', function (assert) {
    var model = this.subject();
    // let store = this.store();
    assert.ok(!!model);
  });
});
define('crowd-hero-frontend/tests/unit/user/model-test.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - unit/user/model-test.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'unit/user/model-test.js should pass jshint.');
  });
});
define('crowd-hero-frontend/tests/user/adapter.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - user/adapter.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'user/adapter.js should pass jshint.');
  });
});
define('crowd-hero-frontend/tests/user/model.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - user/model.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'user/model.js should pass jshint.');
  });
});
define('crowd-hero-frontend/tests/users/edit/route.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - users/edit/route.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'users/edit/route.js should pass jshint.');
  });
});
define('crowd-hero-frontend/tests/users/index/route.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - users/index/route.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'users/index/route.js should pass jshint.');
  });
});
define('crowd-hero-frontend/tests/users/new/route.jshint', ['exports'], function (exports) {
  'use strict';

  QUnit.module('JSHint - users/new/route.js');
  QUnit.test('should pass jshint', function (assert) {
    assert.expect(1);
    assert.ok(true, 'users/new/route.js should pass jshint.');
  });
});
/* jshint ignore:start */

require('crowd-hero-frontend/tests/test-helper');
EmberENV.TESTS_FILE_LOADED = true;

/* jshint ignore:end */
//# sourceMappingURL=tests.map
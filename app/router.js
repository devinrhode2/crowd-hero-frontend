import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});


/*

/signup (individual or org)

/users (list)
/individuals (list)
/orgs (list)
/org/show/:id

*/

Router.map(function() {
  this.route('users', function() {
    this.route('new');

    this.route('edit', {
      path: ':user_id/edit'
    });

    this.route('show', {
      path: ':user_id'
    });
  });
  this.route('orgs', function() {
    this.route('new');

    this.route('edit', {
      path: ':org_id/edit'
    });

    this.route('show', {
      path: ':org_id'
    });
  });
  this.route('individuals', function() {
    this.route('new');

    this.route('edit', {
      path: ':individual_id/edit'
    });

    this.route('show', {
      path: ':individual_id'
    });
  });
  this.route('events', function() {
    this.route('new');

    this.route('edit', {
      path: ':event_id/edit'
    });

    this.route('show', {
      path: ':event_id'
    });
  });
  this.route('contributions', function() {
    this.route('new');

    this.route('edit', {
      path: ':contribution_id/edit'
    });

    this.route('show', {
      path: ':contribution_id'
    });
  });
});

export default Router;

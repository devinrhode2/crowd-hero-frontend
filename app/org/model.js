import DS from 'ember-data';
import User from 'crowd-hero-frontend/user/model';

export default User.extend({
  type: DS.attr('string'),
  members: DS.hasMany('user'),
  partners: DS.hasMany('org'),
  locations: DS.attr('array'),
  causes: DS.attr('array'),
  contributions: DS.hasMany('contribution'),
  industries: DS.attr('array'),
  receivedContributions: DS.hasMany('contribution'),
  skills: DS.attr('array'),
  name: DS.attr('string'),
  email: DS.attr('string')
});

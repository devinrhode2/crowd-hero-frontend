import DS from 'ember-data';

export default DS.Model.extend({
  locations: DS.attr('array'),
  causes: DS.attr('array'),
  contributions: DS.hasMany('contribution'),
  industries: DS.attr('array'),
  receivedContributions: DS.hasMany('contribution'),
  skills: DS.attr('array'),
  name: DS.attr('string'),
  email: DS.attr('string')
});

import DS from 'ember-data';

export default DS.Model.extend({
  type: DS.attr('string'),
  startTime: DS.attr('date'),
  endTime: DS.attr('date'),
  location: DS.attr('string'),
  organizer: DS.attr('has-one'),
  causes: DS.attr('array'),
  contributors: DS.hasMany('user'),
  beneficiary: DS.attr('has-one'),
  eventImageSrc: DS.attr('string'),
  description: DS.attr('string'),
  name: DS.attr('string'),
  expectedVolunteers: DS.hasMany('user')
});

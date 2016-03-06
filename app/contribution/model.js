import DS from 'ember-data';

export default DS.Model.extend({
  type: DS.attr('string'),
  contributor: DS.belongsTo('user'),
  causes: DS.attr('array'),
  event: DS.belongsTo('event'),
  donationAmount: DS.attr('string'),
  hours: DS.attr('number'),
  skilled: DS.attr('boolean')
});

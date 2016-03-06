import DS from 'ember-data';
import User from 'crowd-hero-frontend/user/model';

export default User.extend({
  org: DS.belongsTo('org'),
  hourlyRate: DS.attr('number')
});

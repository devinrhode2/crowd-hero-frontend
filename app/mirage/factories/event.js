import Mirage from 'ember-cli-mirage';

export default Mirage.Factory.extend(
  {type: 'MyString', string: 'MyString', startTime: new Date(), endTime: new Date(), location: 'MyString', organizer: 'MyString', causes: [], contributors: 'MyString', beneficiary: 'MyString', eventImageSrc: 'MyString', description: 'MyString', name: 'MyString', expectedVolunteers: 'MyString' }
);

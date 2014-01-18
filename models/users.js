//Users = Meteor.users;
//
//Users.updateName = function(user, options) {
//  var profile = {};
//  if(!user.profile) user.profile = profile;
//  if (!$('#fullFirstNameSimplyRegistration').val() && !$('#fullLastNameSimplyRegistration').val()) return;
//  if (user.profile.fullFirstName && user.profile.fullLastName) return;
//  if(!user.profile.fullFirstName) profile.fullFirstName = $('#fullFirstNameSimplyRegistration').val();
//  if(!user.profile.fullLastName) profile.fullLastName = $('#fullLastNameSimplyRegistration').val();
//  Meteor.users.update(user, { $set: { profile: profile } });
//};

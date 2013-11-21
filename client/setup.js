Router.map(function() {               // карта сайта
  this.route('home', {path: '/'});
  this.route('search')
  this.route('guestbook');
  this.route('myPage'); 
  this.route('myMessages');
  this.route('userlist');
  this.route('buyPicture');
  this.route('profile');
  this.route('myGalleries'); 
  this.route('postJob');  
  this.route('jobs');
  this.route('userProfile',{
    path: '/users/:_id',
    data: function() {return Meteor.users.findOne(this.params._id);},
  });
  this.route('privateMessagePanel',{
    path: '/users/:_id/messages',
    data: function() {return Meteor.users.findOne(this.params._id);},
  });
});

Router.configure({             // обьявление главного шаблона
  layoutTemplate: 'layout'
});

Accounts.ui.config({
 passwordSignupFields: 'EMAIL_ONLY'
});

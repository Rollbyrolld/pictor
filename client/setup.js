Router.map(function() {               // карта сайта
  this.route('home', {path: '/'});
  this.route('guestbook');
  this.route('myPage');
  this.route('myMessages');
  this.route('userlist');
  this.route('buyPicture');
  this.route('profile');
  this.route('myGalleries'); 
  this.route('privateMessagePanel',{
    path: '/users/:_id',
    data: function() {return Meteor.users.findOne(this.params._id);},
  });
});

Router.configure({             // обьявление главного шаблона
  layout: 'layout',
});

Accounts.ui.config({
 passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
});

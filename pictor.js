Posts = new Meteor.Collection("posts");
Messages = new Meteor.Collection("messages");

if (Meteor.isClient) {
 Router.map(function() {               // карта сайта
   this.route('home', {path: '/'});
   this.route('guestbook');
   this.route('myPage');
   this.route('myMessages');
   this.route('userlist');
   this.route('buyPicture');
   this.route('profile');
 });

 Router.configure({             // обьявление главного шаблона
   layout: 'layout',
 });

 Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_OPTIONAL_EMAIL'
 });

 Template.list.posts= function () {
  return Posts.find({}, {sort: {created_on:-1}})  // вывести сообщения в порядке, где последнее по дате выше
 };

 Template.form.events({
  'click button#buttonNew' : function () {
    if (!$('#textArea').val()) {}

    else { 
       var options = { ownPost: $("#textArea").val() };
      if (Meteor.user()) {
        options.name = Meteor.user().username   //Meteor.user().emails[0].address;
      }
      else {
        options.name = $('#firstName').val();
      }
      Posts.insert(options);
    };

    $('#textArea').val('');
    $('#firstName').val('');             
  }
 });
 Template.profile.events({
  'click button#buttonSave' : function () {
    //if(!$('fullFirstName').val()) {}
      //else( )
      var profile = {
        fullFirstName : function () {
          if (!$('#fullFirstName').val()) {}
          else {$('#fullFirstName').val()
          }
        },
        fullLastName :  function () {
          if (!$('#fullLastName').val()) {}
          else {$('#fullLastName').val()
          }
        },
        avURL :  function () {
          if (!$('#avURL').val()) {}
          else {$('#avURL').val()
          } 
        }  
      }
   Users.insert(profile);
  }
 });
 // ----------------- последняя скобка
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    Posts.allow({ insert: function(id, doc){
      doc.created_on = new Date().getTime(); return true; 
    }});
  });
  // ----------------- последняя скобка
}

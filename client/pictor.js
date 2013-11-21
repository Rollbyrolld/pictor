Template.list.posts= function () {
 return Posts.find({}, {sort: {created_on:-1}}); // вывести сообщения в порядке, где последнее по дате выше
};
 
Template.userlist.users= function () {
  return Meteor.users.find({_id: {$ne: Meteor.userId()}});
};
 
Template.myPage.user = function () {
  return Meteor.user();
};
 
Template.profile.user = function () {
  return Meteor.user();
};

Template.userProfile.user= function () {
  return Meteor.users.findOne({_id : this._id});
};

Template.privateMessagePanel.messages= function () {
  return Messages.find({$or: [{to_id: Meteor.userId(), from_id: this._id }, 
                              {to_id: this._id, from_id: Meteor.userId() }]}, 
                              {sort: {created_on:-1}}); 
}; 
 
Template.myMessages.messages= function () {
  return Messages.find({to_id: Meteor.userId()}, {sort: {created_on:-1}});  
};
 
Template.textarea.user= function () {
  return Meteor.user();
};

Template.jobs.messages= function () {
  return Messages.find({to_id: "jobList"}, {sort: {created_on:-1}});  
};

Template.form.events({
  'click button#buttonNew' : function () {
    if (!$('#textarea').val()) {}
 
    else { 
       var options = { ownPost: $("#textarea").val() };
      if (Meteor.user()) {
        options.name = Meteor.user().profile.fullFirstName;  //Meteor.user().emails[0].address;
        options.lastname = Meteor.user().profile.fullLastName;
      }
      else {
        options.name = $('#firstName').val();
      }
      Posts.insert(options);
    }
 
    $('#textarea').val('');
    $('#firstName').val('');             
  }
});
 
Template.profile.events({
  'click button#buttonSave' : function () {
    Meteor.users.update(Meteor.userId(), {
      $set: {

        profile: {
          fullFirstName : $('#fullFirstName').val(), 
          fullLastName : $('#fullLastName').val(), 
          avURL : $('#avURL').val(), 
          aboutAuthor: $('#aboutAuthor').val(), 
          tec: $('#tec').val(),
          tel: $('#tel').val(), 
          email: $('#email').val(), 
          vk: $('#vk').val()
        }
      }
    }); 
  }
});



/*Template.myGalleries.events({
  'click button#imgSend' : function () {
 
    if (!$('#image').val()) {
      alert ("Не введдён адрес");  
    }
 
    else { 
          var options = { image : $("#image").val(),
                          note : $("#imageNote").val(), 
                          imageCollection : $("#imageCollection").val()
                        };   
    if (Meteor.user()) {
        options.from_id = Meteor.user()._id;
        options.username = Meteor.user().username;
        }
 
      Images.insert(options);
    }
    $('#image').val(''); 
    $("#imageNote").val('');  
 
  }
});*/
   
 
Template.privateMessagePanel.events({
  'click button#send' : function () {
    if (!$('#textarea').val()) {}
 
    else { 
       var options = { message: $("#textarea").val(),
                       to_id : this._id
                       };
      if (Meteor.user()) {
        options.from_id = Meteor.userId();
        options.username = Meteor.user().profile.fullFirstName;
        options.lastname = Meteor.user().profile.fullLastName;
              }
      else {
        options.username = $('#firstName').val();
      }
      Messages.insert(options);
    }
 
    $('#textarea').val('');           
  }
});

/*Template._loginButtons.events({
  'click #login-buttons-logout': function() {
    Meteor.logout(function () {
      Router.go('/');
    });
  }
});*/

Template._loginButtons.events({
    'click #login-buttons-logout': function() {
      Meteor.logout(function () {
        loginButtonsSession.closeDropdown();
        Router.go('/');
      });
    }
  });

 
Template.postJob.events({
  'click button#postJob': function() {
      if (!$('#textarea').val()) {}
      
      else { 
        var options = { message: $("#textarea").val(),
                         to_id : "jobList"
                         };
        if (Meteor.user()) {
          if(!Meteor.user().profile.fullFirstName){
            Meteor.users.update(Meteor.userId(), {
              $set: {
                profile: {
                  fullFirstName : $('#fullFirstNameSimplyRegistration').val(), 
                  fullLastName : $('#fullLastNameSimplyRegistration').val(), 
                }
              }
            }); 
          }
          options.from_id = Meteor.userId();
          options.username = Meteor.user().profile.fullFirstName;
          options.lastname = Meteor.user().profile.fullLastName;
                }
        else {
          options.username = $('#firstName').val();
        }
        Messages.insert(options);
      }
      
      $('#textarea').val('');  
      Router.go('jobs');
  
  }
});

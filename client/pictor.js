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

Template.privateMessagePanel.user= function () {
  return Meteor.users.findOne({_id : this._id});
}; 

Template.myMessages.messages= function () {
  return Messages.find({to_id: Meteor.userId()}, {sort: {created_on:-1}});  
};

Handlebars.registerHelper('fullName', function(person) {
  var a = Meteor.users.findOne({_id : person});
  return a.profile.fullFirstName + " " + a.profile.fullLastName;
});

Handlebars.registerHelper('checkName', function() {
  if (Meteor.user().profile && (Meteor.user().profile.fullFirstName || Meteor.user().profile.fullLastName)) return true;
  return false;
});

/*Template.myMessages.users= function () {
  //var user = Meteor.users.findOne({_id : from_id}); 
  //return user.profile.fullFirstName + " "+user.profile.fullLastName;
  return Meteor.users.find();
};*/

Template.textarea.user= function () {
  return Meteor.user();
};

Template.jobs.jobs= function () {
  return Jobs.find();  
};

Template.form.events({
  'click button#buttonNew' : function () {
    if (!$('#textarea').val()) {
      $('#alert').css('color','red');
    }
    else { 
      var options = { ownPost: $("#textarea").val() }; 
      if (Meteor.user()) {
        if (Meteor.user().profile && (Meteor.user().profile.fullFirstName || Meteor.user().profile.fullLastName)) {
          options.from_id = Meteor.userId();

          Posts.insert(options);
          $('#textarea').val('');
          $('#alert').css('color','#777777');
        }
        else {
          if (!$('#fullFirstNameSimplyRegistration').val() && !$('#fullLastNameSimplyRegistration').val()) {
            $('.enterfirstname').text("Введите имя"); 
          }
          else {
            options.from_id = Meteor.userId();
            Meteor.users.update(Meteor.userId(), {
              $set: {
                profile: {
                  fullFirstName : $('#fullFirstNameSimplyRegistration').val(), 
                  fullLastName : $('#fullLastNameSimplyRegistration').val(), 
                }
              }
            }); 
            Posts.insert(options);
            $('#textarea').val('');
          } 
        }
      }
      else {
        if (!$('#firstName').val()) {
          $('.enterfirstname').text("Введите имя"); 
        }
        else {
          options.name = $('#firstName').val();
          Posts.insert(options);
          $('#textarea').val('');
          $('#alert').css('color','#777777');
          $('.enterfirstname').text(""); 
        }
      }
    }   
  Router.go('guestbook');         
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
    Router.go('myPage');
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
        if(Meteor.user().profile && (Meteor.user().profile.fullFirstName || Meteor.user().profile.fullLastName)){
          if (!$('#fullFirstNameSimplyRegistration').val() || !$('#fullLastNameSimplyRegistration').val()) {}
          else {
            Meteor.users.update(Meteor.userId(), {
              $set: {
                profile: {
                  fullFirstName : $('#fullFirstNameSimplyRegistration').val(), 
                  fullLastName : $('#fullLastNameSimplyRegistration').val(), 
                }
              }
            });
            Messages.insert(options);
            $('#textarea').val(''); 
          } 
        }
        else {
          Messages.insert(options);
          $('#textarea').val(''); 
        }
      }
      else {
        options.username = $('#firstName').val();
        Messages.insert(options);
        $('#textarea').val(''); 
      }
    }          
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
    'click #login-buttons-logout': function(e) {
      e.stopPropagation();
      e.preventDefault();
      Meteor.logout(function () {
        //loginButtonsSession.closeDropdown();
        Router.go('/');
      });
    }
  });

 
Template.postJob.events({
  'click button#postJob': function() {
      if (!$('#textarea').val()) {}
      
      else { 
        var options = { message: $("#textarea").val()};
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
        Jobs.insert(options);
      }  
      Router.go('jobs');
  
  }
});

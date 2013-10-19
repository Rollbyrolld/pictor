/*Meteor.startup(function () {
    // code to run on server at startup
    Posts.allow({ insert: function(id, doc){
      doc.created_on = new Date().getTime(); return true; 
    }});
  });*/

Meteor.startup(function(){
  var thisTime = function(id, doc){
    doc.created_on = new Date().getTime(); return true; 
  }
  Posts.allow({ insert: thisTime});
  Messages.allow({ insert: thisTime});
});


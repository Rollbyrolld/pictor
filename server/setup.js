Meteor.startup(function () {
    // code to run on server at startup
    Posts.allow({ insert: function(id, doc){
      doc.created_on = new Date().getTime(); 
      return true; 
    }});
    Messages.allow({ insert: function(id, doc){
      doc.created_on = new Date().getTime(); 
      return true; 
    }});
    Jobs.allow({ insert: function(id, doc){
      doc.created_on = new Date().getTime(); 
      return true; 
    }});
    //----------------------Remove-block-----------------------------------
    //Meteor.users.remove({}); 
    //Meteor.users.remove({username: "test", username: "testuser"});
    Posts.remove({}); 
    //Messages.remove({}); 
  });

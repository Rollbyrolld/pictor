 Session.set("widgetSet", false);
  var key = "Acip6PqCWSSGI9oJyv9u6z";
  var cb = function () {
    filepicker.makeDropPane($('#exampleDropPane')[0], {
      dragEnter: function() {
        $("#exampleDropPane").html("Drop to upload").css({
          'backgroundColor': "#E0E0E0",
          'border': "1px solid #000"
        });
      }
    });
  };

  Template.home.created = function ( ) { 
    if (!Session.get("widgetSet")) {  
      loadPicker(key, cb);
    }
  };
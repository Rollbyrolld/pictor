
  Session.set("widgetSet", false);
  var key = "Acip6PqCWSSGI9oJyv9u6z";

  
  Template.myGalleries.events({
    'click button#imgSend' : function () {
      filepicker.pick();
    }
  });

  Template.myGalleries.rendered = function () {
      if (!Session.get("widgetSet")) {  
        var cb = function () {
          filepicker.constructWidget(document.getElementById('constructed-widget'));
          filepicker.makeDropPane($('#exampleDropPane')[0], { });
        };
        loadPicker(key, cb);
      }
    };

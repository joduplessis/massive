var attributes = {};
var image = "";

Template.AttributeView.events({
    'click a#media-chooser': function(e) {
        var file = "http://joduplessis.com/massive/"+$(e.currentTarget).data("file");
        image = file;
        $('a#media-chooser').removeClass("media-selected");
        $(e.currentTarget).addClass("media-selected");
    },
    'submit': function (event) {
        event.preventDefault();

        Attributes.update(Router.current().params.id, {$set: {
            'title': event.target.title.value,
            'description': event.target.description.value,
            'image': image
        }});

        Router.go('/attribute/list');
    }
});

Template.AttributeView.helpers({
  'attribute': function() {
      var attribute = Attributes.findOne(Router.current().params.id);
      if (attribute!=undefined) {
          return attribute;
      }
  },
  'media': function() {
      var result = Media.find();
      if (result!=undefined) {
          return result.fetch();
      }
  }
});

Template.AttributeView.onRendered(function () {
    this.autorun(function() {
        var attribute = Attributes.findOne(Router.current().params.id);

        // If we have the object, we allow it to populate
        if (attribute) {
            setTimeout(function() {
                image = attribute.image;

                // Choose the right image
                $('a#media-chooser').each(function(index) {
                    if (("http://joduplessis.com/massive/"+$(this).data('file')) == image) {
                        $(this).addClass("media-selected");
                    }
                })
            }, 500);
        }
    });
});

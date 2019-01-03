Template.PathList.helpers({
    'rows': function() {
        return Paths.find().fetch();
    },
    'size': function() {
        return Paths.find().fetch().length;
    }
});

Template.PathList.events({
    'click #add-path-add': function(e) {
        var path = $('#add-path-text').val();
        var attributesList = Attributes.find().fetch();
        var attributes = {};

        // create the empty attribute object
        for (var count=0; count<attributesList.length; count++) {
            attributes[attributesList[count].title] = 0;
        }

        var id = Paths.insert({
            'author': Session.get("uid"),
            'title' : path,
            'description': 'Some information about this path for the player.',
            'attributes' : attributes,
            'image': '/images/placeholder.png',
            'activities': [],
            'createdAt' :new Date()
        });
        $('#add-path-widget').fadeOut();
    },
    'click #view': function(e) {
        var id = $(e.currentTarget).data('id');

        Router.go('/path/view/'+id);
    },
    'click #delete': function(e) {
        if (window.confirm("You cannot undo this action, are you sure?")) {
            var id = $(e.currentTarget).data('id');

            // Remove from Meteor
            Paths.remove(id);

            // Reroute to remain
            Router.go('/path/list');
        }
    }
});

Template.PathList.onRendered(function () {
});

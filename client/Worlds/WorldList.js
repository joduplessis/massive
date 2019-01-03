Template.WorldList.helpers({
    'rows': function() {
        return Worlds.find().fetch();
    },
    'size': function() {
        return Worlds.find().fetch().length;
    },
});

Template.WorldList.events({
    'click #add-world-add': function(e) {
        var world = $('#add-world-text').val();
        var id = Worlds.insert({
                "title" : world,
                "description": "",
                "camera": "TOP",
                "start": false,
                "image": "/images/placeholder.png",
                "createdAt" :new Date()
        });
        $('#add-world-widget').fadeOut();
    },
    'click #view': function(e) {
        var id = $(e.currentTarget).data('id');

        Router.go('/world/view/'+id);
    },
    'click #builder': function(e) {
        var id = $(e.currentTarget).data('id');

        Router.go('/world/builder/'+id);
    },
    'click #delete': function(e) {
        if (window.confirm("You cannot undo this action, are you sure?")) {
            var id = $(e.currentTarget).data('id');

            // Remove from Meteor
            Worlds.remove(id);

            // Reroute to remain
            Router.go('/world/list');
        }
    }
});


Template.WorldList.onRendered(function () {
});

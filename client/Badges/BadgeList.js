Template.BadgeList.helpers({
    'rows': function() {
        return Badges.find().fetch();
    },
    'size': function() {
        return Badges.find().fetch().length;
    }
});

Template.BadgeList.events({
    'click #add-badge-add': function(e) {
        var attributesList = Attributes.find().fetch();
        var attributes = {};

        // create the empty attribute object
        for (var count=0; count<attributesList.length; count++) {
            attributes[attributesList[count].title] = 0;
        }

        Badges.insert({
            "title" : $('#add-badge-text').val(),
            "description": "Enter some text here describing the badge to the player.",
            "image": "/images/placeholder.png",
            "attributes" : attributes,
            "createdAt" :new Date()
        });
    },
    'click #view': function(e) {
        var id = $(e.currentTarget).data('id');

        Router.go('/badge/view/'+id);
    },
    'click #delete': function(e) {
        if (window.confirm("You cannot undo this action, are you sure?")) {
            var id = $(e.currentTarget).data('id');

            // Remove from Meteor
            Badges.remove(id);

            // Reroute to remain
            Router.go('/badge/list');
        }
    }
});

Template.BadgeList.onRendered(function () {
});

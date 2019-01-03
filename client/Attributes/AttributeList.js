Template.AttributeList.helpers({
    'rows': function() {
        return Attributes.find().fetch();
    },
    'size': function() {
        return Attributes.find().fetch().length;
    }
});

Template.AttributeList.events({
    'click #add-attribute-add': function(e) {
        Attributes.insert({
            "title" : $('#add-attribute-text').val(),
            "description": "Description of the attribute",
            "image": "/images/placeholder.png",
            "createdAt" :new Date()
        });
    },
    'click #view': function(e) {
        var id = $(e.currentTarget).data('id');

        Router.go('/attribute/view/'+id);
    },
    'click #delete': function(e) {
        if (window.confirm("You cannot undo this action, are you sure?")) {
            var id = $(e.currentTarget).data('id');

            // Remove from Meteor
            Attributes.remove(id);

            // Reroute to remain
            Router.go('/attribute/list');
        }
    }
});

Template.AttributeList.onRendered(function () {
});

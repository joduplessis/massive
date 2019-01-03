Template.UserList.helpers({
    'rows': function() {
        return Users.find().fetch();
    },
    'size': function() {
        return Users.find().fetch().length;
    }
});

Template.UserList.events({
    'click #add-user-add': function(e) {
        var attributesList = Attributes.find().fetch();
        var attributes = {};

        // create the empty attribute object
        for (var count=0; count<attributesList.length; count++) {
            attributes[attributesList[count].title] = 0;
        }

        Users.insert({
                "email" : $('#add-user-text').val(),
                "image" : "",
                "avatar" : "",
                "playname" : "",
                "fullname" : "",
                "password" : "",
                "role" : "",
                "attributes" : attributes,
                "progress" : [],
                "achievements": [],
                "createdAt" :new Date()
        });
    },
    'click #view': function(e) {
        var id = $(e.currentTarget).data('id');

        Router.go('/user/view/'+id);
    },
    'click #delete': function(e) {
        if (window.confirm("You cannot undo this action, are you sure?")) {
            var id = $(e.currentTarget).data('id');

            // Remove from Meteor
            Users.remove(id);

            // Reroute to remain
            Router.go('/user/list');
        }
    }
});

Template.UserList.onRendered(function () {
});

Template.Navigation.helpers({
    'fullname': function() {
        var result = Users.findOne({'_id': Session.get("uid")});
        if (result) {
            return result.fullname;
        }
    },
    'avatar': function() {
        var result = Users.findOne({'_id': Session.get("uid")});
        if (result) {
            return result.avatar;
        }
    },
    'image': function() {
        var result = Users.findOne({'_id': Session.get("uid")});
        if (result) {
            return result.image;
        }
    },
    'role': function() {
        var result = Users.findOne({'_id': Session.get("uid")});
        if (result) {
            return result.role;
        }
    },
    'paths': function() {
        return Paths.find().fetch().length;
    },
    'massive': function() {
        return Massive.findOne();
    }
});

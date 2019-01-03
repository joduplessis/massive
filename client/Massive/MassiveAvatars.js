Template.MassiveAvatars.helpers({
    'avatars': function() {
        var result = Massive.findOne();
        if (result!=undefined) {
            return result.avatars;
        }
    }
});

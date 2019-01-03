Template.MassiveRoles.helpers({
    'roles': function() {
        var result = Massive.findOne();
        if (result!=undefined) {
            return result.roles;
        }
    }
});

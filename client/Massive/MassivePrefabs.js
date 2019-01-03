Template.MassivePrefabs.helpers({
    'prefabs': function() {
        var result = Massive.findOne();
        if (result!=undefined) {
            return result.prefabs;
        }
    }
});

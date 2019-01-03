Template.MassiveCameras.helpers({
    'cameras': function() {
        var result = Massive.findOne();
        if (result!=undefined) {
            return result.cameras;
        }
    }
});

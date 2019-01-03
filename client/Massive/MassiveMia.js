Template.MassiveMia.helpers({
    'mia': function() {
        var result = Massive.findOne();
        if (result!=undefined) {
            return result.mia;
        }
    }
});

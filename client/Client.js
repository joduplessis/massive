// Include our collections
Users = new Mongo.Collection("users");
Worlds = new Mongo.Collection("worlds");
Paths = new Mongo.Collection("paths");
Objects = new Mongo.Collection("objects");
Activity = new Mongo.Collection("activity");
Badges = new Mongo.Collection("badges");
Media = new Mongo.Collection("media");
Attributes = new Mongo.Collection("attributes");
Massive = new Mongo.Collection("massive");

// Subscribe to our collection
Meteor.subscribe('users');
Meteor.subscribe('worlds');
Meteor.subscribe('paths');
Meteor.subscribe('objects');
Meteor.subscribe('activity');
Meteor.subscribe('badges');
Meteor.subscribe('media');
Meteor.subscribe('attributes');
Meteor.subscribe('massive');

Template.registerHelper('toUpperCase',function(obj){
    return obj.hash.object.toUpperCase();
});

Template.registerHelper('getImageLocation', function(object) {
    return Media.findOne({'_id': object.hash.id}).file;
});

Template.registerHelper('getAttributeTitle', function(object) {
    return Attributes.findOne({'_id': object.hash.id}).title;
});

Template.registerHelper('shortenDateObject', function(dateObject) {
    var dateString = dateObject.hash.object + '';
    var splitDateString = dateString.split(' ');
    //return splitDateString[0]+' '+splitDateString[1]+' '+splitDateString[2]+' '+splitDateString[3]+' '+splitDateString[4];
    return splitDateString[1]+' '+splitDateString[2]+' '+splitDateString[3];
});

Template.registerHelper('sentenceCase', function(dateObject) {
    var textString = dateObject.hash.object + '';
    var textStringLowercase = textString.toLowerCase();
    var textArray = textStringLowercase.split("");

    for (var c=0; c<textArray.length; c++) {
        if (textArray[c]=="_")
            textArray[c] = "";

    }

    textArray[0] = textArray[0].toUpperCase();

    return textArray.join("");
});

Template.registerHelper('compareString', function(string1, string2) {
    if (string1==string2) {
        return true;
    } else {
        return false;
    }
});

Template.registerHelper('isImage', function(filename) {
    if (filename.hash.filename!=undefined) {
        var parts = filename.hash.filename.split('.');
        var ext = parts[parts.length - 1];
        switch (ext.toLowerCase()) {
            case 'jpg':
            case 'gif':
            case 'bmp':
            case 'png':
                return true;
        }
        return false;
    }
});

Template.registerHelper('isVideo', function(filename) {
    if (filename.hash.filename!=undefined) {
        var parts = filename.hash.filename.split('.');
        var ext = parts[parts.length - 1];
        switch (ext.toLowerCase()) {
            case 'ogv':
            case 'mp4':
            case 'ogg':
                return true;
        }
        return false;
    }
});

Blaze._allowJavascriptUrls()
Session.set("uid", "b4wQTzB5RYWQ2RPZx");

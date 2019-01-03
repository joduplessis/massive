import { Meteor } from 'meteor/meteor';

Meteor.startup(function () {
    Users = new Mongo.Collection("users");
    Users.allow({
        insert: function () { return true; },
        update: function () { return true; },
        remove: function () { return true; }
    });

    Worlds = new Mongo.Collection("worlds");
    Worlds.allow({
        insert: function () { return true; },
        update: function () { return true; },
        remove: function () { return true; }
    });

    Paths = new Mongo.Collection("paths");
    Paths.allow({
        insert: function () { return true; },
        update: function () { return true; },
        remove: function () { return true; }
    });

    Objects = new Mongo.Collection("objects");
    Objects.allow({
        insert: function () { return true; },
        update: function () { return true; },
        remove: function () { return true; }
    });

    Activity = new Mongo.Collection("activity");
    Activity.allow({
        insert: function () { return true; },
        update: function () { return true; },
        remove: function () { return true; }
    });

    Badges = new Mongo.Collection("badges");
    Badges.allow({
        insert: function () { return true; },
        update: function () { return true; },
        remove: function () { return true; }
    });

    Massive = new Mongo.Collection("massive");
    Massive.allow({
        insert: function () { return true; },
        update: function () { return true; },
        remove: function () { return true; }
    });

    Attributes = new Mongo.Collection("attributes");
    Attributes.allow({
        insert: function () { return true; },
        update: function () { return true; },
        remove: function () { return true; }
    });

    Media = new Mongo.Collection("media");
    Media.allow({
        insert: function () { return true; },
        update: function () { return true; },
        remove: function () { return true; }
    });

    Meteor.publish("users", function() { return Users.find(); });
    Meteor.publish("worlds", function() { return Worlds.find(); });
    Meteor.publish("paths", function() { return Paths.find(); });
    Meteor.publish("objects", function() { return Objects.find(); });
    Meteor.publish("activity", function() { return Activity.find(); });
    Meteor.publish("badges", function() { return Badges.find(); });
    Meteor.publish("massive", function() { return Massive.find(); });
    Meteor.publish("attributes", function() { return Attributes.find(); });
    Meteor.publish("media", function() { return Media.find(); });

});

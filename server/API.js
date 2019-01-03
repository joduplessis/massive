/*
    Possible response objects
    var request = this.request;
    var params = this.params;
    var response = this.response;
*/

Router.route('/api/user/:e/:p', function () {
    this.response.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
    });

    var output = Users.find({'email':this.params.e, 'password': this.params.p}).fetch();

    this.response.end(JSON.stringify(output));
}, {where: 'server'});

Router.route('/api/massive', function () {
    this.response.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'});

    var output = Massive.findOne();

    this.response.end(JSON.stringify(output));
}, {where: 'server'});

Router.route('/api/worlds', function () {
    this.response.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'});

    var output = Worlds.find().fetch();

    this.response.end(JSON.stringify(output));
}, {where: 'server'});

Router.route('/api/paths', function () {
    this.response.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'});

    var output = Paths.find().fetch();

    this.response.end(JSON.stringify(output));
}, {where: 'server'});

Router.route('/api/objects', function () {
    this.response.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'});

    var output = Objects.find().fetch();

    this.response.end(JSON.stringify(output));
}, {where: 'server'});




Router.route('/api/object/add/:worldid/:prefab', function () {
    this.response.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'});

    var worldid = this.params.worldid;
    var prefab = this.params.prefab;
    var id = Objects.insert({
        "world" : worldid,
        "prefab" : prefab,
        "path" : "",
        "activities" : "",
        "position" : {
            "x" : 0,
            "y" : 0,
            "z" : 0
        },
        "mia" : "",
        "parameter" : "",
        'createdAt': new Date()
    });

    this.response.end(JSON.stringify({'_id': id}));
}, {where: 'server'});

Router.route('/api/object/:id/position/:x/:y/:z', function() {
    this.response.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'});

    Objects.update(this.params.id, {$set: {
        "position": {
            "x" : this.params.x,
            "y" : this.params.y,
            "z" : this.params.z
        }
    }});

    this.response.end(JSON.stringify({}));
}, { where: "server" });

Router.route('/api/object/:id/:path/:activities/:mia/:parameter', function() {
    this.response.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'});

    var path = (this.params.path=="no") ? "" : this.params.path;
    var activities = (this.params.activities=="no") ? "" : this.params.activities;
    var mia = (this.params.mia=="no") ? "" : this.params.mia;
    var parameter = (this.params.parameter=="no") ? "" : this.params.parameter;

    Objects.update(this.params.id, {$set: {
        "path" : path,
        "activities" : activities,
        "mia" : mia,
        "parameter" : parameter
    }});

    this.response.end(JSON.stringify({}));
}, { where: "server" });

Router.route('/api/object/delete/:id', function () {
    this.response.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'});

    Objects.remove({'_id': this.params.id});

    this.response.end(JSON.stringify({'success': true}));
}, {where: 'server'});

Router.route('/api/activities/update_position/:id/:old/:new', function () {
    this.response.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'});

    var path = Paths.findOne(this.params.id);
    var activities = path.activities;
    var positionOld = this.params.old;
    var positionNew = this.params.new;

    activities.move(positionOld, positionNew);

    Paths.update(this.params.id, {$set: {
        'activities': activities
    }});

    this.response.end(JSON.stringify({'success': true}));
}, {where: 'server'});

Router.route('/api/activities/add/:id/:title', function () {
    this.response.writeHead(200, {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'});

    var path = Paths.findOne(this.params.id);
    var activities = path.activities;
    var activitiesId = createUniqueActivitiesId();

    activities.push({'_id': activitiesId, 'title': this.params.title, 'content': ''})

    Paths.update(this.params.id, {$set: {
        'activities': activities
    }});

    this.response.end(JSON.stringify({'_id': activitiesId}));
}, {where: 'server'});

Router.route('/api/activities/update', {where: 'server'})
  .get(function () {
    this.response.end('get request\n');
  })
  .post(function () {
      var activitiesTitle = this.params.query.title;
      var pathId = this.params.query.path;
      var activitiesId = this.params.query.activities;
      var html = this.params.query.html;
      var path = Paths.findOne(pathId);
      var activities = path.activities;
      for (var m=0;m<activities.length;m++) {
          if (activities[m]._id==activitiesId) {
            activities[m].content = html;
            activities[m].title = activitiesTitle;
          }
      }
      Paths.update(pathId, {$set: {
          'activities': activities
      }});
      this.response.end(html);
  });

Router.route('/api/activities/delete/:id/:aid', function () {
  this.response.writeHead(200, {'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*'});

  var path = Paths.findOne(this.params.id);
  var activities = path.activities;
  var revisedActivities = [];

  for (var m=0; m<activities.length; m++) {
      if (activities[m]._id!=this.params.aid)
        revisedActivities.push(activities[m]);
  }

  Paths.update(this.params.id, {$set: {
      'activities': revisedActivities
  }});

  this.response.end(JSON.stringify({'success': true}));
}, {where: 'server'});

function createUniqueActivitiesId() {
    return "activities"+String(Date.now());
}

Array.prototype.move = function(from, to) {
    this.splice(to, 0, this.splice(from, 1)[0]);
};

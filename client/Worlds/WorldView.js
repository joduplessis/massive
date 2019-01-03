var image = "";

Template.WorldView.events({
    // When the use submits
    'submit': function (event) {
        // Prevent default browser form submit
        event.preventDefault();

        // Insert & blueprint for DB
        Worlds.update(Router.current().params.id, {$set: {
            'title': event.target.title.value,
            'description': event.target.description.value,
            'start': event.target.start.checked,
            'camera': event.target.camera.value,
            'image': image
        }});

        // Redirect
        Router.go('/world/list');
    },
    'click a#world-image': function(e) {
        var file = "http://joduplessis.com/massive/"+$(e.currentTarget).data("file");
        image = file;
        $('a#world-image').removeClass("world-image-selected");
        $(e.currentTarget).addClass("world-image-selected");
    },
});

Template.WorldView.helpers({
  'title': function() {
      var world = Worlds.findOne(Router.current().params.id)
      if (world!=undefined) {
          return world.title;
      }
  },
  'description': function() {
      var world = Worlds.findOne(Router.current().params.id)
      if (world!=undefined) {
          return world.description;
      }
  },
  'start': function() {
      var world = Worlds.findOne(Router.current().params.id)
      if (world!=undefined) {
          if (world.start==true) {
              return "checked";
          }
      }
  },
  'camera': function() {
      var result = Massive.findOne();
      if (result!=undefined) {
          return result.cameras;
      }
  },
  'media': function() {
      return Media.find().fetch();
  }
});



Template.WorldView.onRendered(function () {

    setTimeout(function() {
        var m = Worlds.findOne(Router.current().params.id) ;

        setTimeout(function() {
            if (m.camera!=""&&m.camera!=undefined) {
                $('#camera').val(m.camera);

                image = m.image;

                // Choose the right image
                $('a#world-image').each(function(index) {
                    if (("http://joduplessis.com/massive/"+$(this).data('file')) == image) {
                        $(this).addClass("world-image-selected");
                    }
                })
            }
        },500);
    },250);

    var ctxOverview  = document.getElementById("overview").getContext("2d");
    var optionsOverview = {
        scaleShowGridLines: true,
        scaleGridLineColor: "rgba(0,0,0,.05)",
        scaleGridLineWidth: 1,
        scaleShowHorizontalLines: true,
        scaleShowVerticalLines: true,
        scaleFontSize: 10,
        scaleFontStyle: "normal",
        scaleFontColor: "#aaa",
        bezierCurve: true,
        bezierCurveTension: 0.4,
        pointDot: true,
        pointDotRadius: 4,
        pointDotStrokeWidth: 1,
        pointHitDetectionRadius: 20,
        datasetStroke: true,
        datasetStrokeWidth: 2,
        datasetFill: true,
        legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>",
        responsive: true,
        animateScale: true
    };

    // Set the data
    var dataOverview = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [{
            label: "Health",
            fillColor: "rgba(220,220,220, 0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [random(), random(), random(), random(), random(), random(), random()]
        },{
            label: "Money",
            fillColor: "rgba(54,146,178, 0.2)",
            strokeColor: "rgba(44,124,151, 0.2)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [random(), random(), random(), random(), random(), random(), random()]
        }]
    };

    // draw the charts
    new Chart(ctxOverview).Bar(dataOverview, optionsOverview);
});

function random() {
    return Math.floor((Math.random() * 100) + 1);
}


Template.UserView.events({
    // When the use submits
    'submit': function (event) {
        // Prevent default browser form submit
        event.preventDefault();

        // Insert & blueprint for DB
        Users.update(Router.current().params.id, {$set: {
            role: event.target.role.value
        }});

        // Redirect
        Router.go('/user/list');
    }
});

Template.UserView.helpers({
    'role': function() {
        var result = Massive.findOne();
        if (result!=undefined) {
            return result.roles;
        }
    },
  'user': function() {
      var user = Users.findOne(Router.current().params.id)
      if (user!=undefined) {
          return user;
      }
  },
});


Template.UserView.onRendered(function () {
    setTimeout(function() {
        var m = Users.findOne(Router.current().params.id) ;

        setTimeout(function() {
            if (m.role!=""&&m.role!=undefined) {
                $('#role').val(m.role);
            }
        },500);
    },250);

    this.autorun(function() {
        var user = Users.findOne(Router.current().params.id) ;
        if (user) {
            setTimeout(function() {
                attributes = user.attributes;
                var labels = [];
                var values = [];

                for (var key in attributes) {
                    labels.push(key)
                    values.push(attributes[key]);
                }

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
                    labels: labels,
                    datasets: [{
                        label: "Health",
                        fillColor: "rgba(220,220,220, 0.2)",
                        strokeColor: "rgba(220,220,220,1)",
                        pointColor: "rgba(220,220,220,1)",
                        pointStrokeColor: "#fff",
                        pointHighlightFill: "#fff",
                        pointHighlightStroke: "rgba(220,220,220,1)",
                        data: values
                    }]
                };

                // draw the charts
                new Chart(ctxOverview).Bar(dataOverview, optionsOverview);
            }, 500);
        }
    });





});

function random() {
    return Math.floor((Math.random() * 100) + 1);
}

var attributes = {};
var activities = [];
var image = "";

Template.PathView.events({
    'click #edit-activities': function(event) {
        Router.go('/path/view/'+Router.current().params.id+'/activities/'+$(event.target).data('id'));
    },
    'click #add-activities': function() {
        var title = $('#add-activities-text').val();
        HTTP.get('http://localhost:3000/api/activities/add/'+Router.current().params.id+'/'+title, {
        }, function(error, response) {
            if (error) {
            } else {
                var id = JSON.parse(response.content)._id;
            }
        });
    },
    'click a#path-image': function(e) {
        var file = "http://joduplessis.com/massive/"+$(e.currentTarget).data("file");
        image = file;
        $('a#path-image').removeClass("path-image-selected");
        $(e.currentTarget).addClass("path-image-selected");
    },
    'submit': function (event) {
        event.preventDefault();

        Paths.update(Router.current().params.id, {$set: {
            'title': event.target.title.value,
            'description': event.target.description.value,
            'attributes': attributes,
            'image': image
        }});

        // Redirect
        // Router.go('/path/list');
        alert("Successfully updated.");
    }
});

Template.PathView.helpers({
    'media': function() {
        return Media.find().fetch();
    },
    'title': function() {
        var path = Paths.findOne(Router.current().params.id)
        if (path!=undefined) {
            return path.title;
        }
    },
    'activities': function() {
        var path = Paths.findOne(Router.current().params.id)
        if (path!=undefined) {
            return path.activities;
        }
    },
    'description': function() {
        var path = Paths.findOne(Router.current().params.id)
        if (path!=undefined) {
            return path.description;
        }
    },
    'attributes': function() {
        var attr = Attributes.find().fetch();

        if (attr!=undefined)
            return attr;
    }
});

Template.PathView.onRendered(function () {
    this.autorun(function() {
        var path = Paths.findOne(Router.current().params.id) ;

        // If we have the object, we allow it to populate
        if (path) {
            setTimeout(function() {
                attributes = path.attributes;
                activities = path.activities;
                image = path.image;

                // Choose the right image
                $('a#path-image').each(function(index) {
                    if (("http://joduplessis.com/massive/"+$(this).data('file')) == image) {
                        $(this).addClass("path-image-selected");
                    }
                })

                // Creating the sliders for the attributes
                for (var key in attributes) {
                    $("#slider_"+key).slider({
                        create: function(event, ui){
                            $(this).slider('value', attributes[key]);

                            $("#value_"+key).html(attributes[key]);
                        },
                        stop: function(event, ui) {
                            var id = $(event.target).data('for');

                            // update the ui
                            $("#value_"+id).html(ui.value);

                            // update the attributes object
                            attributes[id] = ui.value;
                        }
                    });
                }

                // Creating the activities graphcs
                for (var m=0; m<activities.length; m++) {
                    var ctxOverview  = document.getElementById("overview"+activities[m]._id).getContext("2d");
                    var optionsOverview = {
                        scaleShowGridLines: false,
                        scaleGridLineColor: "rgba(0,0,0,.05)",
                        scaleGridLineWidth: 0,
                        scaleShowHorizontalLines: false,
                        scaleShowVerticalLines: false,
                        scaleFontSize: 6,
                        showScale: false,
                        barShowStroke: 0,
                        barShowStrokeWidth: 0,
                        scaleFontStyle: "normal",
                        scaleFontColor: "#aaa",
                        scaleShowLabels: false,
                        bezierCurve: true,
                        bezierCurveTension: 0.2,
                        pointDot: false,
                        pointDotRadius: 2,
                        pointDotStrokeWidth: 0.5,
                        pointHitDetectionRadius: 20,
                        datasetStroke: false,
                        datasetStrokeWidth: 1,
                        datasetFill: true,
                        responsive: true,
                        animateScale: true,
                        showTooltips: false
                    };

                    var gradient = ctx.createLinearGradient(0, 0, 1000, 0);
                    gradient.addColorStop(0, 'rgba(88,180,203,0.5)');
                    gradient.addColorStop(1, 'rgba(250,174,50,0)');

                    var dataOverview = {
                        labels: ["", "", "", "", "", "", "", "", "", "", "", "", "", ""],
                        datasets: [{
                            label: "",
                            fillColor: gradient,
                            strokeColor: gradient,
                            pointColor: "rgba(88,180,203,1)",
                            pointStrokeColor: "#fff",
                            pointHighlightFill: "#fff",
                            pointHighlightStroke: "rgba(220,220,220,1)",
                            data: [random(), random(), random(), random(), random(), random(), random(), random(), random(), random(), random(), random(), random(), random()]
                        }]
                    };
                    new Chart(ctxOverview).Line(dataOverview, optionsOverview);
                }

                // Make the list sortable
                $('ul.activities').sortable({
                    placeholder: "ui-state-highlight",
                    stop: function(event, ui) {
                    },
                    update: function(event, ui) {
                        var api = 'http://localhost:3000/api/activities/update_position/'+Router.current().params.id+'/'+$(ui.item).data('old')+'/'+ui.item.index();
                        HTTP.get(api, {
                        }, function(error, response) {
                        });
                    },
                    start: function(event, ui) {
                        $(ui.item).data('old' , ui.item.index());
                    }
                }).disableSelection();
            }, 500);
        }
    });

    var ctx  = document.getElementById("overview").getContext("2d");

    var options = {
        legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>",
        responsive: true,
        animateScale: true
    }

    var data = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [{
            label: "October",
            fillColor: "rgba(255, 99, 132, 0.2)",
            strokeColor: "rgba(255,99,132,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [random(), random(), random(), random(), random(), random(), random()]
        }, {
            label: "November",
            fillColor: "rgba(54, 162, 235, 0.2)",
            strokeColor: "rgba(54, 162, 235, 1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: [random(), random(), random(), random(), random(), random(), random()]
        }]
    };

    new Chart(ctx).Bar(data, options);
});

function random() {
    return Math.floor((Math.random() * 100) + 1);
}

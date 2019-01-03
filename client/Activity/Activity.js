Template.Activity.helpers({
});

Template.Activity.events({
    'click #path': function(e) {
        Router.go('/path/list');
    },
    'click #map': function(e) {
        Router.go('/map/list');
    },
    'click #badge': function(e) {
        Router.go('/badge/list');
    },
    'click #media': function(e) {
        Router.go('/media/list');
    },
});

Template.Activity.onRendered(function() {
    // Get the context of the canvas element we want to select
    var ctxOverview  = document.getElementById("overview").getContext("2d");
    var ctxAttributes = document.getElementById("attributes").getContext("2d");
    var ctxDemo1 = document.getElementById("demo1").getContext("2d");
    var ctxDemo2 = document.getElementById("demo2").getContext("2d");
    var ctxDemo3 = document.getElementById("demo3").getContext("2d");

    var options = {
        scaleShowGridLines: true,
        scaleGridLineColor: "rgba(0,0,0,.05)",
        scaleGridLineWidth: 1,
        scaleShowHorizontalLines: true,
        scaleShowVerticalLines: true,
        scaleFontSize: 10,
        showScale: true,
        barShowStroke: 1,
        barShowStrokeWidth: 1,
        scaleFontStyle: "normal",
        scaleFontColor: "#aaa",
        scaleShowLabels: true,
        bezierCurve: true,
        bezierCurveTension: 0.2,
        pointDot: true,
        pointDotRadius: 2,
        pointDotStrokeWidth: 0.5,
        pointHitDetectionRadius: 20,
        datasetStroke: true,
        datasetStrokeWidth: 1,
        datasetFill: true,
        responsive: true,
        animateScale: true,
        showTooltips: true,
        scaleShowLine: true,
        angleShowLineOut: true,
        scaleShowLabels: true,
        scaleBeginAtZero: true,
        angleLineColor: "rgba(0,0,0,.1)",
        angleLineWidth: 1,
        pointLabelFontFamily: "'Arial'",
        pointLabelFontStyle: "normal",
        pointLabelFontSize: 10,
        pointLabelFontColor: "#666",
        legendTemplate: "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
    }



    // Set the data
    var dataOverview = {
        labels: ["January", "February", "March", "April", "May", "June", "July"],
        datasets: [{
            label: "October",
            fillColor: "rgba(220,220,220, 0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: 'rgba(88,180,203,0.5)',
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [random(), random(), random(), random(), random(), random(), random()]
        }, {
            label: "November",
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: 'rgba(88,180,203,0.5)',
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: [random(), random(), random(), random(), random(), random(), random()]
        }]
    };

    var dataAttributes = {
        labels: ["Knowledge", "Health", "Money"],
        datasets: [{
            label: "October",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: 'rgba(88,180,203,0.5)',
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [random(), random(), random()]
        }, {
            label: "November",
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: 'rgba(88,180,203,0.5)',
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: [random(), random(), random()]
        }]
    };

    var dataRandom = [{
        value: random(),
        color: 'rgba(88,180,203,0.7)',
        highlight: "#4D7683",
        label: "Red"
    },{
        value: random(),
        color: "rgba(151,187,205,0.7)",
        highlight: "#65B8C9",
        label: "Green"
    },{
        value: random(),
        color: "rgba(220,220,220,0.7)",
        highlight: "#1F9892",
        label: "Yellow"}
    ];

    // draw the charts
    var myLineChart = new Chart(ctxOverview).Line(dataOverview, options);
    var myRadarChart = new Chart(ctxAttributes).Radar(dataAttributes, options);
    var myPolarArea = new Chart(ctxDemo1).PolarArea(dataRandom, options);
    var myPieChart = new Chart(ctxDemo2).Pie(dataRandom, options);
    var myDoughnutChart = new Chart(ctxDemo3).Doughnut(dataRandom, options);

    document.getElementById("overview").innerHTML = myLineChart.generateLegend();
});

function random() {
    return Math.floor((Math.random() * 100) + 1);
}

var attributes = {};
var image = "";

Template.BadgeView.events({
    'click a#media-chooser': function(e) {
        var file = "http://joduplessis.com/massive/"+$(e.currentTarget).data("file");
        image = file;
        $('a#media-chooser').removeClass("media-selected");
        $(e.currentTarget).addClass("media-selected");
    },
    'submit': function (event) {
        event.preventDefault();

        Badges.update(Router.current().params.id, {$set: {
            'title': event.target.title.value,
            'description': event.target.description.value,
            'attributes': attributes,
            'image': image
        }});

        Router.go('/badge/list');
    }
});

Template.BadgeView.helpers({
  'badge': function() {
      var badge = Badges.findOne(Router.current().params.id);
      if (badge!=undefined) {
          return badge;
      }
  },
  'media': function() {
      var result = Media.find();
      if (result!=undefined) {
          return result.fetch();
      }
  },
  'attributes': function() {
      var attr = Attributes.find().fetch();

      if (attr!=undefined)
          return attr;
  }
});

Template.BadgeView.onRendered(function () {
    this.autorun(function() {
        var badge = Badges.findOne(Router.current().params.id);

        // If we have the object, we allow it to populate
        if (badge) {
            setTimeout(function() {
                attributes = badge.attributes;
                image = badge.image;

                // Choose the right image
                $('a#media-chooser').each(function(index) {
                    if (("http://joduplessis.com/massive/"+$(this).data('file')) == image) {
                        $(this).addClass("media-selected");
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

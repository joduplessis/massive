var selectedObject;
var selectedContent;
var selectedNode;

var returnWidgetToolHtml = function(type) {
    return '<div id="tools" class="tools"><a href="#" id="widget-delete"><span class="fa fa-times"></span></a><a href="#" id="widget-select"><span class="fa fa-hand-o-up"></span></a><span class="label">'+type+'</span></div>';
}
var returnLastWidgetLi = function(type) {
    return '<li><div class="content" id="content"><a href="#"><span class="fa fa-html5" id="add-widget-html5"></span></a><a href="#"><span class="fa fa-check" id="add-widget-choice"></span></a><a href="#"><span class="fa fa-hand-paper-o" id="add-widget-bounce"></span></a></div></li>';
}
var resetAndDisableProperties = function() {
    $("#properties .formatting .disable").show();
    $("#properties .dimensions .disable").show();
    $("#properties .video .disable").show();
    $("#properties .image .disable").show();
    $("#properties .choice .disable").show();
    $("#properties .bounce .disable").show();

    // Reset the choice
    $(".collapsible-content.choice table#choice tr").each(function() {
        var fields = $(this).find('input');
        var text = $(fields[0]);
        var radio = $(fields[1]);

        text.val('');
        radio.prop("checked", false);
    });

    // Reset the bounce
    $("#sliderBounce").slider('option', 'value', 0);
    $("#sliderBounce #custom-handle").text('0');

    // Reset the height & width
    $("#sliderWidth").slider('option', 'value', 0);
    $("#sliderWidth #custom-handle").text(0);
    $("#sliderHeight").slider('option', 'value', 0);
    $("#sliderHeight #custom-handle").text(0);
}
var convertObjectDimensionToPercentage = function(dimension) {
    return Math.floor(900/dimension);
}
var convertPercentageToObjectDimension = function(percentage) {
    return Math.floor((percentage/100) * 900);
}

Template.PathActivities.events({
    'click #bold': function() { document.execCommand('bold'); },
    'click #underline': function() { document.execCommand('underline'); },
    'click #italic': function() { document.execCommand('italic'); },
    'click #outdent': function() { document.execCommand('outdent'); },
    'click #indent': function() { document.execCommand('indent'); },
    'click #justify-right': function() { document.execCommand('justifyRight'); },
    'click #justify-center': function() { document.execCommand('justifyCenter'); },
    'click #justify-left': function() { document.execCommand('justifyLeft'); },
    'click #table': function() {
        var html = "<table width='100%'>";
        var rows = 2;
        var cols = 2;
        for(var i = 0; i < rows; i++) {
            html += "<tr>";
            for(var j = 0; j < cols; j++) {
                html += "<td></td>";
            }
            html += "</tr>";
        }
        html += "</table>";
        document.execCommand('insertHTML', true, ''+html+'</table>');
    },
    'click #thumbnail-image': function(e) {
        var id = $(e.currentTarget).data("id");
        var file = $(e.currentTarget).data("file");
        $('.thumbnail').removeClass("selected");
        $(e.currentTarget).addClass("selected");
        document.execCommand('insertHTML', true,'<img src="http://joduplessis.com/massive/'+file+'" data-id="'+file+'" width="100"/>');
    },
    'click #thumbnail-video': function(e) {
        var id = $(e.currentTarget).data("id");
        var file = $(e.currentTarget).data("file");
        $('.thumbnail').removeClass("selected");
        $(e.currentTarget).addClass("selected");
        document.execCommand('insertHTML', true,'<video width="100"><source src="http://joduplessis.com/massive/'+file+'"></video>');
    },
    'click #add-widget-html5': function() {
        var ul = $('ul.widgets');
        var li = $('<li></li>');
        var content = $('<div id="content" class="content" contenteditable="true"></div>');

        li.append(returnWidgetToolHtml('HTML5'));
        li.append(content);
        ul.prepend(li);
    },
    'click #add-widget-bounce': function() {
        var ul = $('ul.widgets');
        var li = $('<li class="no-look"></li>');
        var content = $('<div id="content" class="content">bounce|duration:5</div>');

        li.append(returnWidgetToolHtml('Bounce'));
        li.append(content);
        ul.prepend(li);
    },
    'click #add-widget-choice': function() {
        var ul = $('ul.widgets');
        var li = $('<li class="no-look"></li>');
        var content = $('<div id="content" class="content">choice|This is the wrong answer:false|This is the right answer:true</div>');

        li.append(returnWidgetToolHtml('Choice'));
        li.append(content);
        ul.prepend(li);
    },
    'click #choice-update': function(event) {
        var content = ['choice'];

        $(".collapsible-content.choice table#choice tr").each(function() {
            var tableRow = $(this);
            var fields = tableRow.find('input');
            var text = $(fields[0]);
            var radio = $(fields[1]);
            var check = radio.prop("checked");

            if (text.val()!="")
                content.push(text.val()+":"+check);
        });

        selectedContent.html(content.join("|"));

    },
    'click #widget-select': function(event) {
        var target = $(event.target).parent().parent().parent();
        var content = target.find('#content').html();
        var parts = content.split('|');
        var tableRows = $(".collapsible-content.choice table#choice tr");

        selectedContent = target.find('#content');

        $('ul.widgets li').each(function(index, obj) {
            $(this).removeClass('selected');
        });

        target.addClass('selected');

        resetAndDisableProperties();

        if (parts[0]=="choice") {
            parts.shift();

            for (var p=0; p<parts.length; p++) {
                var choice = parts[p].split(':')[0];
                var correct = parts[p].split(':')[1];
                var tableRow = $(tableRows[p]);
                var fields = tableRow.find('input');
                var text = $(fields[0]);
                var radio = $(fields[1]);

                text.val(choice);

                if (correct=="true")
                    radio.prop("checked", true)
            }

            $("#properties").accordion('option', 'active' , 4);

            $("#properties .choice .disable").hide();
        } else if (parts[0]=="bounce") {
            var duration = parts[1].split(':')[1];

            $("#properties").accordion('option', 'active' , 5);
            $("#sliderBounce").slider('option', 'value', duration);
            $("#sliderBounce #custom-handle").text(duration);
            $("#properties .bounce .disable").hide();
        } else {
            $("#properties .formatting .disable").hide();
            $("#properties .dimensions .disable").hide();
            $("#properties .image .disable").hide();
            $("#properties .video .disable").hide();
            $("#properties").accordion('option', 'active' , 0);
        }
    },
    'click #widget-delete': function(event) {
        if (window.confirm("You cannot undo this action, are you sure?")) {
            var target = $(event.target).parent().parent().parent();
            target.remove();
        }
    },
    'click #content': function(event) {
        var target = $(event.target);
        var node = target[0].nodeName.toLowerCase();

        selectedNode = node;

        $('.object-selected').removeClass('object-selected');

        if (node=="img"||node=="video"||node=="td"||node=="table") {
            $("#properties").accordion('option', 'active' , 1);

            selectedObject = target;

            var w = convertObjectDimensionToPercentage(target.width());
            var h = convertObjectDimensionToPercentage(target.height());

            $("#sliderWidth").slider('option', 'value', w);
            $("#sliderWidth #custom-handle").text(w);
            $("#sliderHeight").slider('option', 'value', h);
            $("#sliderHeight #custom-handle").text(h);

            target.addClass('object-selected');
        }
    },
    'submit': function (event) {
        event.preventDefault();
        var html = [];
        var last = $('ul.widgets li').length - 1;
        $('ul.widgets li').each(function(index, obj) {
            if (index<last)
                html.push($(this).find('#content').html());
        });
        html.reverse();
        html = html.join("||");

        // Send the data to the server
        HTTP.call('POST', 'http://localhost:3000/api/activities/update', {
            "data": {},
            "params": {
                "title": event.target.title.value,
                "path": Router.current().params.id,
                "activities": Router.current().params.aid,
                "html": html
            }
        }, function(error, response) {
        });
    },
    'click #delete': function() {
        if (window.confirm("You cannot undo this action, are you sure?")) {
            HTTP.get('http://localhost:3000/api/activities/delete/'+Router.current().params.id+'/'+Router.current().params.aid, {
            }, function(error, response) {
                if (error) {
                } else {
                    Router.go('/path/view/'+Router.current().params.id);
                }
            });
        }
    }
});



Template.PathActivities.helpers({
    'media': function() {
        return Media.find().fetch();
    },
    'activities': function() {
        var path = Paths.findOne(Router.current().params.id)
        if (path!=undefined) {
            for (var m=0; m<path.activities.length; m++) {
                if (path.activities[m]._id == Router.current().params.aid) {
                    return path.activities[m];
                }
            }      }
    },
    'title': function() {
        var path = Paths.findOne(Router.current().params.id)
        if (path!=undefined) {
            return path.title;
        }
    }
});

Template.PathActivities.onRendered(function () {
    $('#properties').accordion({
        heightStyle: "content",
        collapsible: true,
        icons: false,
        active: false
    });

    var handleHeight = $( "#sliderHeight #custom-handle" );
    $( "#sliderHeight" ).slider({
        create: function() {
            handleHeight.text( $( this ).slider( "value" ) );
        },
        slide: function( event, ui ) {
            handleHeight.text( ui.value );
            selectedObject.css({'width': convertPercentageToObjectDimension(ui.value)+'px'});
        }
    });

    var handleWidth = $( "#sliderWidth #custom-handle" );
    $( "#sliderWidth" ).slider({
        create: function() {
            handleWidth.text( $( this ).slider( "value" ) );
        },
        slide: function( event, ui ) {
            handleWidth.text( ui.value );
            selectedObject.css({'height': convertPercentageToObjectDimension(ui.value)+'px'});
        }
    });

    var handleBounce = $( "#sliderBounce #custom-handle" );
    $( "#sliderBounce" ).slider({
        create: function() {
            handleBounce.text( $( this ).slider( "value" ) );
        },
        slide: function( event, ui ) {
            handleBounce.text( ui.value );
            selectedContent.html('bounce|duration:'+ui.value);
        }
    });

    resetAndDisableProperties();

    this.autorun(function() {
        var path = Paths.findOne(Router.current().params.id) ;
        if (path) {
            setTimeout(function() {
                var ul = $('ul.widgets');
                ul.empty();
                ul.append(returnLastWidgetLi());
                for (var m=0; m<path.activities.length; m++) {
                    if (path.activities[m]._id == Router.current().params.aid) {
                        var content = path.activities[m].content;
                        var contentPieces = content.split("||");
                        for (var c=0; c<contentPieces.length; c++) {
                            var li = $('<li></li>');
                            var contentDiv = $('<div id="content" class="content">'+contentPieces[c]+'</div>');
                            var contentPiece = contentPieces[c].split('|');
                            switch (contentPiece[0]) {
                                case "choice":
                                    li.addClass('no-look');
                                    li.append(returnWidgetToolHtml("Choice"));
                                    break;
                                case "bounce":
                                    li.addClass('no-look');
                                    li.append(returnWidgetToolHtml("Bounce"));
                                    break;
                                default:
                                    contentDiv.attr('contenteditable', 'true');
                                    li.append(returnWidgetToolHtml("HTML5"));
                                    break;
                            }
                            li.append(contentDiv);
                            ul.prepend(li);
                        }
                    }
                }
            }, 500);
        }
    });
});

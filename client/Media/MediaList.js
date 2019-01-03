Template.MediaList.helpers({
    'rows': function() {
        var result = Media.find();
        if (result!=undefined) {
            return result.fetch();
        }
    },
    'size': function() {
        var result = Media.find();
        if (result!=undefined) {
            return result.fetch().length;
        }
    }
});

Template.MediaList.events({
    'click #delete': function(e) {
        if (window.confirm("You cannot undo this action, are you sure?")) {
            var request = new XMLHttpRequest();
            var formData = new FormData();
            var id = $(e.currentTarget).data('id');
            var file = Media.find({'_id': id}).fetch()[0].file;

            formData.append("file", file);

            request.open("POST", "http://joduplessis.com/massive/media.remove.php");
            request.send(formData);
            request.onload = function(event) {
                var response = JSON.parse(event.currentTarget.responseText);

                if (!response.success) {
                    // console.log("Whoops, there has been an error");
                } else {
                    // console.log("Deleted "+file);

                    Media.remove(id);
                }
            };
        }
    }
});

Template.MediaList.onRendered(function () {
    var progressDom = document.getElementById("upload-progress");
    var fileDom = document.getElementById("upload-file");
    var buttonDom = document.getElementById("upload-button");

    buttonDom.addEventListener("click", function () {

        // Reset the progress bar
        progressDom.style.width = "0%";

        // Set up the form
        var files = fileDom.files;
        var fileName = files[0].name;
        var fileId = Media.insert({ 'user': Session.get("uid"), 'createdAt': new Date() });
        var request = new XMLHttpRequest();
        var formData = new FormData();

        // Create our data to POST
        formData.append("file", files[0]);
        formData.append("name", fileName);

        // POST it - use 0.8 so it doesn't stretch all the way the button
        request.upload.onprogress = function(event) { progressDom.style.width = ((100 * (event.loaded / event.total))*0.8)+"%"; };
        request.open("POST", "http://joduplessis.com/massive/media.upload.php");
        request.send(formData);

        // Deal with the feedback
        request.onload = function(event) {
            var response = JSON.parse(event.currentTarget.responseText);

            if (!response.success) {
                // console.log("Whoops, there has been an error");

                Media.remove(fileId);
            } else {
                // console.log("Uploaded "+response.location);

                Media.update(fileId, {$set: { 'file': response.location }});

                setTimeout(function() {
                    progressDom.style.width = "0%";
                },1000);
            }
        };
    });
});

Template.Login.helpers({
});

Template.Login.events({
    'submit': function (event) {
        // Prevent default browser form submit
        event.preventDefault();

        var result = Users.find({'email': event.target.email.value, 'password': event.target.password.value}).fetch();

        if (result.length==0) {
            $('#validate').html('Sorry, user not found.');
            $('#validate').fadeIn();
        } else {
            Session.set("uid", result[0]._id);

            // Redirect
            Router.go('/activity');
        }
    }
});

Template.Login.onRendered(function () {
    $('#validate').hide();
});

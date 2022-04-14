var user = cookie.get('user');
var socket = io();
if (!user) {
  user = prompt('Choose a username:');
  if (!user) {
    alert('We cannot work with you like that!');
  } else {
    cookie.set('user', user);
  }
}

socket.on('count', function (data) {
  $('.user-count').html(data);
});

socket.on('message', function (data) {
  $('.chat').append('<p><strong>' + data.user + '</strong>: ' + data.message + '</p>');
});

$('form').submit(function (e) {
  e.preventDefault();

  var message = $(e.target).find('input').val();

  socket.emit('message', {
    user: cookie.get('user') || 'Anonymous',
    message: message
  });

  e.target.reset();
  $(e.target).find('input').focus();
});

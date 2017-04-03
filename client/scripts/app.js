var app = {
  init: function() {

  },
  send: function(message) {
    $.ajax({
      url: 'http://parse.sfs.hackreactor.com/chatterbox/classes/messages',
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        console.error('chatterbox: Failed to send message', data);
      }
      
    });
  },
  fetch: function() {
  	$.ajax({
  	  type: 'GET'
  	});

  },
  clearMessages: function() {
    $('#chats').empty();
  },

  renderMessage: function(message) {
    var userName = message.userName;
    var message = message.text;
    var room = message.room;
    var newMessage = $('<div>' + userName + '<div><div>' + message + '<div>');
    $('#chats').append(newMessage);
  },

  renderRoom: function() {

  }
};




var app = {

  server: 'http://parse.sfs.hackreactor.com/chatterbox/classes/messages',

  init: function() {
    app.fetch('lobby');
  },
  
  username: window.location.search.slice(10),

  send: function(message) {
    $.ajax({
      url: app.server,
      type: 'POST',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
        message.id = data.objectId;
        console.log(message.id)
        app.renderMessage(message);
      },
      error: function (data) {
        console.error('chatterbox: Failed to send message', data);
      }
      
    });
  },
  fetch: function(roomname) {
    app.clearMessages();
  	$.ajax({
      url: app.server,
  	  type: 'GET',
      data: {
        order:'-createdAt', 
        limit: '1000',
      },
      success: function (data) {
        for(var i = 0; i < data.results.length; i++){
          if(data.results[i].text && data.results[i].text.match('<.*>')){
            data.results.splice(i, 1);
          }
        }
        var rooms = {};
        data.results.forEach(function(message){
          if(message.roomname === roomname){
            app.renderMessage(message);
          }
          if(message.roomname) {
            if(!rooms[message.roomname]) {
              app.renderRoom(message.roomname);
              rooms[message.roomname] = true;
            }
          }
        })
      },
    })

  },
  clearMessages: function() {
    $('#chats').empty();
  },

  renderMessage: function(message) {
    var userName = message.username;
    if(!message.roomname) {
      var room = 'lobby';
    } else {
      room = message.room;
    }
    var message = message.text;
    //var room = message.room;
    var newMessage = $('<div>' + '@' + userName + ':' + '<div>' + message + '<div>');
    $('#chats').append(newMessage);
  },

  renderRoom: function(roomName) {
    $('#roomSelect').append("<option>" + roomName + "</option>");
  },

  handleSubmit: function(message) {
    var message = {
      username: app.username,
      text: message,
      roomname: 'lobby'
    };
    app.send(message);
    //alert('Your Message Has Been Submitted!');
          
  }
};

app.init();

$(document).on('submit', 'form', function(event){
  var messageContent = $("textarea").val();
  app.handleSubmit(messageContent);
  alert('Your Message Has Been Submitted!');
          
});












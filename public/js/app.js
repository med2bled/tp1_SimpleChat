

$(function (){

  const socket=io();
  var loggedUser='';
  $('#md').hide();

$('#mf').submit(function(){

      socket.emit('chat message to server',{sender:loggedUser, value: $('#m').val()});
      $('#m').val('');

      return false;
    });
    $('#lf').submit(function(){

           loggedUser=$('#l').val();

          $('#l').val('');
          console.log(loggedUser);
          $('#ld').hide();
          $('#md').show();
          return false;
        });
    socket.on('chat', function(msg){
      var html='<div class="comment">'+
                    '<div class="content">'+
                      '<a class="author">'+msg.sender+'</a>'+
                      '<div class="metadata">'+
                      '<span class="date">'+msg.date+'</span>'+
                  '</div>'+
                  '<div class="text">'+
                    msg.value+
                  '</div>'+
                  '</div>';

console.log(socket.id);





      $('#messages').append($(html));
    });
    socket.on('userscount',function(count){
      console.log(count);
      $('#userscount').text(count);
    })


});

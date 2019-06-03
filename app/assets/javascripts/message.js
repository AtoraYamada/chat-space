$(function(){
  function buildHTML(message){
  var messagePicture= message.picture.url ? `<img src='${message.picture.url}' class='image_tag'>` : '';
  var html = `<div class="chat-space__message" data-message-id="${message.id}">
                <div class="chat-space__message__upper">
                  <div class="chat-space__message__upper--user">
                    ${message.user_name}
                  </div>
                  <div class="chat-space__message__upper--time">
                    ${message.created_at}
                  </div>
                </div>
                <div class="chat-space__message__lower">
                  <div class="chat-space__message__lower--text">
                    ${message.body}
                  </div>
                  ${messagePicture}
                </div>
              </div>`;
  return html;
  }
  var reloadMessages = function() {
    var last_message_id = $('.chat-space__message:last').data('message-id');
    var current_group_id = $('.chat-top-group').data('group-id');
    $.ajax({
      url: `/groups/${current_group_id}/api/messages`,
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id, group_id: current_group_id}
    })
    .done(function(messages) {
      if (messages.length!=0){
        var insertHTML = '';
        messages.forEach(function(message){
          insertHTML += buildHTML(message);
        });
        $('.chat-space').append(insertHTML);
        $('.chat-space').animate({scrollTop: $('.chat-space')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('自動更新に失敗しました');
    })
  };
  var stopper=false;
  $('.chat-form').on('submit', function(e){
    e.preventDefault();
    stopper=true;
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $('.chat-form')[0].reset();
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false,
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-space').append(html);
      $('.chat-space').animate({scrollTop: $('.chat-space')[0].scrollHeight});
      return false;
    })
    .fail(function(){
      alert('メッセージを入力してください');
    })
    .always(function(){
      $('.chat-form__send-button').removeAttr("disabled");
      stopper=false;
    });
  });
  if (stopper==true){
    return;
  }
  else{
    if(location.href.match(/\/groups\/\d+\/messages/)){
      setInterval(reloadMessages, 5000);
    }
  }
});

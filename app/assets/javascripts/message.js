$(function(){
  function buildHTML(message){
  var messagePicture= message.picture.url ? `<img src='${message.picture.url}' class='image_tag'>` : '';
  var html = `<div class="chat-space__message">
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
    last_message_id = $('.chat-space__message:last').data('message-id')
    $.ajax({
      //ルーティングで設定した通りのURLを指定
      url: ※※※,
      //ルーティングで設定した通りhttpメソッドをgetに指定
      type: 'get',
      dataType: 'json',
      //dataオプションでリクエストに値を含める
      data: {id: last_message_id}
    })
    .done(function(messages) {
      console.log('success');
    })
    .fail(function() {
      console.log('error');
    });
  };
  $(document).on('turbolinks:load', function() { 
    $('.chat-form').on('submit', function(e){
      e.preventDefault();
      var formData = new FormData(this);
      var url = $(this).attr('action');
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
        $('.chat-form')[0].reset();
        $('.chat-space').animate({scrollTop: $('.chat-space')[0].scrollHeight});
        return false
      })
      .fail(function(){
        alert('メッセージを入力してください');
      })
      .always(function(){
        $('.chat-form__send-button').removeAttr("disabled");
      });
    });
  });
});

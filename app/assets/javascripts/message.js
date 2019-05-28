$(function(){
  function buildHTML(message){
  if (message.picture.url==null){
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
                  </div>
                </div>`;
  } else {
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
                    <img src='${message.picture.url}' class='image_tag'>
                  </div>
                </div>`;
  }

  return html;
  }
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
        $('.chat-form__input').val('');
        $('.chat-form__image-input').val('');
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
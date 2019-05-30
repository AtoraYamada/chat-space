$(function() {
  var serach_result = $('#user-search-result');
  function appendUserToResult(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`
  serach_result.append(html);
  }
  function appendUserToGroup(user_id, user_name){
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-${user_id}'>
                  <input name='group[user_ids][]' type='hidden' value='${user_id}'>
                  <p class='chat-group-user__name'>${user_name}
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`
  $('#chat-group-users').append(html);
  }
  function appendErrMsgToHTML(msg) {
  var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${msg}</p>
              </div>`
  serach_result.append(html);
  }
  $(document).on('turbolinks:load', function() {
    $("#user-search-field").on("keyup", function() {
      var input = $(this).val();
      var user_names = $('.chat-group-user').find('input').map(function(){
        return $(this).attr('value');
      });
      serach_result.empty();
      if (input.length !== 0){
        $.ajax({
          type: 'GET',
          url: '/users',
          data: { keyword: input },
          dataType: 'json'
        })
        .done(function(users) {
          serach_result.empty();
          if (users.length !== 0) {
            console.log(users)
            console.log(user_names)
            console.log(user_names.length)
            users.forEach(function(user){
              appendUserToResult(user);
            });
          }
          else {
            appendErrMsgToHTML("一致するユーザーが見つかりません");
          }
        })
        .fail(function() {
          alert('ユーザー検索に失敗しました');
        })
      }
    });
    $('#user-search-result').on('click', '.user-search-add', function(){
      var user_id = $(this).attr('data-user-id');
      var user_name = $(this).attr('data-user-name');
      $(this).parent().remove();
      console.log(user_id)
      console.log(user_name)
      appendUserToGroup(user_id, user_name);
    });
    $('#chat-group-users').on('click', '.user-search-remove', function(){
      $(this).parent().remove();
    });
  });
});

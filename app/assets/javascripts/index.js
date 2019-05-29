$(function() {
  $("#user-search-field").on("keyup", function() {
    var input = $(this).val();
    $.ajax({
      type: 'GET',
      url: '/users/index',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users) {
      console.log(users)
    })
    .fail(function() {
      alert('ユーザー検索に失敗しました');
    })
  });
});
$(function() {
  $("#user-search-field").on("keyup", function() {
    var input = $(this).val();
    console.log(input)
  });
});
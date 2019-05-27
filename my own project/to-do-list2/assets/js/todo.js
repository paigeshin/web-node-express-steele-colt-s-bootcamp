//li를 누르면 line-through - done
//X를 누르면 지워짐
//enter누르면 추가됨

$("ul").on("click", "li", function(event) {
  $(this).toggleClass("selected");
  event.stopPropagation();
});

$("ul").on("click", "span", function() {
  $(this)
    .parent()
    .fadeOut(300, function() {
      $(this).remove();
    });
});

$("input[type='text']").on("keypress", function(event) {
  var textToAdd = $("input[type='text']").val();
  if (event.keyCode === 13) {
    $("ul").append(
      "<li><span><i class='fas fa-trash'></i></span> " + textToAdd + "</li>"
    );
    $("input[type=text]").val("");
  }
});

$(".fa-plus").on("click", function() {
  $("input[type='text']").fadeToggle();
});

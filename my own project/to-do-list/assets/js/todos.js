$("ul").on("click", "li", function() {
  $(this).toggleClass("completed");
});

$("ul").on("click", "span", function() {
  $(this)
    .parent()
    .fadeOut(500, function() {
      $(this).remove();
    });
  event.stopPropagation();
});

$("input[type='text']").on("keypress", function(event) {
  if (event.which === 13) {
    var todoText = $(this).val();
    $(this).val("");
    $("ul").append("<li><i class='fa fa-trash'></i> " + todoText + "</li>");
  }
});

$("#btnPlus").on("click", function() {
  $("input[type='text']").fadeToggle();
});

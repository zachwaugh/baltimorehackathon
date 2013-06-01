$("img").css("cursor", "pointer");
$("img").click( function(obj, something){
  console.log(obj.currentTarget.getAttribute("src"));
  var src = obj.currentTarget.getAttribute("src");
  var dwit = src.replace(".jpg",".gif");
  obj.currentTarget.setAttribute("src", dwit);
});

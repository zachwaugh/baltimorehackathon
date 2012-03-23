var refresh = 50;
var wWidth, wHeight;
var cloud_files = [ 'cloud1.png', 'cloud2.png', 'cloud3.png', 'cloud4.png'];
var files = ['dirigible.png', 'airship-boat.png'];

$(function()
{
  iHeight = $(document).height() + 150;
  iWidth = window.innerWidth;
  for(var i=50; i > 0; i--)
    clouds();
  for(var i=5; i > 0; i--)
    dirigibles();
});

function create_floater(file, klass, x, y, delta)
{
  var ratio = Math.random();
  var spd = Math.ceil(ratio*delta);
  var image = $('<img/>', {
    src: 'images/' + file,
    style: 'width: ' + Math.floor(ratio*100) + '%;'
  }).appendTo($('<div/>', {
    'class': klass,
    style: 'position: absolute; z-index: 100; left: ' + x + 'px; top: ' + y + 'px; width: 60px; height: 60px;'
  }).appendTo('#container'));

  var elem = image.parent();
  var t = setInterval(function(){move_right(elem, spd)}, refresh);
  elem.attr('spd', spd);
  elem.attr('int', t);
  return elem;
}

function clouds()
{
  var idx = Math.floor(Math.random()*cloud_files.length);
  var height = 250;
  var y = iHeight - Math.floor(Math.random()*height);
  var x = Math.floor(Math.random()*iWidth);

  create_floater(cloud_files[idx], 'cloud', x, y, 3);
}

function dirigibles()
{
  var idx = Math.floor(Math.random()*files.length);
  var height = 250;
  var y = iHeight - Math.floor(Math.random()*height);
  var x = Math.floor(Math.random()*iWidth);

  var dirig = create_floater(files[idx], 'dirig', x, y, 5);
  var image = dirig.find('img').first();

  dirig.css('width', image.clientWidth);
  dirig.css('height', image.clientHeight);
  dirig.click(function() {
    var d = Number($(this).attr('spd'));
    var i = $(this).attr('int');
    clearInterval(i);
    loop($(this), d);
  });
}

function loop(elem, spd)
{
  elem.addClass('loop');
  setTimeout(function() {
    elem.removeClass('loop');
    var i = setInterval(function(){move_right(elem, Number(spd))}, refresh);
    elem.attr('int', i);
  }, 1000);
}

function move_right(elem, spd)
{
  if( elem.position().left < window.innerWidth + 250)
    elem.css('left', elem.position().left + spd + 'px');
  else
    elem.css('left', '-100px');
}

// $('#second-hackathon').eventbrite_attendees({
//   app_key: 'MWUwZjRlZjk4MDk3',
//   event_id: '943934333'
// });

$('#first-hackathon').eventbrite_attendees({
  app_key: 'MWUwZjRlZjk4MDk3',
  event_id: '943934333'
});

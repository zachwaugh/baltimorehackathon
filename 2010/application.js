$(function()
{
  $('#octopus').click(attack);
});


function attack(event)
{
	var octopus = $('#octopus');
	octopus.css({top: octopus.offset().top, left: octopus.offset().left});
	var diver = $('#diver');
	
	$.scrollTo(diver, {duration: 1000});
	$('#octopus').animate({left: diver.offset().left - 50, top: diver.offset().top + 300}, {duration: 1000, complete: function()
	{
		$('#octopus, #diver').animate({left: 100, top: 5000}, function()
		{
			$(this).remove();
		});
	}});
}

$('#first-hackathon').eventbrite_attendees({
  app_key: 'MWUwZjRlZjk4MDk3',
  event_id: '943934333'
});

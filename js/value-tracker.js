/* global TrelloPowerUp */

var t = TrelloPowerUp.iframe();

t.render(function(){
  return t.get('card', 'shared')
  .then(function(data){
    console.log(data);
    window.value_for_me.value = data['value_for_me'];
  })
  .then(function(){
    t.sizeTo('#value_form').done();
  });
});

window.value_form.addEventListener('submit', function(event){
  // Stop the browser trying to submit the form itself.
  event.preventDefault();
  return t.set('card', 'shared', 'value_for_me', window.value_for_me.value)
  .then(function(){
    t.closePopup();
  });
});
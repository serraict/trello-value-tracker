/* global TrelloPowerUp */

var t = TrelloPowerUp.iframe();

t.render(function(){
  return t.get('card', 'shared', 'value-for-me')
  .then(function(value_for_me){
    window.value_for_me.value = value_for_me;
  })
  .then(function(){
    t.sizeTo('#value_form').done();
  });
});

window.value_form.addEventListener('submit', function(event){
  // Stop the browser trying to submit the form itself.
  event.preventDefault();
  return t.set('card', 'shared', 'value-for-me', window.value_for_me.value)
  .then(function(){
    t.closePopup();
  });
});
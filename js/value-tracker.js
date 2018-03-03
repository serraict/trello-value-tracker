/* global TrelloPowerUp */

var t = TrelloPowerUp.iframe();

t.render(function(){
  return t.get('card', 'shared')
  .then(function(data){
    window.value_for_me.value = data.value_for_me;
    window.value_for_others.value = data.value_for_others;
  })
  .then(function(){
    t.sizeTo('#value_form').done();
  });
});

window.value_form.addEventListener('submit', function(event){
  // Stop the browser trying to submit the form itself.
  event.preventDefault();

  let _value = {
    value_for_me: window.value_for_me.value, 
    value_for_others: window.value_for_others.value
  }

  return t.set('card', 'shared', _value)
      .then(function(){
        t.closePopup();
      }, function(error){
        console.log(error);
      });
});
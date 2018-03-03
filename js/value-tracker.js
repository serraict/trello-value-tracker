/* global TrelloPowerUp */

var t = TrelloPowerUp.iframe();

t.render(function(){
  return t.get('card', 'shared')
  .then(function(data){
    console.log(data);
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
    for_me: window.value_for_me.value, 
    for_others: window.value_for_others.value
  }

  console.log(_value)
  return 
    t.set('card', 'shared', 'value_for_me', _value.for_me)
      .then(function(){
        t.closePopup();
      });
});
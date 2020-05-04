$(function(){
  function appendUser(user){
    console.log(user);
  }
  function appendErrMsgToHTML(msg){
    console.log(msg);
  }

  $('#user-search-field').on("keyup", function(e){
    e.preventDefault();
    var input = $("#user-search-field").val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { key: input },
      dataType: 'json'
    })
    .done(function(users){
      console.log('Success');
    })
    .fail(function(){
      alert('error');
    });
  });
});
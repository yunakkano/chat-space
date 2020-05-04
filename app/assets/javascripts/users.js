$(function(){
  var search_list = $("");
  
  function appendUser(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">ユーザー名</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`
    
    return html
  }

  function appendErrMsgToHTML(msg){
    var html = `
               <div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${msg}</p>
               </div>`
    return html
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
      if (users.length !== 0 ){
        users.forEach(function(user){
          appendUser(user);
        });
      }else{

      }
    })
    .fail(function(){
      alert('error');
    });
  });
});
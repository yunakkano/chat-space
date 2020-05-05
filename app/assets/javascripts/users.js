$(function(){
  var search_list = $("");
  
  function appendUserToSearchResult(userName, userId){
    let html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${userName}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${userId}" data-user-name="${userName}">追加</div>
                </div>`;
    var userlist = $('.chat-group-user__btn--del[data-user-id=' + userId + ']')
    if (userlist.length == 0 ){
     $("#user-search-result").append(html); 
    }
  }

  function appendErrMsgToHTML(msg){
    let html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${msg}</p>
                </div>`;
    $("#user-search-result").append(html); 
  }

  function addUserToMemberList(userName, userId){
    let html = `<div class="chat-group-user clearfix">
                  <input name="group[user_ids][]" type="hidden" value="${userId}">
                  <p class="chat-group-user__name">${userName}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--del" data-user-id="${userId}" data-user-name="${userName}">削除</div>
                </div>`;
    $('#chat-group-users.js-add-user').append(html);
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
      $("#user-search-result").empty();
      if (users.length !== 0 ){
        users.forEach(function(user){
          appendUserToSearchResult(user.name, user.id);
        });
      } else if(input.length == 0){
        return false;
      } else {
        appendErrMsgToHTML('ユーザーが見つかりません');
      }
    })
    .fail(function(){
      alert('error');
    });
  });

  $(document).on('click', '.chat-group-user__btn--add' , function(){
    const userName = $(this).attr("data-user-name");
    const userId = $(this).attr("data-user-id");
    $(this).parent().remove();
    addUserToMemberList(userName, userId);
  });

  $(document).on('click', '.chat-group-user__btn--del' , function(){
    const userName = $(this).attr("data-user-name");
    const userId = $(this).attr("data-user-id");
    $(this).parent().remove();
    appendUserToSearchResult(userName, userId);
  });

});
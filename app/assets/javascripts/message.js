$(function(){
  function buildHTML(msg){
    if (msg.text && msg.image){
      var html = `<div class="chat-main__message-list__message">
                    <div class="chat-main__message-list__message__upper-box">
                      <p class="chat-main__message-list__message__upper-box__talker">
                      ${msg.user_name}
                      </p>
                      <p class="chat-main__message-list__message__upper-box__datetime">
                      ${msg.created_at}
                      </p>
                      </div>
                      <div class="chat-main__message-list__message__text">
                      ${msg.text}
                      <img class="chat-main__message-list__message__image" src="${msg.image}">
                    </div>
                  </div>`
    } else if(msg.text) {
      var html = `<div class="chat-main__message-list__message">
                    <div class="chat-main__message-list__message__upper-box">
                      <p class="chat-main__message-list__message__upper-box__talker">
                      ${msg.user_name}
                      </p>
                      <p class="chat-main__message-list__message__upper-box__datetime">
                      ${msg.created_at}
                      </p>
                    </div>
                    <div class="chat-main__message-list__message__text">
                    ${msg.text}
                    </div>
                  </div>`
    } else{
      var html = `<div class="chat-main__message-list__message">
                    <div class="chat-main__message-list__message__upper-box">
                      <p class="chat-main__message-list__message__upper-box__talker">
                      ${msg.user_name}
                      </p>
                      <p class="chat-main__message-list__message__upper-box__datetime">
                      ${msg.created_at}
                      </p>
                    </div>
                    <div class="chat-main__message-list__message__text">
                      <img class="chat-main__message-list__message__image" src="${json.image}">
                    </div>
                  </div>`
    }
  }

  $('.chat-main__message-form__form').on('submit',function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.chat-main__message-list').append(html);
      $('.chat-main__message-form__form__input-box__text').val('');
      $('.chat-main__message-form__form__submit').prop('disabled', false);
    })
    .fail(function(){
      alert('error');
    })
  })
});
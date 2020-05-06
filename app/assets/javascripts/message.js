$(function(){
  function buildHTML(msg){
    var html_upper_part = `<div class="chat-main__message-list__message" data-message-id=${msg.id}>
                            <div class="chat-main__message-list__message__upper-box">
                              <p class="chat-main__message-list__message__upper-box__talker">
                              ${msg.user_name}
                              </p>
                              <p class="chat-main__message-list__message__upper-box__datetime">
                              ${msg.created_at}
                              </p>
                            </div>`
    var html_text_part = `<div class="chat-main__message-list__message__text">
                            ${msg.text}`
    if ( msg.image ){
      var html = `${html_upper_part}
                    ${html_text_part}
                      <img class="chat-main__message-list__message__image" src="${msg.image}">
                    </div>
                  </div>`
    } else if(msg.text) {
      var html = `${html_upper_part}
                    ${html_text_part}
                    </div>
                  </div>`
    }
    return html
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
      $('form')[0].reset();
      $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      $('.chat-main__message-form__form__submit').prop('disabled', false);
    })
    .fail(function(){
      $('.chat-main__message-form__form__submit').prop('disabled', false);
      alert('Error occured when sending the message');
    });
  })

  var reloadMessages = function() {
    var last_message_id = $('.chat-main__message-list__message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'GET',
      data: {id: last_message_id},
      dataType: 'json'
    })
    .done(function(messages){
      var insertHTML = '';
      $.each(messages, function(i, message){
        insertHTML += buildHTML(message);
      });
      $('.chat-main__message-list').append(insertHTML);
      if (messages.length > 0){
        $('.chat-main__message-list').animate({ scrollTop: $('.chat-main__message-list')[0].scrollHeight});
      }
    })
    .fail(function(){
      console.log('error');
    });

  };
  setInterval(reloadMessages, 3000);
});
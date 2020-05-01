json.text       @message.text
json.image      @message.image
json.create_at  @message.created_at.strftime("%Y年%m月%d日 %H時%M分")
json.user_name  @message.user.name
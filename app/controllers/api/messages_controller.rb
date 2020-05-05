class Api::MessagesController < ApplicationController
  def index
    group = Group.find(params[:group_id])
    last_msg_id = params[:id].to_i
    @messages = group.messages.includes(:user).where("id > ?", last_msg_id)
  end
end
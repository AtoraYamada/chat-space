class Api::MessagesController < ApplicationController
  def index
    @new_messages=Message.where('id > ? AND group_id = ?', params[:id], params[:group_id])
  end
end

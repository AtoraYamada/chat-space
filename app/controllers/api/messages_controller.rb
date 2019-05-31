class Api::MessagesController < ApplicationController
  def index
    if params[:id].nil?
      @new_messages=Message.where('group_id = ?', params[:group_id])
    else
      @new_messages=Message.where('id > ? AND group_id = ?', params[:id], params[:group_id])
    end
  end
end

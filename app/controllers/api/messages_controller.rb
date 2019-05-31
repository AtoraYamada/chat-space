class Api::MessagesController < ApplicationController
  def index
    @new_messages=Message.where('id > ?', params[:id])
  end
end
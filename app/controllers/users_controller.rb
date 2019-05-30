class UsersController < ApplicationController
  def index
    @users = User.where('name LIKE(?)', "%#{params[:keyword]}%").where('id != ?', current_user.id).limit(75)
    respond_to do |format|
      format.html
      format.json
    end
  end

  def edit
  end

  def update
    user = User.find(params[:id])
    if current_user.update(user_params)
      redirect_to root_path
    else
      render :edit
    end
  end

  private
  def user_params
    params.require(:user).permit(:name, :email)
  end

end

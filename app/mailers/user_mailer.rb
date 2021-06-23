class UserMailer < ApplicationMailer
  default from: 'notifications@example.com'

  def send_mail(user)
    @user = user
    @url = 'https://www.google.com/?hl=ja'
    mail(to: @user.email, subject: '私の素敵なサイトへようこそ')
  end
end

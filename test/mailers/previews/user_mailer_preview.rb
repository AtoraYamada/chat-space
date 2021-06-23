class UserMailerPreview < ActionMailer::Preview
  def send_mail
    user=User.new(name: 'aaa', email:'aaa@gmail.com')
    UserMailer.send_mail(user)
  end
end
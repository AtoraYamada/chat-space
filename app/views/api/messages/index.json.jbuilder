if @new_messages.present?
  json.array! @new_messages do |message|
    json.body message.body
    json.picture message.picture
    json.created_at message.created_at
    json.user_name message.user.name
    json.id message.id
  end
end
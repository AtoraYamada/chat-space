json.array! @new_messages do |message|
  json.body message.body
  json.picture message.picture
  json.created_at message.created_at.strftime('%Y/%m/%d(%a) %H:%M:%S')
  json.user_name message.user.name
  json.id message.id
end

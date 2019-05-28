FactoryBot.define do

  factory :message do
    body     {Faker::Lorem.sentence}
    picture  {File.open("#{Rails.root}/public/IMG_7370.JPG")}
    user
    group
  end

end

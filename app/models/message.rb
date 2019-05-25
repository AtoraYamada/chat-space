class Message < ApplicationRecord
  belongs_to :user
  belongs_to :group
  
  validates :body, presence: true, unless: :picture?
  mount_uploader :picture, ImageUploader
end

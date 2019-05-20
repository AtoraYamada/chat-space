# DB設計

## users table

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, index: true|
|email|string|null: false|

### Association
- has_many :messages
- has_many :users_groups
- has_many :groups, through: :users_groups
***
## groups table

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many :messages
- has_many :users_groups
- has_many :users, through: :users_groups
***
## users_groups table

|Column|Type|Options|
|------|----|-------|
|user_id|references|foreign_key: true|
|group_id|references|foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group
***
## messages table

|Column|Type|Options|
|------|----|-------|
|body|text|-|
|image|string|-|
|user_id|references|foreign_key: true|
|group_id|references|foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group
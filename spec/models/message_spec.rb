require 'rails_helper'

describe Message do
  describe '#create' do
    context 'can save' do
      it 'is valid with a body without a picture' do
        expect(build(:message, picture: nil)).to be_valid
      end

      it 'is valid with a picture without a body' do
        expect(build(:message, body: nil)).to be_valid
      end

      it 'is valid with a body, picture' do
        expect(build(:message)).to be_valid
      end
    end

    context 'can not save' do
      it 'is invalid without a body and picture' do
        message=build(:message, body: nil, picture: nil)
        message.valid?
        expect(message.errors[:body]).to include('を入力してください')
      end
      
      it 'is invalid without a group_id' do
        message=build(:message, group_id: nil)
        message.valid?
        expect(message.errors[:group]).to include('を入力してください')
      end

      it 'is invalid without a user_id' do
        message=build(:message, user_id: nil)
        message.valid?
        expect(message.errors[:user]).to include('を入力してください')
      end
    end
  end
end

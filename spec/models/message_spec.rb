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
    end
  end
end
require 'rails_helper'
describe Message do
  describe '#create' do
    context "メッセージを保存できる場合" do
      it "textが空でなければメッセージを保存できること" do
        msg = build(:message, image: nil)
        expect(msg).to be_valid
      end
      it "imageが空でなければメッセージを保存できること" do
        msg = build(:message, text: "")
        expect(msg).to be_valid
      end
      it "text, imageが空でなければメッセージを保存できること" do
        msg = build(:message)
        expect(msg).to be_valid
      end
    end
    context "メッセージを保存できない場合" do
      it "text, imageいずれも空の場合はメッセージを保存できないこと" do
        msg = build(:message, text: "", image: nil)
        msg.valid?
        expect(msg.errors[:text]).to include("を入力してください")
      end
      it "group_idがない場合はメッセージを保存できないこと" do
        msg = build(:message, group_id: nil)
        msg.valid?
        expect(msg.errors[:group]).to include("を入力してください")
      end
      it "user_idがない場合はメッセージを保存できないこと" do
        msg = build(:message, user_id: nil)
        msg.valid?
        expect(msg.errors[:user]).to include("を入力してください")
      end
    end
  end
end
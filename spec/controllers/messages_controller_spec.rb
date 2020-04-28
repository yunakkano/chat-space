require 'rails_helper'

describe MessagesController, type: :controller do
  let(:user) { create(:user) }
  let(:group) { create(:group) }
  # user / groupをcreateし、let内に格納

  describe 'GET #index' do
    context "ログインしている場合" do
      before do
        login_user user
        # controller_macros.rb内のlogin_userメソッドを呼び出し
        get :index, params: { group_id: group.id }
      end
      it "@messageに期待した値がはいっている" do
        expect(assigns(:message)).to be_a_new(Message)
      end

      it "@groupに期待した値がはいっている" do
        expect(assigns(:group)).to eq group
      end

      it "index.html.hamlに遷移する" do
        expect(response).to render_template :index
      end
    end

    context "ログインしていない場合" do
      before do
        get :index, params: { group_id: group.id }
      end
      it "意図したビューにリダイレクトできているか" do
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end

  describe 'POST #create' do
    let(:params){{ group_id: group.id, user_id: user.id, message: attributes_for(:message)}}
    context "ログインしている場合" do
      before do
        login_user user
      end
      context "保存に成功した場合" do
        subject {
          post :create,
          params: params
        }
        it "messageを保存すること" do
          expect{ subject }.to change(Message, :count).by(1)
        end
        it 'group_messages_pathへリダイレクト' do
          subject
          expect(response).to redirect_to(group_messages_path(group))
        end
      end
      context "保存に失敗した場合" do
        let(:invalid_params) {{ group_id: group.id, user_id: user.id, message: attributes_for(:message, text: nil, image: nil)}}
        subject {
          post :create,
          params: invalid_params
        }
        it "messageを保存しないこと" do
          expect{ subject }.not_to change(Message, :count)
        end
        it "index.html.hamlに遷移" do
          subject #subject は遅延評価されるため、ここで評価してやらないとparamsが存在しない状態になってします
          expect(response).to render_template :index
        end
      end

    end
    context "ログインしていない場合" do
      it "new_user_session_pathにリダイレクト" do
        post :create, params: params
        expect(response).to redirect_to(new_user_session_path)
      end
    end
  end
end
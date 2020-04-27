FactoryBot.define do
  factory :message do
    text {Faker::Lorem.sentence}
    image {File.open("#{Rails.root}/public/images/test_image.jpg")}
    user
    group
    # messages_controller_spec.rb のreate_listメソッドで生成しているtweetのレコードのcreated_atの値は
    # 全て同じになってしまっています。これをランダムな値にするために先ほどのFakerを利用
    created_at { Faker::Time.between(from: DateTime.now - 2, to: DateTime.now) }
  end
end
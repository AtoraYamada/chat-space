class RenameContentColumnToArticles < ActiveRecord::Migration[5.0]
  def change
    rename_column :messages, :image, :picture
  end
end

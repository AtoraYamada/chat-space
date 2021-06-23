require_relative 'boot'

require 'rails/all'

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module ChatSpace
  class Application < Rails::Application
    config.generators do |g|
      g.stylesheets false
      g.javascripts false
      g.helper false
      g.test_framework false
      config.i18n.default_locale = :ja
      config.time_zone = 'Tokyo'
    end

    config.action_mailer.preview_path = "#{Rails.root}/test/mailers/previews"
  end
end

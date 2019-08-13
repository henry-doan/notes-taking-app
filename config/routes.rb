Rails.application.routes.draw do
  post 'authenticate', to: 'authentication#authenticate'
  namespace :api do
    resources :notes
  end
end

from django.urls import path
from .views import register_view, login_view, logout_view, get_csrf, SessionView, WhoAmIView

urlpatterns = [
    path('register/', register_view, name='register'),
    path('login/', login_view, name='login'),
    path('logout/', logout_view, name='logout'),
    path('session/', SessionView.as_view(), name='session'),
    path('whoami/', WhoAmIView.as_view(), name='whoami'),
    path('csrf/', get_csrf, name='csrf'),
]
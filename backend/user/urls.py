from django.urls import path
from .views import UserRegistrationView, UserLoginView, UserLogoutView, GetCSRF, SessionView, WhoAmIView

urlpatterns = [
    path('register/', UserRegistrationView.as_view(), name='register'),
    path('login/', UserLoginView.as_view(), name='login'),
    path('logout/', UserLogoutView.as_view(), name='logout'),
    path('session/', SessionView.as_view(), name='session'),
    path('whoami/', WhoAmIView.as_view(), name='whoami'),
    path('csrf/', GetCSRF.as_view(), name='csrf'),
]
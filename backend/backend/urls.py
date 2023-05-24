from django.urls import include, path
from rest_framework.routers import DefaultRouter
from products.views import ProductViewSet

from user.views import UserRegistrationView
from user.views import UserLoginView

urlpatterns = [
    path('products/', include('products.urls')),
    path('user/', include('user.urls')),
]
from django.urls import include, path
from rest_framework.routers import DefaultRouter
from .views import ProductSearchView, ProductSelectView

urlpatterns = [
    path('search/', ProductSearchView.as_view(), name='search'),
    path('select/', ProductSelectView.as_view(), name='select'),
]
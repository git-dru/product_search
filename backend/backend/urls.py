from django.urls import include, path

urlpatterns = [
    path('products/', include('products.urls')),
    path('user/', include('user.urls')),
]
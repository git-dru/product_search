from django.db.models import Q
from .models import Product, SelectedProduct
from .serializers import ProductSerializer
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication

from rest_framework.decorators import action, permission_classes

@permission_classes([IsAuthenticated])
class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
     # Add an action to mark a product as selected
    
    def get_queryset(self):
        queryset = super().get_queryset()
        search_term = self.request.query_params.get('search', None)
        sort_by = self.request.query_params.get('sort', None)
        self.request.session['search_term'] = search_term
        self.request.session['sort_by'] = sort_by

        if search_term is not None:
            queryset = queryset.filter(Q(name__icontains=search_term) | Q(description__icontains=search_term))
        if sort_by is not None:
            queryset = queryset.order_by(sort_by)
            
        return queryset


    @action(detail=True, methods=['get'])
    def select(self, request, pk=None):
        product = self.get_object()
        SelectedProduct.objects.create(user=request.user, product=product)
        return Response({'status': 'Product selected'}, status=status.HTTP_200_OK)
    
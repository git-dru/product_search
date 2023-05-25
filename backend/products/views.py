from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Q
from .models import Product, SelectedProduct
from .serializers import ProductSerializer
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

class ProductSearchView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        search_term = request.query_params.get('search', None)
        sort_by= request.query_params.get('sort', None)
        request.session['search_term'] = search_term 
        request.session['sort_by'] = sort_by 

        queryset = Product.objects.all()
        if search_term:
            queryset = queryset.filter(Q(name__icontains=search_term) | Q(description__icontains=search_term))
        if sort_by:
            queryset = queryset.order_by(sort_by)

        serializer = ProductSerializer(queryset, many=True)
        return Response(serializer.data)

class ProductSelectView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        product_id = request.query_params.get('productId', None)
        selected = self.request.session.get('selected', [])  
        if product_id in selected:
            selected.remove(product_id)
        else: 
            selected.append(product_id)
        self.request.session['selected'] = selected  
        self.request.session.modified = True
        return Response({'selected': product_id})
    
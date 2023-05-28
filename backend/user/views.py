from django.contrib.auth import authenticate, login, logout
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserProfileSerializer
from rest_framework import status
from django.middleware.csrf import get_token
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse
from django.views.decorators.http import require_POST
import json

class UserRegistrationView(APIView):
    def post(self, request, format=None):
        serializer = UserProfileSerializer(data=request.data)
        print(request.data)
        if serializer.is_valid():
            user = serializer.save()
            # We need to call set_password to handle password hashing
            user.set_password(serializer.validated_data['password'])
            user.save()
            return Response(UserProfileSerializer(user).data)
        else:
            return Response(serializer.errors, status=400)

@require_POST
def login_view(request):
    data = json.loads(request.body)
    username = data.get('username')
    password = data.get('password')

    if username is None or password is None:
        return JsonResponse({'detail': 'Please provide username and password.'}, status=400)

    user = authenticate(username=username, password=password)

    if user is None:
        return JsonResponse({'detail': 'Invalid credentials.'}, status=400)

    login(request, user)
    return JsonResponse({'detail': 'Successfully logged in.', 'email': user.email})

def logout_view(request):
    if not request.user.is_authenticated:
       
        return JsonResponse({'detail': 'You\'re not logged in.'}, status=400)

    delete_session(request)
    logout(request)
    return JsonResponse({'detail': 'Successfully logged out.'})

class SessionView(APIView):
    permission_classes = [IsAuthenticated]

    @staticmethod
    def get(request, format=None):
        search_term = request.session.get('search_term', '')
        sort_by = request.session.get('sort_by', 'id')
        selected = request.session.get('selected', [])
        return Response({'isAuthenticated': True, "search_term": search_term, 'sort_by' : sort_by, 'selected': selected})

def get_csrf(request):
    response = JsonResponse({'detail': 'CSRF cookie set'})
    response['X-CSRFToken'] = get_token(request)
    return response

    
class WhoAmIView(APIView):
    authentication_classes = [SessionAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]

    @staticmethod
    def get(request, format=None):
        print(request.user)
        return Response({'email': request.user.email})
def delete_session(request):
    request.session.clear()

    

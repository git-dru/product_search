from django.contrib.auth import authenticate, login
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import UserProfileSerializer
from rest_framework import status

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

class UserLoginView(APIView):
    def post(self, request, format=None):
        data = request.data
        username = data.get('username', None)
        password = data.get('password', None)
        print(username, password)
        if username is None or password is None:
            return Response({'error': 'Please provide both username and password'}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(username=username, password=password)

        if user is not None:
            login(request, user)
            return Response(UserProfileSerializer(user).data, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
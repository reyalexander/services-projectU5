from django.contrib.auth import authenticate
from rest_framework import generics, status,viewsets
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView
from .tokens import create_jwt_pair_for_user
from .serializers import SignUpSerializer, GetUserSerializer

from .models import User

# Create your views here.


class SignUpView(generics.GenericAPIView):
    serializer_class = SignUpSerializer

    def post(self, request: Request):
        data = request.data
        serializer = self.serializer_class(data=data)
        print(data)
        if serializer.is_valid():
            serializer.save()

            response = {"message": "El usuario se creó correctamente", "data": serializer.data}

            return Response(data=response, status=status.HTTP_201_CREATED)

        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginView(APIView):

    def post(self, request: Request):
        email = request.data.get("email")
        password = request.data.get("password")

        user = authenticate(email=email, password=password)
        if user is not None:
            tokens = create_jwt_pair_for_user(user)

            response = {"message": "Logueado correctamente", "email": email ,"tokens": tokens, "ok": True}
            return Response(data=response, status=status.HTTP_200_OK)

        else:
            response = {"message": "Correo inválido o contraseña incorrecta", "ok": False}
            return Response(data=response, status=status.HTTP_401_UNAUTHORIZED)

    def get(self, request: Request):
        content = {"user": str(request.user), "auth": str(request.auth)}

        return Response(data=content, status=status.HTTP_200_OK)


class GetUsers(viewsets.ReadOnlyModelViewSet):
    serializer_class = GetUserSerializer
    queryset = User.objects.all()
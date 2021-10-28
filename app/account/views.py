from rest_framework import generics
from rest_framework.response import Response
from rest_framework import viewsets
from .models import Account, FollowAccount
from .serializers import AccountSerializer, FollowAccountSerializer


class AccountViewset(viewsets.ModelViewSet):
    """
        Hola desde acount 
    """
    
    serializer_class = AccountSerializer
    queryset = Account.objects.all()
    
class FollowAccountViewset(viewsets.ModelViewSet):
    serializer_class = FollowAccountSerializer
    queryset = FollowAccount.objects.all()

# class AccountListCreated(generics.ListCreateAPIView):
#     serializer_class = AccountSerializer
#     queryset = Account.objects.all()
    
#     def post(self, request):
#          serializer = self.serializer_class(data = request.data)
#         #  print(serializer.first_name)
#          if serializer.is_valid():
#              serializer.save()
#              return Response({'message': 'Cuenta creada correctamente'})
#          return Response(serializer.errors)
     

# class AccountRetreiveUpdDest(generics.RetrieveUpdateDestroyAPIView):
#     serializer_class = AccountSerializer
#     queryset = Account.objects.all()
    
    
#     # def put (self, request, pk=None):
#     #     print("Capurado")
    
#     # def post(self, request):
#     #      serializer = self.serializer_class(data = request.data)
#     #     #  print(serializer.first_name)
#     #      if serializer.is_valid():
#     #          serializer.save()
#     #          return Response({'message': 'Cuenta creada correctamente'})
#     #      return Response(serializer.errors)
            

# class FollowAccountList(generics.ListCreateAPIView):
#     serializer_class = FollowAccountSerializer
    
#     def get_queryset(self):
#         return FollowAccount.objects.all()
    
    
# class FollowAccountRetreiveUpdDest(generics.RetrieveUpdateDestroyAPIView):
#     serializer_class = FollowAccountSerializer
#     queryset = FollowAccount.objects.all()
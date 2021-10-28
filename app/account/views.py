from rest_framework import viewsets
from .models import Account, FollowAccount

from rest_framework.filters import (
    SearchFilter,
    OrderingFilter,
)
from django_filters.rest_framework import (
    DjangoFilterBackend,
)
from .serializers import AccountSerializer, FollowAccountSerializer




class AccountViewset(viewsets.ModelViewSet):

    serializer_class = AccountSerializer
    queryset = Account.objects.all()
    filter_backends = [
        DjangoFilterBackend,
        SearchFilter,
        OrderingFilter,
    ]
    filter_class = ('__all__')
    filterset_fields = ('__all__')
    search_fields = ('__all__')
    ordering_fields = ('__all__')
    
class FollowAccountViewset(viewsets.ModelViewSet):
    serializer_class = FollowAccountSerializer
    queryset = FollowAccount.objects.all()
    
    filter_backends = [
        DjangoFilterBackend,
        SearchFilter,
        OrderingFilter,
    ]
    filter_class = ('__all__')
    filterset_fields = ('__all__')
    search_fields = ('__all__')
    ordering_fields = ('__all__')

from rest_framework import serializers
from .models import Account, FollowAccount


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Account
        fields = '__all__'
        
    
class FollowAccountSerializer(serializers.ModelSerializer):
    account_emis = AccountSerializer()
    accpunt_follow = AccountSerializer()
    
    class Meta:
        model  = FollowAccount
        fields = '__all__'
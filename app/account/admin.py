from django.contrib import admin
from .models import Account, FollowAccount

# Register your models here.
admin.site.register(Account)
admin.site.register(FollowAccount)

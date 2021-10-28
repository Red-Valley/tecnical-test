from django.urls import path
from .views import AccountListCreated, AccountRetreiveUpdDest, FollowAccountList


urlpatterns = [
    path('account/',
         AccountListCreated.as_view(),
         name = 'account_list'
    ),
    path('account/<pk>',
         AccountRetreiveUpdDest.as_view(),
         name = 'account_upd'
    ),
    path('followaccount/',
         FollowAccountList.as_view(),
         name = 'followaccount_list'
    ),
    # path('account/<int:pk>',
    #      account_detail_view,
    #      name = 'account_detail'
    # )
]

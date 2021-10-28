from rest_framework.routers import DefaultRouter
from .views import AccountViewset, FollowAccountViewset

router = DefaultRouter()

router.register(r'accounts',AccountViewset, basename='accounts')
router.register(r'follow', FollowAccountViewset, basename='follow')

urlpatterns = router.urls

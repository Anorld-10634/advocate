from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'profile', AttorneyProfileViewSet)
router.register(r'services', ServiceViewSet)
router.register(r'cases', CaseViewSet)
router.register(r'blog', BlogPostViewSet)
router.register(r'testimonials', TestimonialViewSet)
router.register(r'appointments', AppointmentViewSet)
router.register(r'chat', ChatMessageViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
from rest_framework import viewsets, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.contrib.auth.models import User
from .models import AttorneyProfile, Service, Case, BlogPost, Testimonial, Appointment, ChatMessage
from .serializers import (
    UserSerializer,
    AttorneyProfileSerializer,
    ServiceSerializer,
    CaseSerializer,
    BlogPostSerializer,
    TestimonialSerializer,
    AppointmentSerializer,
    ChatMessageSerializer
)

# Public ViewSets
class AttorneyProfileViewSet(viewsets.ModelViewSet):
    queryset = AttorneyProfile.objects.all()
    serializer_class = AttorneyProfileSerializer
    permission_classes = [permissions.AllowAny]

class ServiceViewSet(viewsets.ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = [permissions.AllowAny]

class BlogPostViewSet(viewsets.ModelViewSet):
    queryset = BlogPost.objects.all().order_by('-created_at')
    serializer_class = BlogPostSerializer
    permission_classes = [permissions.AllowAny]

class TestimonialViewSet(viewsets.ModelViewSet):
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer
    permission_classes = [permissions.AllowAny]

class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    permission_classes = [permissions.AllowAny]

# Protected ViewSets (with queryset attribute)
class CaseViewSet(viewsets.ModelViewSet):
    queryset = Case.objects.all()  # ← Added this line
    serializer_class = CaseSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Case.objects.all()
        return Case.objects.filter(client=user)

class ChatMessageViewSet(viewsets.ModelViewSet):
    queryset = ChatMessage.objects.all()  # ← Added this line
    serializer_class = ChatMessageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return ChatMessage.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)
        
        # Simple AI Bot Logic
        user_msg = self.request.data.get('message', '').lower()
        bot_response = "Thank you for your message. An attorney will review it shortly."
        
        if "consultation" in user_msg:
            bot_response = "You can book a consultation via the 'Book Appointment' page."
        elif "cost" in user_msg or "fee" in user_msg:
            bot_response = "Our fees vary by case complexity. Please book a consultation for a quote."
            
        ChatMessage.objects.create(
            user=self.request.user, 
            message=bot_response, 
            is_bot_response=True
        )
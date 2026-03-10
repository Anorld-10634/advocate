from django.db import models
from django.contrib.auth.models import User

class AttorneyProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField()
    experience_years = models.IntegerField(default=0)
    cases_won = models.IntegerField(default=0)
    university = models.CharField(max_length=200)
    location = models.CharField(max_length=200)
    address = models.TextField()
    phone = models.CharField(max_length=20)
    # Image Upload
    photo = models.ImageField(upload_to='attorneys/', blank=True, null=True)

    def __str__(self):
        return f"{self.user.first_name} {self.user.last_name}"

class Service(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    process_steps = models.TextField(help_text="Separate steps with |")
    faq = models.TextField(help_text="Q: Question | A: Answer")
    
    def __str__(self):
        return self.title

class Case(models.Model):
    STATUS_CHOICES = [
        ('OPEN', 'Open'),
        ('IN_PROGRESS', 'In Progress'),
        ('CLOSED', 'Closed'),
    ]
    client = models.ForeignKey(User, on_delete=models.CASCADE, related_name='cases')
    title = models.CharField(max_length=200)
    description = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='OPEN')
    updates = models.TextField(blank=True, null=True) # Latest update
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.title} - {self.client.username}"

class BlogPost(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    category = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class Testimonial(models.Model):
    client_name = models.CharField(max_length=100)
    content = models.TextField()
    rating = models.IntegerField(default=5)

    def __str__(self):
        return self.client_name

class Appointment(models.Model):
    client_name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    date = models.DateField()
    time = models.TimeField()
    case_type = models.CharField(max_length=100)
    message = models.TextField()
    is_confirmed = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.client_name} - {self.date}"

class ChatMessage(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    message = models.TextField()
    is_bot_response = models.BooleanField(default=False)
    timestamp = models.DateTimeField(auto_now_add=True)
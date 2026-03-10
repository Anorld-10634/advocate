from django.contrib import admin
from .models import AttorneyProfile, Service, Case, BlogPost, Testimonial, Appointment, ChatMessage

@admin.register(AttorneyProfile)
class AttorneyProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'experience_years', 'location')

@admin.register(Case)
class CaseAdmin(admin.ModelAdmin):
    list_display = ('title', 'client', 'status', 'created_at')
    list_filter = ('status',)

@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ('client_name', 'date', 'time', 'is_confirmed')
    list_editable = ('is_confirmed',)

admin.site.register(Service)
admin.site.register(BlogPost)
admin.site.register(Testimonial)
admin.site.register(ChatMessage)
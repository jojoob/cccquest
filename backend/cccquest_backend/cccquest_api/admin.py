from django.contrib import admin

from .models import Question, Choice, Iteration, Answer

admin.site.register(Question)
admin.site.register(Choice)
admin.site.register(Iteration)
admin.site.register(Answer)

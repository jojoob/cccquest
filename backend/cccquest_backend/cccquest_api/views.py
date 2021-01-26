from django.shortcuts import render
from rest_framework import viewsets
from .serializers import QuestionSerializer, ChoiceSerializer, IterationSerializer, AnswerSerializer
from .models import Question, Choice, Iteration, Answer

class QuestionView(viewsets.ModelViewSet):
	serializer_class = QuestionSerializer
	queryset = Question.objects.all()

class ChoiceView(viewsets.ModelViewSet):
	serializer_class = ChoiceSerializer
	queryset = Choice.objects.all()

class IterationView(viewsets.ModelViewSet):
	serializer_class = IterationSerializer
	queryset = Iteration.objects.all()

class AnswerView(viewsets.ModelViewSet):
	serializer_class = AnswerSerializer
	queryset = Answer.objects.all()

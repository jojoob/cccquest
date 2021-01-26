from rest_framework import serializers
from .models import Answer, Choice, Iteration, Question

class ChoiceSerializer(serializers.ModelSerializer):
	class Meta:
		model = Choice
		fields = ('id', 'question', 'choice_text')

class QuestionSerializer(serializers.ModelSerializer):
	choices = ChoiceSerializer(many=True, read_only=True, required=False)

	class Meta:
		model = Question
		fields = ('id', 'question_text', 'choices')

class IterationSerializer(serializers.ModelSerializer):
	answers = serializers.StringRelatedField(many=True, read_only=True, required=False)

	class Meta:
		model = Iteration
		fields = ('id', 'iteration_title', 'created', 'complete', 'answers')

from django.db import models

class Question(models.Model):
	question_text = models.CharField(max_length=200)

	def __str__(self):
		return self.question_text

class Choice(models.Model):
	question = models.ForeignKey(Question, related_name='choices', on_delete=models.CASCADE)
	choice_text = models.CharField(max_length=200)

class Iteration(models.Model):
	iteration_title = models.CharField(max_length=200)
	created = models.DateTimeField(auto_now_add=True)
	complete = models.BooleanField()

class Answer(models.Model):
	iteration = models.ForeignKey(Iteration, related_name='answers', on_delete=models.CASCADE)
	choice = models.ForeignKey(Choice, related_name='answers', on_delete=models.PROTECT)

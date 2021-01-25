from django.db import models

class Question(models.Model):
	question_text = models.CharField(max_length=200)

	def __str__(self):
		return self.question_text

class Choice(models.Model):
	question = models.ForeignKey(Question, related_name='choices', on_delete=models.CASCADE)
	choice_text = models.CharField(max_length=200)

	def __str__(self):
		return f"{self.question.question_text}: {self.choice_text}"

class Iteration(models.Model):
	iteration_title = models.CharField(max_length=200)
	created = models.DateTimeField(auto_now_add=True)
	complete = models.BooleanField()

	def __str__(self):
		return self.iteration_title

class Answer(models.Model):
	iteration = models.ForeignKey(Iteration, related_name='answers', on_delete=models.CASCADE)
	choice = models.ForeignKey(Choice, related_name='answers', on_delete=models.PROTECT)

	def __str__(self):
		return f"{self.choice.question.question_text}: {self.choice.choice_text}"

# Generated by Django 4.2.5 on 2023-09-14 18:39

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Anime',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=100)),
                ('description', models.TextField()),
                ('image', models.ImageField(null=True, upload_to='images/')),
                ('trailer', models.FileField(null=True, upload_to='videos/')),
                ('release_year', models.DateField()),
            ],
            options={
                'verbose_name_plural': 'Anime',
                'ordering': ['title'],
            },
        ),
        migrations.CreateModel(
            name='Genre',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Rating',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rating', models.IntegerField()),
                ('pub_date', models.DateTimeField(auto_now_add=True)),
                ('anime', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='webapi.anime')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Comment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('comment', models.TextField()),
                ('pub_date', models.DateTimeField(auto_now_add=True)),
                ('anime', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='webapi.anime')),
                ('author', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name_plural': 'Comment',
                'ordering': ['pub_date'],
            },
        ),
        migrations.AddField(
            model_name='anime',
            name='genres',
            field=models.ManyToManyField(to='webapi.genre'),
        ),
    ]

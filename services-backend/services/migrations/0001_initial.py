# Generated by Django 4.1.3 on 2022-12-29 07:02

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
            name='Services',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=20)),
                ('description', models.CharField(max_length=200)),
                ('logo', models.CharField(max_length=1000)),
            ],
        ),
        migrations.CreateModel(
            name='Payment_User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('amount', models.FloatField(default=0.0)),
                ('payment_date', models.DateField(auto_now=True)),
                ('expiration_date', models.DateField(null=True)),
                ('service', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='service_payments', to='services.services')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_payments', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Expired_payments',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('penalty_fee_amount', models.FloatField(default=0.0)),
                ('payment_user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='payment_user', to='services.payment_user')),
            ],
        ),
    ]

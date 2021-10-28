from django.db import models

# Create your models here.

class Account(models.Model):
    
    class Meta:
        verbose_name = 'Account'
        verbose_name_plural = 'Accounts'
        
    TYPE_ID = (
        ('1', 'CEDULA'),
        ('2', 'TARJETA DE IDENTIDAD'),
        ('3', 'CEDULA DE EXTRANJERIA'),
    )
    type_id = models.CharField(
        'Tipo de identificación', max_length=1, choices=TYPE_ID
    )
    identity = models.BigIntegerField('Cedula', unique=True)
    first_name =  models.CharField('Nombres', max_length=100)
    last_name = models.CharField('Apellidos', max_length=100)
    password = models.CharField('Password', max_length=50)
    address =  models.CharField('Dirección', max_length=250, blank=True)
    phone_number = models.CharField('Telefono', max_length=80, blank=True, null=True)
    
    def __str__(self):
        return str(self.identity)
    
class FollowAccount(models.Model):
    
    class Meta:
        verbose_name = 'FollowAccount'
        verbose_name_plural = 'FollowAccount'
    
    account_emis = models.ForeignKey(
        Account,
        on_delete=models.CASCADE,
        related_name='account_emisor'
        )
    accpunt_follow= models.ForeignKey(
        Account,
        on_delete=models.CASCADE,
        related_name='account_follow'
        )
    # historial = HistoricalRecords()
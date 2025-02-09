from django import forms
from DutraPrime.models import Usuario

class FormUsuario(forms.ModelForm):
    #dados do formulário
    class Meta:
        #modelo utilizado (tabela)
        model = Usuario
        #campos que devem aparecer no form
        fields = ('nome', 'email', 'senha')

        widgets = {
            'nome': forms.TextInput(attrs={'class': 'bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5',
                                           'placeholder': 'Seu Nome aqui'}),
            'email': forms.TextInput(attrs={'class': 'bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5',
                                           'placeholder': 'Seu Email aqui'}),
            'senha': forms.TextInput(attrs={'class': 'bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5',
                                           'placeholder': 'Sua Senha aqui', 
                                           'type': 'password'}),
        }
        
class FormLogin(forms.ModelForm):
    #dados do formulário
    class Meta:
        #modelo utilizado (tabela)
        model = Usuario
        #campos que devem aparecer no form
        fields = ('email', 'senha')

        widgets = {
            'email': forms.TextInput(attrs={'class': 'bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5',
                                           'placeholder': 'Seu Email aqui'}),
            'senha': forms.TextInput(attrs={'class': 'bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5',
                                           'placeholder': 'Sua Senha aqui', 
                                           'type': 'password'}),
        }
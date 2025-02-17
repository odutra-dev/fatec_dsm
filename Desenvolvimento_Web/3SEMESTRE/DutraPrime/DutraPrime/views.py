from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.template import loader
from DutraPrime.forms import FormUsuario, FormLogin
from DutraPrime.models import Usuario
from django.contrib import messages
from datetime import timedelta
from django.contrib.auth import authenticate, login
from django.contrib.auth.hashers import make_password, check_password

def Home(request):

    template = loader.get_template("home.html")

    return HttpResponse(template.render())


def dashboard(request):
    nome_usuario = request.session.get('nome')
    
    if nome_usuario:
        context = {
            'nome_usuario': nome_usuario
        }
        return render(request, "dashboard.html", context)
    else:
        return redirect('login')


def register(request):
    formUsuario = FormUsuario(request.POST or None)

    if request.POST:
        if formUsuario.is_valid():
            nome = formUsuario.cleaned_data['nome']
            email = formUsuario.cleaned_data['email']
            senha = formUsuario.cleaned_data['senha']
            if Usuario.objects.filter(email=email).exists():
                messages.error(request,"Esse Email ja existe! Por favor use outro.")
            else:
                hashed_password = make_password(senha)
                user = Usuario.objects.create(nome=nome, email=email, senha=hashed_password)
                user.save()
                messages.success(request, "Usuário criado com sucesso")
                return redirect('login')
    context = {
        'form' : formUsuario
    }
    return render(request, 'registro.html', context)



def login(request):
    formLogin = FormLogin(request.POST or None)

    if request.POST:
        if formLogin.is_valid():
            email = formLogin.cleaned_data['email']
            senha = formLogin.cleaned_data['senha']
            try:
                users = Usuario.objects.get(email=email)
                if users is not None:
                    if check_password(senha, users.senha):  
                        request.session.set_expiry(timedelta(minutes=10))
                        request.session['nome'] = users.nome
                        return redirect('dashboard')
            except Usuario.DoesNotExist:
                return render(request, 'entrar.html', {'error_message': 'Credencias inválidas. Por favor, tente novamente.'})
                
    context = {
        'form' : formLogin
    }
    return render(request, 'entrar.html', context)
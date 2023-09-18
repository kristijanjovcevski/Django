from django.contrib import messages
from django.contrib.auth import authenticate, login, logout as auth_logout
from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect, HttpResponseRedirect
from django.views.decorators.csrf import csrf_exempt

from .forms import CustomUserCreationForm
from .models import Product, UserAddress


def index(request):
    if request.user.is_authenticated:
        #queryset = Product.objects.filter(author=request.user).all()
        queryset = Product.objects.all()

    else:
        queryset = Product.objects.all()

    context = {"products": queryset}

    return render(request, 'index.html', context=context)


@csrf_exempt
def proceed(request):
    user_address = UserAddress.objects.filter(user=request.user).first()
    return render(request, 'proceed.html',{'user_address': user_address})


def delivery(request):
    return render(request, 'delivery.html')


def register(request):

    if request.method == 'POST':
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data['username']
            password = form.cleaned_data['password1']
            user = authenticate(username = username, password = password)
            login(request,user)
            messages.success(request, 'You have singed up successfully.')

            return redirect('index')
    else:
        form = CustomUserCreationForm()

    return render(request, 'registration/register.html', {'form': form})


def login_user(request):

    if request.method == "POST":
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(request, username=username, password=password)

        if user is not None:
            login(request, user)
            messages.success(request,"Successful login")
            return redirect('index')

        else :
            messages.error(request, "Invalid email or password")
            return redirect('login')
    else:
        return render(request,'login.html',{})


def logout_user(request):
    auth_logout(request)
    messages.success(request, "Logged out")
    return HttpResponseRedirect("/foodshop/")


@csrf_exempt
@login_required
def save_address(request):
    user_address = None
    if request.method == 'POST':
        name = request.POST.get('name')
        address = request.POST.get('address')
        mobile = request.POST.get('mobile')
        city = request.POST.get('city')
        municipality = request.POST.get('municipality')

        user_address = UserAddress(
            user=request.user,
            name=name,
            address=address,
            mobile=mobile,
            city=city,
            municipality=municipality
        )
        user_address.save()

        return redirect('proceed')
    return render(request, 'proceed.html',{'user_address': user_address})


def payment(request):
    return render(request, 'payment.html')


@login_required
def profile(request):
    user = request.user
    return render(request, 'profile.html', {'user': user})


def guide(request):
    return render(request, 'guide.html')

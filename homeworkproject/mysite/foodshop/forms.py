#from .models import #CustomUser


# class CustomUserForm(forms.ModelForm):
#
#     email = forms.EmailField()
#     first_name = forms.CharField(max_length=40)
#     last_name = forms.CharField(max_length=40)
#     password = forms.CharField(widget=forms.PasswordInput)
#
#     class Meta:
#         model = CustomUser
#         fields=['first_name','last_name','email']
#
#
#     def __init__(self, *args, **kwargs):
#         super(CustomUserForm, self).__init__(*args, **kwargs)
#         for field in self.visible_fields():
#             field.field.widget.attrs["class"] = "form-control"
#
#
# class CustomUserCreationForm(UserCreationForm):
#     #email = forms.EmailField(required=True,max_length=254)
#     password = forms.CharField(widget=forms.PasswordInput)
#
#     class Meta:
#         model = User
#         fields = ( 'username','first_name','last_name','email', 'password1', 'password2')

# class CustomUserCreationForm(UserChangeForm):
#     email = forms.EmailField(max_length=254, required=True, help_text='Required. Enter a valid email address.')
#     first_name = forms.CharField(max_length=30, required=True, help_text='Required. Enter your first name.')
#     last_name = forms.CharField(max_length=30, required=True, help_text='Required. Enter your last name.')
#     password = forms.CharField(max_length=30, required=True, help_text='Required. Enter your last name.',widget=forms.PasswordInput)
#
#     class Meta:
#         model = UserChangeForm

#         fields = '__all__'


from django import forms
from django.contrib.auth.forms import UserCreationForm


class LoginForm(forms.Form):
    username = forms.CharField(max_length=65)
    password = forms.CharField(max_length=65, widget=forms.PasswordInput)


class CustomUserCreationForm(UserCreationForm):
    first_name = forms.CharField(max_length=65)
    last_name = forms.CharField(max_length=65)
    email = forms.EmailField()

    class Meta(UserCreationForm.Meta):
        fields = UserCreationForm.Meta.fields + ('first_name','last_name','email')



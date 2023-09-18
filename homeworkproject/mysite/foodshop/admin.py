from django.contrib import admin

from .models import Product, UserAddress


# Register your models here.


class ProductAdmin(admin.ModelAdmin):
    list_display = ("product_name", "product_weight", "author")

    def save_model(self, request, obj, form, change):
        obj.user = request.user
        return super().save_model(request, obj, form, change)

    def has_change_permission(self, request, obj=None):
        if obj and obj.author == request.user:
            return True
        return False

    def has_add_permission(self, request, obj=None):
        return True

    def has_delete_permission(self, request, obj=None):
        if obj and obj.author == request.user:
            return True
        return False


class UserAddressAdmin(admin.ModelAdmin):
    def has_view_permission(self, request, obj=None):
        return True

# class CustomUserAdmin(admin.ModelAdmin):
#     list_display = ("first_name", "last_name")
#
#     def has_add_permission(self, request, obj=None):
#         if request.user.is_superuser:
#             return True
#         return False
#
#
# admin.site.register(CustomUser, CustomUserAdmin)

admin.site.register(Product, ProductAdmin)
admin.site.register(UserAddress, UserAddressAdmin)

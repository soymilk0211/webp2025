from django.urls import path
from . import views
from .views import course_list, add_course

urlpatterns = [
    path("courselist", course_list),
    path("addcourse",add_course),
]


# urlpatterns = [
#     #path('add', views.add_post , name='add_post'),
#     #path('list', views.list_post, name='list_post'),
#     path('users', views.list_users, name='list_users'),
# ]
#from django.http import HttpResponse

# Create your views here.
#def myIndex(request):
#    my_name = request.POST.get('name',"CGU")
#    return HttpResponse("Hello "+my_name)

from rest_framework import status
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework.decorators import api_view
from django.core.serializers.json import DjangoJSONEncoder
import json
import logging

from .models import Post

logger = logging.getLogger('django')

# @api_view(['GET'])
# def myhello_api(request):
#     my_name = request.GET.get('name' , None)
#     if my_name:
#         #retValue = {}
#         #retValue['data'] = "Hello" + my_name
#         return Response({"data": "Hello "+ my_name}, status=status.HTTP_200_OK)
#     else:
#         return Response(
#             {"res":"parameter: name is None"},
#             status=status.HTTP_400_BAD_REQUEST
#         )

# @api_view(['GET'])
# def add_post(request):
#     title = request.GET.get('title', '')
#     content = request.GET.get('content','')
#     photo = request.GET.get('photo','')
#     location = request.GET.get('location','')

#     new_post = Post()
#     new_post.title = title
#     new_post.content = content
#     new_post.photo = photo
#     new_post.location= location
#     new_post.save()
#     logger.debug(" ************** myhello_api"+title)
#     if title:
#         return Response({"data": title +" insert!"},status=status.HTTP_200_OK)
#     else:
#         return Response(
#             {"res": "parameter: name is None"},
#             status=status.HTTP_400_BAD_REQUEST
#         )
# @api_view(['GET'])
# def list_post(request):
#     posts = Post.objects.all().values()
#     return JsonResponse(list(posts), safe=False)
#     # return Response({"data":
#     #                  json.dumps(
#     #                      list(posts),
#     #                      sort_keys= True,
#     #                      indent= 1,
#     #                      cls= DjangoJSONEncoder)},
#     #                 status=status.HTTP_200_OK)

from .models import Course
#課程列表
@api_view(["GET"])
def course_list(request):
    courses = Course.objects.all().values("id","department","course_title","instructor")
    return Response(list(courses),status=status.HTTP_200_OK)

#新增課程
@api_view(["POST"])
def add_course(request):
    data = request.data
    department = data.get("department")
    course_title = data.get("course_title")
    instructor = data.get("instructor")

    course = Course.objects.create(
        department=department,
        course_title=course_title,
        instructor=instructor
    )

    return Response(
        {"message": "課程新增成功","id": course.id},
        status=status.HTTP_201_CREATED
    )
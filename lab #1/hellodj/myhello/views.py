#from django.http import HttpResponse

# Create your views here.
#def myIndex(request):
#    my_name = request.POST.get('name',"CGU")
#    return HttpResponse("Hello "+my_name)

from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

@api_view(['GET'])
def myhello_api(request):
    my_name = request.GET.get('name' , None)
    if my_name:
        #retValue = {}
        #retValue['data'] = "Hello" + my_name
        return Response({"data": "Hello "+ my_name}, status=status.HTTP_200_OK)
    else:
        return Response(
            {"res":"parameter: name is None"},
            status=status.HTTP_400_BAD_REQUEST
        )
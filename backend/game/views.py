from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

from django.shortcuts import render

from django.http import JsonResponse

from django.http import HttpResponse



class Test(APIView):
    def get(self, request):
        return Response({'success': "lololoololololoo"})



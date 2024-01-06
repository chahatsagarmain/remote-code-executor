from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .utils import RunCode
import os

# Create your views here.
class CodeExecutor(APIView):
    
    def get(self , request , *args):
        
        return Response({"message" : "Send a post request with the python code"} , status=status.HTTP_200_OK)
    
    
    def post(self , request , *args) :
        
        try:
            
            data = request.body.decode('utf-8')
                        
            if data is None :
                return ValueError({"message" : "No code found"})
            
            with open("./api/cpp_runner/temp.cpp","w+",buffering=100) as temp:
                temp.write(data);

            runcode = RunCode()
            
            output = runcode.runCppCode()
            
            response = {"output" : output.__str__()}
  
            os.remove("./api/cpp_runner/temp.cpp")
            os.remove("./api/cpp_runner/temp")
                
            return Response(response , status=status.HTTP_200_OK)
                            
        except Exception as e:
            response = {"message" : str(e)}
            return Response(response , status=status.HTTP_500_INTERNAL_SERVER_ERROR)
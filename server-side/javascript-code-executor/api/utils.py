# import docker 
import os 
import subprocess

# class RunCode:
    
#     def runCppCode(self):
#         try:

#             client = docker.from_env()
#             # file = open("./api/cpp_docker/dockerfile",'r')
#             dockerfile_path = os.path.abspath("./api/python_docker/")
#             temp_path = os.path.abspath("./api/python_docker/")
            
#             client.images.build(path = dockerfile_path, tag="py_runner")
            
#             container = client.containers.run(
#                 "py_runner" ,
#                 name="python" ,
#                 # ports={3000:3000} ,
#                 detach = True ,
#                 auto_remove = True ,
#                 # volumes={temp_path: {"bind": "/usr/src/app", "mode": "rw"}},
#                 # privileged = True
#             )
                        
#             logs = container.logs().decode()
#             return logs 
            
#         except Exception as e:
#             print(e)
#             return e 
        
class RunCode:
    
    def runJsCode(self):
        
        try:

            with open("./api/js_runner/tempi.txt" , "r") as file:
                output = subprocess.run(["node","./api/js_runner/temp.js"] , capture_output=True , stdin=file)
            
            if output.returncode == 0:
                return output.stdout.decode()
                
            return output.stderr.decode()
        
        except Exception as e:
            print(e)
            return e.__str__()

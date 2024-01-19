# import docker 
import os 
import subprocess

# class RunCode:
    
#     def runCppCode(self):
#         try:

#             client = docker.from_env()
#             # file = open("./api/cpp_docker/dockerfile",'r')
#             dockerfile_path = os.path.abspath("./api/cpp_runner/")
#             temp_path = os.path.abspath("./api/cpp_runner/")
            
#             client.images.build(path = dockerfile_path, tag="cpp_runner")
            
#             container = client.containers.run(
#                 "cpp_runner" ,
#                 name="cppp" ,
#                 ports={3000:3000} ,
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
    
    def runCppCode(self):
        try:
            compile_output = subprocess.run(args=['g++','-o','./api/cpp_runner/temp','./api/cpp_runner/temp.cpp'], capture_output=True , timeout=10)
            
            if compile_output.returncode != 0:
                return compile_output
            
            with open("api/cpp_runner/tempi.txt" , "r") as file:

                run_output = subprocess.run(args=['./api/cpp_runner/temp'], capture_output=True, text=True ,stdin=file )
            
            return run_output.stdout
                
        except Exception as e:
            print(e)
            return e.__str__()


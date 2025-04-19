
# a program to take a folder containing c++ files and sub folders and compiles them all and links them using g++ 

import os
import subprocess
import sys
import re
import shutil
import time

def compile_file(file_path, output_path):
	# compile the file
	print(f"Compiling {file_path}")
	process = subprocess.Popen(["g++", "-c", file_path, "-o", output_path], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
	output, error = process.communicate()
	if error:
		print(f"Error: {error}")
	else:
		print(f"Compiled {file_path} successfully")
	return output_path

def link_files(object_files, executable_path):
	# link the object files
	print(f"Linking {object_files}")
	process = subprocess.Popen(["g++", *object_files, "-o", executable_path], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
	output, error = process.communicate()
	if error:
		print(f"Error: {error}")
	else:
		print(f"Linked successfully to {executable_path}")

def compile_folder(folder_path, output_folder):
	# get all the files in the folder
	files = os.listdir(folder_path)
	object_files = []
	for file in files:
		file_path = os.path.join(folder_path, file)
		if os.path.isdir(file_path):
			# if the file is a folder, compile it
			compile_folder(file_path, output_folder)
		else:
			# if the file is a c++ file, compile it
			if re.match(r".*\.cpp", file):
				output_path = os.path.join(output_folder, file.replace(".cpp", ".o"))
				object_file = compile_file(file_path, output_path)
				object_files.append(object_file)
	return object_files

def main():
	# get the folder containing the c++ files
	folder_path = sys.argv[1]
	output_folder = "compiled"
	executable_path = os.path.join(output_folder, "executable")
	if os.path.exists(output_folder):
		shutil.rmtree(output_folder)
	os.mkdir(output_folder)
	object_files = compile_folder(folder_path, output_folder)
	link_files(object_files, executable_path)

if __name__ == "__main__":
	main()


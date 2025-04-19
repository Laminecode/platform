from subprocess import run
from multiprocessing import Process

if __name__ == '__main__':

	processes = [
		["manage.py", "runserver"],
		["Server_side/server_side.py"],
	]

	procs = []
	for process in processes:
		args = ["python"] + process
		proc = Process(target=run, args=(args,))
		procs.append(proc)
		proc.start()  # Start the process

	# Wait for all processes to finish (optional)
	for proc in procs:
		proc.join()

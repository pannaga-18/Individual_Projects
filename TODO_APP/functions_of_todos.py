FILEPATH = r"C:\Users\jayshree\Desktop\todos.txt"

def get_todos(filepath=FILEPATH):
    with open(filepath,'r') as f:
        todos_local = f.readlines()
    return todos_local


def write_todos(todos_arg,filepath=FILEPATH):
    with open(filepath,'w') as f:
        f.writelines(todos_arg)
        


import PySimpleGUI as p
import functions_of_todos as f
import time as t
import os

# if file is not present it creates automatically without any error

if not(os.path.exists(r"C:\Users\jayshree\Desktop\todos.txt")):
    with open(r"C:\Users\jayshree\Desktop\todos.txt", 'w') as file:
        pass

p.theme('DarkBrown')
clock = p.Text("", key = "clock")
label = p.Text("Type a To do")
input_box = p.InputText(tooltip="Enter todo", key="todo")                       #tooltip is used to provide a message when cursor is placed on it
add_button = p.Button("Add")

list_box = p.Listbox(values=f.get_todos(), key="todos",
                   enable_events=True , size=[45, 10])               # size=[,] accepts two integers first is max chars in the string and second int is max number of todo in that listbox

edit_button = p.Button("Edit", button_color='black on white')  #size=[5,5]          # button_color

                                            
complete_button = p.Button(tooltip = "Complete", key='Complete' ,image_source = "TO-DO APP(GUI)\complete.png")          #OR  complete_button = p.Button(size=[5,0],mouseover_colors="LightBlue2",key="Complete")

exit_button = p.Button("Exit")

    
window = p.Window("My first GUI",
                layout=[[clock],
                        [label],
                        [input_box, add_button],
                        [list_box, edit_button, complete_button],
                        [exit_button]],                        
                        font=('Helvetica', 15))
#layout expects a list which contains object instances of textbox,buttons etc.
#To get the screen on the monitor           #Square brackets gets separate rows in gui


while True: 
    
    event,values = window.read(timeout=60)        # For continous movement of time we use timeout reading every 60ms.
    window["clock"].update(value = t.strftime("%H:%M:%S"))
    print(event)
    print(values)
    match event:
        case "Add":
            todos = f.get_todos()                   # existing todos from the file
            new_todos = values["todo"]              # new todos from the text box
            todos.append(new_todos)                 # appending to current list
            f.write_todos(todos)                    # writing back to file
            window['todos'].update(values=todos)    # updates todos on the screen.
            
        case "Edit":
            try:
                todo_to_edit = values["todos"][0]       #this has the value which is which we select in the box of todos '''
                
                new_todo = values['todo']            #value written in Add todo box
                todos = f.get_todos()
                index = todos.index(todo_to_edit)   #Replacing old with new
                                                                                            
                todos[index] = new_todo 
                f.write_todos(todos)              #Writing back to file
                window['todos'].update(values=todos)       #Updating the box instantly after editing the todo list
            except IndexError:
                p.popup("Please select an item in the list box")
        case "Complete":
            try:
                todo_completed = values["todos"][0]  
                todos = f.get_todos()                   #Reading the list from the file
                todos.remove(todo_completed)            #Removing the comple todo 
                f.write_todos(todos)                    #Writing back to the file
                window['todos'].update(values=todos)     #Updating the list on app.
                window["todo"].update(value='')
            except (IndexError, ValueError):
                p.popup("Please select an item in the list box")
            
        case 'todos':
            window['todo'].update(value=values['todos'][0])       #Updating current selection in the input box

        case 'Exit':
            break

        # Close button 
        case p.WIN_CLOSED:
            break

window.close()



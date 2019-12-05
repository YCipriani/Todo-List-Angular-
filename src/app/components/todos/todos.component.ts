import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/Todo';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})
export class TodosComponent implements OnInit {
  todos:Todo[];

  constructor(private todoService:TodoService) { }

  ngOnInit() {
    this.todoService.getTodos().subscribe( todos => {
      this.todos = todos;
    });
  }

  deleteTodo(todo:Todo) {
    //deleting on UI side (component)
    this.todos = this.todos.filter(t => t.id !== todo.id);
    //deletes it on the server side by using service
    this.todoService.deleteTodo(todo).subscribe();
  }

  addTodo(todo:Todo) {
    //POST request to server through service
    this.todoService.addTodo(todo).subscribe(todo => {
      this.todos.push(todo);
    })
  }

}

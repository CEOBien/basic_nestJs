import { Injectable } from '@nestjs/common';
import { Todo } from './entities/todo.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { todoDTO } from './dto/todo.dto';

@Injectable()
export class TodoService {
    constructor(
        @InjectRepository(Todo)
        private todoRepository: Repository<Todo>,
        
      ) {}
    async createTodo(todoDTO:todoDTO):Promise<Todo>{
        return this.todoRepository.save(todoDTO)
    } 
    async getAllTodo():Promise<Todo[]>{
        return this.todoRepository.find();
    }
    async getIdTodo(id: number):Promise<Todo | null>{
        return this.todoRepository.findOneBy({id})
    }
    async updateTodo(id: number, updateData: Partial<todoDTO>): Promise<Todo | undefined> {
        // Find the todo to update
        const todoToUpdate = await this.todoRepository.findOneBy({id});
    
        if (!todoToUpdate) {
          return null; // Handle case where todo is not found
        }
    
        // Update relevant properties using spread operator
        Object.assign(todoToUpdate, updateData);
    
        // Save the updated todo
        return this.todoRepository.save(todoToUpdate);
      }
    async removeTodo(id:number):Promise<void>{
        const findOneTodo = await this.todoRepository.findOneBy({id});
        if (!findOneTodo) {
            return null; // Handle case where todo is not found
          }
        await this.todoRepository.delete(id);
    }
}

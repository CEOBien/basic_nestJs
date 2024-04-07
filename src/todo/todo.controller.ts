import { Body, Controller, Post, Get, Param, Res, HttpStatus, Put, Delete, UseInterceptors, UsePipes, ValidationPipe, UseGuards } from '@nestjs/common';
import { TodoService } from './todo.service';
import { todoDTO } from './dto/todo.dto';
import { Todo } from './entities/todo.entity';
import { AuthGuard } from 'src/auth/auth.guard';
import { TransformInterceptor } from 'src/interceptor/transform.interceptor';
@Controller('todo')
export class TodoController {
    constructor(private todoService:TodoService){}

    @UseGuards(AuthGuard)
    @Post('createTodo')
    @UsePipes(ValidationPipe)
    async createTodo(@Body() todoDTO:todoDTO):Promise<Todo>{
        return this.todoService.createTodo(todoDTO)
    }

    @UseGuards(AuthGuard)
    @Get('getAllTodo')
    @UseInterceptors(TransformInterceptor)
    async getAllTodos(@Res() res): Promise<any> { 
      const todos = await this.todoService.getAllTodo();
      return res.status(HttpStatus.OK).json(todos);
    }
  
    @UseGuards(AuthGuard)
    @Get('getIdTodo/:id')
    @UseInterceptors(TransformInterceptor)
    async getTodoById(@Res() res, @Param('id') id: number): Promise<any> { // Consider returning Todo | undefined
      const todo = await this.todoService.getIdTodo(id);
      if (!todo) {
        return res.status(HttpStatus.NOT_FOUND).json({ message: 'Todo not found' });
      }
      return res.status(HttpStatus.OK).json(todo);
    }

    @UseGuards(AuthGuard)
    @Put('updateTodo/:id')
    async updateTodo(@Res() res, @Param('id') id: number, @Body() updateData: any): Promise<any> { // Update types
        const updatedTodo = await this.todoService.updateTodo(id, updateData);
        if (!updatedTodo) {
            return res.status(HttpStatus.NOT_FOUND).json({ message: 'Todo not found' });
        }
        return res.status(HttpStatus.OK).json({ message: 'Update todo successfully' });
    }

    @UseGuards(AuthGuard)
    @Delete('deleteTodo/:id')
    async removeTodo(@Res() res,@Param('id') id: number): Promise<any> {
        await this.todoService.removeTodo(id);
        return res.status(HttpStatus.OK).json({message:`Delete todo id ${id} successfully`})
    }
}

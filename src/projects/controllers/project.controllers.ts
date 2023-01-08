import { Body, ClassSerializerInterceptor, Controller, Get, Post, UseGuards, UseInterceptors, UsePipes, ValidationPipe } from "@nestjs/common";
import { JwtAuthGuard } from "../../auth/guards/jwt-auth.guard";
import { CreateProjectDto } from "../dto/projects.dto";
import { Project } from "../project.entity";
import { ProjectService } from "../services/project.service";

@Controller('projects')
export class ProjectsController {
  constructor(
    private projectService: ProjectService
    ) {}

  @Post()
  @UsePipes(ValidationPipe)
  @UseInterceptors(ClassSerializerInterceptor)
  createProject(@Body() createProjectDto: CreateProjectDto): Promise<Project> {
    return this.projectService.createProject(createProjectDto);
  }

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAll() {
    return this.projectService.findAll();
  }
}

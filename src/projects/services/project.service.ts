import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateProjectDto } from "../dto/projects.dto";
import { Project } from "../project.entity";

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
  ) {}

  async createProject(body: CreateProjectDto): Promise<Project> {
    const newProject = this.projectsRepository.create(body)
    return this.projectsRepository.save(newProject)
  }

  async findAll(): Promise<Project[]> {
    return this.projectsRepository.find();
  }
}

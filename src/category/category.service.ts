import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { PrismaService } from "@/prisma/prisma.service";
import { ResultData } from "@/utils/result";

@Injectable()
export class CategoryService {
  @Inject()
  private readonly prisma: PrismaService;

  async create(createCategoryDto: CreateCategoryDto) {
    const result = await this.prisma.category.create({
      data: {
        title: createCategoryDto.title
      }
    });
    return ResultData.success(result);
  }

  async findAll() {
    // 栏目应该不多，暂时不分页
    const result = await this.prisma.category.findMany();
    return ResultData.success(result);
  }

  async findOne(id: number) {
    const category = await this.prisma.category.findUnique({
      where: {
        id
      }
    });

    if (!category) {
      return ResultData.error(HttpStatus.NOT_FOUND, "文章不存在");
    } else {
      return ResultData.success(category);
    }
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const result = await this.prisma.category.update({
      where: {
        id
      },
      data: {
        title: updateCategoryDto.title
      }
    });
    return ResultData.success(result);
  }

  async remove(id: number) {
    await this.prisma.category.delete({
      where: {
        id
      }
    });
    return ResultData.success(true);
  }
}

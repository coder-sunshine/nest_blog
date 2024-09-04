import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { CreateArticleDto } from "./dto/create-article.dto";
import { UpdateArticleDto } from "./dto/update-article.dto";
import { PrismaService } from "@/prisma/prisma.service";
import { ConfigService } from "@nestjs/config";
import { ResultData } from "@/utils/result";

@Injectable()
export class ArticleService {
  @Inject()
  private readonly prisma: PrismaService;

  @Inject(ConfigService)
  private readonly configService: ConfigService;

  async create(createArticleDto: CreateArticleDto) {
    const result = await this.prisma.article.create({
      data: {
        ...createArticleDto
      }
    });
    return ResultData.success(result);
  }

  async findAll(page: number = 1, pageSize: number) {
    const size = +(pageSize ?? this.configService.get("ARTICLE_PAGE_SIZE"));

    const articles = await this.prisma.article.findMany({
      skip: (page - 1) * size,
      take: size,
      orderBy: [
        {
          createdAt: "asc"
        }
      ]
    });

    const total = await this.prisma.article.count();

    const result = {
      meta: {
        page: +page,
        pageSize: size,
        total,
        totalPage: Math.ceil(total / size) // 当前页
      },
      list: articles
    };

    return ResultData.success(result);
  }

  async findOne(id: number) {
    const article = await this.prisma.article.findUnique({
      where: {
        id
      }
    });
    if (!article) {
      return ResultData.error(HttpStatus.NOT_FOUND, "文章不存在");
    } else {
      return ResultData.success(article);
    }
  }

  async update(id: number, updateArticleDto: UpdateArticleDto) {
    const result = await this.prisma.article.update({
      where: {
        id
      },
      data: {
        ...updateArticleDto
      }
    });
    return ResultData.success(result);
  }

  async remove(id: number) {
    await this.prisma.article.delete({
      where: {
        id
      }
    });
    return ResultData.success(true);
  }
}

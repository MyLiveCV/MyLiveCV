import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { CreateResumeDto, ImportResumeDto, ResumeDto, UpdateResumeDto } from "@reactive-resume/dto";
import { defaultResumeData, ResumeData } from "@reactive-resume/schema";
import type { DeepPartial } from "@reactive-resume/utils";
import { generateRandomName, kebabCase } from "@reactive-resume/utils";
import { ErrorMessage } from "@reactive-resume/utils";
import { RedisService } from "@songkeys/nestjs-redis";
import deepmerge from "deepmerge";
import Redis from "ioredis";
import { PrismaService } from "nestjs-prisma";

import { PrinterService } from "@/server/printer/printer.service";

import { StorageService } from "../storage/storage.service";
import { UtilsService } from "../utils/utils.service";

@Injectable()
export class ResumeService {
  private readonly redis: Redis;

  constructor(
    private readonly prisma: PrismaService,
    private readonly printerService: PrinterService,
    private readonly storageService: StorageService,
    private readonly redisService: RedisService,
    private readonly utils: UtilsService,
  ) {
    this.redis = this.redisService.getClient();
  }

  async create(userId: string, createResumeDto: CreateResumeDto) {
    const { name, email, picture } = await this.prisma.user.findUniqueOrThrow({
      where: { id: userId },
      select: { name: true, email: true, picture: true },
    });

    const data = deepmerge(defaultResumeData, {
      basics: { name, email, picture: { url: picture ?? "" } },
    } satisfies DeepPartial<ResumeData>);

    const resume = await this.prisma.resume.create({
      data: {
        data,
        userId,
        title: createResumeDto.title,
        visibility: createResumeDto.visibility,
        slug: createResumeDto.slug ?? kebabCase(createResumeDto.title),
        jobTitle: createResumeDto.jobTitle,
      },
    });

    // await Promise.all([
    //   this.redis.del(`user:${userId}:resumes`),
    //   this.redis.set(`user:${userId}:resume:${resume.id}`, JSON.stringify(resume)),
    // ]);

    return resume;
  }

  async import(userId: string, importResumeDto: ImportResumeDto) {
    const randomTitle = generateRandomName();

    const resume = await this.prisma.resume.create({
      data: {
        userId,
        visibility: "private",
        data: importResumeDto.data,
        title: importResumeDto.title || randomTitle,
        slug: importResumeDto.slug || kebabCase(randomTitle),
        jobTitle: importResumeDto.jobTitle,
      },
    });

    // await Promise.all([
    //   this.redis.del(`user:${userId}:resumes`),
    //   this.redis.set(`user:${userId}:resume:${resume.id}`, JSON.stringify(resume)),
    // ]);

    return resume;
  }

  findAll(userId: string) {
    return this.prisma.resume.findMany({
      select: {
        id: true,
        title: true,
        slug: true,
        jobTitle: true,
        // data: true,
        visibility: true,
        locked: true,
        userId: true,
        createdAt: true,
        updatedAt: true,
        user: true,
        downloads: true,
        views: true,
      },
      where: { userId },
      orderBy: { updatedAt: "desc" },
    });
  }

  findResumeCount(userId: string) {
    return this.prisma.resume.count({
      where: { userId },
    });
  }

  findOne(id: string, userId?: string) {
    if (userId) {
      return this.prisma.resume.findUniqueOrThrow({ where: { userId_id: { userId, id } } });
    }

    return this.prisma.resume.findUniqueOrThrow({ where: { id } });
  }

  async findOneStatistics(userId: string, id: string) {
    // const result = await Promise.all([
    //   this.redis.get(`user:${userId}:resume:${id}:views`),
    //   this.redis.get(`user:${userId}:resume:${id}:downloads`),
    // ]);
    // const [views, downloads] = result.map((value) => Number(value) || 0);
    // return { views, downloads };

    const resume = await this.prisma.resume.findFirstOrThrow({
      where: { userId: userId, id },
    });

    return { views: resume.views, downloads: resume.downloads };
  }

  async findOneByUsernameSlug(username: string, slug: string, userId?: string) {
    const resume = await this.prisma.resume.findFirstOrThrow({
      where: { user: { username }, slug, visibility: "public" },
    });

    // Update statistics: increment the number of views by 1
    if (!userId)
      await this.prisma.resume.update({
        where: { id: resume.id },
        data: { views: resume.views + 1 },
      });
    // if (!userId) await this.redis.incr(`user:${resume.userId}:resume:${resume.id}:views`);

    return resume;
  }

  async update(userId: string, id: string, updateResumeDto: UpdateResumeDto) {
    try {
      const { locked } = await this.prisma.resume.findUniqueOrThrow({
        where: { id },
        select: { locked: true },
      });

      if (locked) throw new BadRequestException(ErrorMessage.ResumeLocked);

      const resume = await this.prisma.resume.update({
        data: {
          title: updateResumeDto.title,
          slug: updateResumeDto.slug,
          jobTitle: updateResumeDto.jobTitle,
          visibility: updateResumeDto.visibility,
          data: updateResumeDto.data as unknown as Prisma.JsonObject,
        },
        where: { userId_id: { userId, id } },
      });

      // await Promise.all([
      //   this.redis.set(`user:${userId}:resume:${id}`, JSON.stringify(resume)),
      //   this.redis.del(`user:${userId}:resumes`),
      //   this.redis.del(`user:${userId}:storage:resumes:${id}`),
      //   this.redis.del(`user:${userId}:storage:previews:${id}`),
      // ]);

      return resume;
    } catch (error) {
      if (error.code === "P2025") {
        Logger.error(error);
        throw new InternalServerErrorException(error);
      }
    }
  }

  async lock(userId: string, id: string, set: boolean) {
    const resume = await this.prisma.resume.update({
      data: { locked: set },
      where: { userId_id: { userId, id } },
    });

    // await Promise.all([
    //   this.redis.set(`user:${userId}:resume:${id}`, JSON.stringify(resume)),
    //   this.redis.del(`user:${userId}:resumes`),
    // ]);

    return resume;
  }

  async visible(userId: string, id: string, visible: boolean) {
    const resume = await this.prisma.resume.update({
      data: { visibility: visible ? "public" : "private" },
      where: { userId_id: { userId, id } },
    });

    return resume;
  }

  async remove(userId: string, id: string) {
    await Promise.all([
      // Remove cached keys
      // this.redis.del(`user:${userId}:resumes`),
      // this.redis.del(`user:${userId}:resume:${id}`),

      // Remove files in storage, and their cached keys
      this.storageService.deleteObject(userId, "resumes", id),
      this.storageService.deleteObject(userId, "previews", id),
    ]);

    return this.prisma.resume.delete({ where: { userId_id: { userId, id } } });
  }

  async printResume(resume: ResumeDto, userId?: string) {
    const url = await this.printerService.printResume(resume);

    // Update statistics: increment the number of downloads by 1
    // if (!userId) await this.redis.incr(`user:${resume.userId}:resume:${resume.id}:downloads`);
    if (!userId)
      await this.prisma.resume.update({
        where: { id: resume.id },
        data: { downloads: resume.downloads + 1 },
      });

    return url;
  }

  printPreview(resume: ResumeDto) {
    return this.printerService.printPreview(resume);
  }
}

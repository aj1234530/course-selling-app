import express, { Request, Response } from "express";
import { authSessionMiddleware } from "../middlewares/authsession";
import { PrismaClient } from "@prisma/client";
import { createStoreSchema } from "../types/zodValidation";
export const prisma = new PrismaClient(); //export prisma client

export const adminRouter = express.Router();

adminRouter.post(
  "/createcourse",
  authSessionMiddleware,
  async (req: Request, res: Response) => {
    try {
      const id = req.userId;
      console.log(id);
      const { courseTitle, courseDescription, price } = req.body; //add zod validation here
      const user = await prisma.admin.findFirst({ where: { id } });
      //using prisma transaction to create a course and it root directory
      await prisma.$transaction(async () => {
        const course = await prisma.course.create({
          data: {
            adminId: id,
            courseTitle: courseTitle,
            courseDescription: courseDescription,
            price: parseInt(price), //parsing to integer
          },
        }); //will create a course referencing the the ownerId that is a admin
        const rootDirectory = await prisma.rootCourseContentDirectory.create({
          data: { courseId: course.id },
        });
      });

      res.status(200).json({ message: "your course is created" });
    } catch (error) {
      console.log(error);
      res
        .status(500)
        .json({ message: "internal server error,retry a bit later" });
    }
  }
);
//access all the courses created by him
//we can apply pagination here
adminRouter.get(
  "/allcourses",
  authSessionMiddleware,
  async (req: Request, res: Response) => {
    try {
      const courses = await prisma.course.findMany();
      res.status(200).json({ yourcourses: courses });
    } catch (error) {
      console.log(error);
    }
  }
);
adminRouter.get("/course/:id", async (req, res) => {
  const { id } = req.params;
  try {
    //these could have been done in one queries
    const course = await prisma.course.findUnique({
      where: { id: id },
    });
    //can we implement include querey here
    const rootDirectory = await prisma.rootCourseContentDirectory.findFirst({
      where: { courseId: id },
      select: {
        id: true,
        title: true,
        video: true,
        link: true,
        notes: true,
        folder: {
          select: {
            id: true,
            title: true,
            videos: true,
            notes: true,
            link: true,
          },
        },
      },
    });
    res
      .status(200)
      .json({ requestedCourse: course, rootDirectory: rootDirectory });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

adminRouter.post(
  "/createRootDirectory/:courseId",
  authSessionMiddleware,
  async (req: Request, res: Response) => {
    //give the course id and make one
    const { courseId } = req.params;
    if (!courseId) {
      res.status(409).json({ message: "please select a course(courseId)" });
      return;
    }
    try {
      const course = await prisma.course.findFirst({ where: { id: courseId } });
      const rootCourseDirectory =
        await prisma.rootCourseContentDirectory.create({
          data: { courseId: courseId },
        }); //default directory name is main course folder;
      res.status(200).json({
        message:
          "root folder created, you can now add videos, links,pdfs and sub folders",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);
//folder is related to the course itself so will be managed here
//adding video to the folder not root directory
adminRouter.post(
  "/addvideo/:folderId",
  authSessionMiddleware,
  async (req, res) => {
    //folder id will relate to the concered course
    const { folderId } = req.params;
    const { videoUrl, videoTitle } = req.body;
    try {
      const video = await prisma.video.create({
        data: { title: videoTitle, url: videoUrl, folderId: folderId },
      });
      res.status(200).json({ message: "Video added Successfully" });
    } catch (error) {
      res.status(500).json({ message: "Internal Sever Error" });
    }
  }
);
adminRouter.post("/addlinks/:courseId", async (req, res) => {
  const link: string = req.body.link;
  try {
    if (!link) {
      res.status(409).json({ message: "link is required" });
      return;
    }
    const courseId = req.params.courseId;
    //add to the root directory
    // const createLink = await prisma.rootCourseContentDirectory.update({where:{courseId:courseId},data:{link:link}});//adding a
    const createLink = await prisma.link.create({
      data: { link: link, rootCourseContentDirectoryId: courseId },
    });
    res
      .status(200)
      .json({ message: "Link added to the root directory of this course" });
  } catch (error) {
    console.log(error);
    res.status(500).json("intenal server error");
  }
});

//nested folers not supported in schema yet
adminRouter.post(
  "/course/addfolder/:courseId",
  authSessionMiddleware,
  async (req, res) => {
    const courseId = req.params.courseId;
    const { title } = req.body;
    try {
      const createFolder = await prisma.folder.create({
        //in schema course id used to reference rootCouseDi
        data: { rootCourseContentDirectoryId: courseId, title: title },
      });
      res.status(200).json({ message: "folder created" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "internal server error" });
    }
  }
);
//just pass the id it will be deleted from the concerned course
adminRouter.delete("/videodelete/:videoId", async (req, res) => {
  const videoId = req.params.videoId;
  try {
    const deletedVideo = await prisma.video.delete({ where: { id: videoId } });
    res.status(200).json({ message: "the requested video was deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
adminRouter.delete("/folderdelete/:folderId", async (req, res) => {
  const folderId = req.params.folderId;
  try {
    //as the relatioon is optional so we we hae to delte the videos also
    const deleteVideos = await prisma.video.deleteMany({
      where: { folderId: folderId },
    });
    const deleteFolder = await prisma.folder.delete({
      where: { id: folderId },
    });
    res
      .status(200)
      .json({
        message: "the requested folder and video related to this  was deleted",
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});
//access a course

//add resources to the course

//we have to make select true for courses if we want to access the courses

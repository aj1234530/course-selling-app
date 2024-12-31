import express, { Request, Response } from "express";
import { authSessionMiddleware } from "../middlewares/authsession";
import { PrismaClient } from "@prisma/client";
import { bankServer } from "../webhook/bankSimulation";
const prisma = new PrismaClient();
export const userRouter = express.Router();
import { Course } from "@prisma/client";
userRouter.get("/courses", async (req, res) => {
  //can apply the pagination here(not applied for now)
  try {
    const courses = await prisma.course.findMany();
    res.status(200).json({ courses: courses });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal error" });
  }
});
userRouter.get(
  "/coursedetails/:courseId",
  async (req: Request, res: Response) => {
    //unautheticated
    const courseId = req.params.courseId;
    if (!courseId) {
      res.status(404).json({ message: "please enter course id" });
      return;
    }
    try {
      const course = await prisma.course.findFirst({ where: { id: courseId } });
      res.status(200).json({ message: course }); //responding with the course info
    } catch (error) {
      res.status(500).json({ message: "internal server error" });
    }
  }
);

userRouter.post(
  "/course/buy/:courseid",
  authSessionMiddleware,
  async (req: Request, res: Response) => {
    try {
      const courseId = req.params.courseid;
      const userId = req.userId;
      if (!courseId) {
        res.status(409).json({ message: "please provide  a course id" });
        return;
      }
      const course: Course | null = await prisma.course.findFirst({
        where: { id: courseId },
      });
      if (!course) {
        res.status(409).json({ message: "requested resource does not exists" });
        return;
      }
      //telling the bankserver to accempt exactly this much amount
      const confirmation = bankServer(course.price);
      if (!confirmation) {
        res.status(409).json({ message: "payment failed" });
        return;
      }
      //payment confirmation from the payment server - as soon as clicks the buy button - , redirected to the razorpay - the razor takes payment and send confirmation
      //razor pay accepts only if the pricing is equal to the actual cource price ()

      ////adding purchased course to the the purschaseCouses columna, (added an array witht the details in an object)many to one relationship is ... retry to add the couse getting purchaed to that fiedl
      console.log(userId, "inside");
      await prisma.user.update({
        where: { id: userId },
        data: {
          //https://www.prisma.io/docs/orm/reference/prisma-client-reference#connectorcreate
          purchasedCourses: {
            connect: [
              {
                id: course.id,
                courseTitle: course.courseTitle,
                courseDescription: course.courseDescription,
                adminId: course.adminId,
                price: course.price,
              },
            ],
          },
        },
      });
      res.status(200).json({ message: "Course purchased success" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "internal error" });
    }
  }
);

//all courses a student subs to ...
userRouter.get(
  "/myzone",
  authSessionMiddleware,
  async (req: Request, res: Response) => {
    const userId = req.userId;
    try {
      const user = await prisma.user.findFirst({
        where: { id: userId },
        select: { purchasedCourses: true },
      });
      if (!user) {
        throw new Error("internal error");
      }
      res.status(200).json({ courses: user.purchasedCourses }); //responding with all the purchased courses
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);
userRouter.get(
  "/accesscourse/:courseId/",
  authSessionMiddleware,
  //check if the use has purchaed this course or not

  async (req, res) => {
    const { courseId } = req.params;
    const userId = req.userId;
    try {
      const purchasedCourses = await prisma.user.findFirst({
        where: { id: userId },
        select: { purchasedCourses: true },
      });
      // console.log("purchase course", purchasedCourses);

      //checking if user has purchased this course - by filtering in purchased coloumnn of user
      //will return array
      const hasUserPurchasedThisCourse =
        purchasedCourses?.purchasedCourses.filter(
          (course) => course.id === courseId
        );
      if (hasUserPurchasedThisCourse?.length === 0) {
        res.status(409).json({
          messgae: "You don't have access to this course,, please buy first",
        });
        return;
      }
      //we are sending the folders with contents in it from the rootdirectory of the requested course
      const rootDirectory = await prisma.rootCourseContentDirectory.findFirst({
        where: { courseId: courseId },
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
      res.status(200).json({
        rootDirectory: rootDirectory,
        course: hasUserPurchasedThisCourse,
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

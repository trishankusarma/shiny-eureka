const fs = require("fs");
const exceljs = require("exceljs");
const mongoose = require("mongoose");

const {
  ExamSubjective,
  Classroom,
  StudentSubjective,
} = require("../../models");

const { googleApi } = require("../../utils");

const { uploadFolder, deleteFolder } = googleApi;

const internalServerError = {
  success: 0,
  msg: "Something went wrong! Try again later!",
};

const subjectiveExamController = {
  // 1) Upload Question Paper
  uploadQuestionPaper: async (req, res) => {
    try {
      const response = await ExamSubjective.findOne({ name: req.body.name });

      if (response !== null) {
        return res.json({
          success: 0,
          msg: "Please Enter Unique Name to your exam",
        });
      }

      await uploadFolder( req.teacher.tokens, req.file, async (value) => {
        if (value.success === 0) {
          res.json({
            success: 0,
            msg: value.msg,
          });
        }

        const { hour, minute, name, submissionTime, classroom_id } = req.body;

        const timeLength = hour + ":" + minute;

        const exam = new ExamSubjective({
          name,
          timeLength,
          fileId: value.fileId,
          submissionTime,
          questionPaper: value.webViewLink,
          classroom: mongoose.Types.ObjectId(classroom_id),
        });

        await exam.save();

        const classroom = await Classroom.findById(classroom_id);

        classroom.noOfExams = parseInt(classroom.noOfExams + 1);
        classroom.lastexam = exam.startTime;

        await classroom.save();

        res.json({
          success: 1,
          exam,
        });
      });
    } catch (error) {
      console.log(error);

      return res.json(internalServerError);
    }
  },

  // 2) Start Exam
  startExam: async (req, res) => {
    const _id = req.params._id;
    console.log(_id);

    try {
      const exam = await ExamSubjective.findById(_id);

      if (!exam) {
        res.json({
          success: 0,
          error: "No Exam with that id exists! Create New Exam",
          exam: null,
        });
      }

      console.log(exam);

      exam["status"] = true;
      exam["startTime"] = new Date().getTime();

      await exam.save();

      res.json({
        success: 1,
        exam,
      });
    } catch (error) {
      res.json(internalServerError);
    }
  },

  // 3) Get basic details -> teacher + students
  getBasicDetails: async (req, res) => {
    try {
      const response = await ExamSubjective.findById(req.params._id);

      console.log(response);

      const { auth } = req.query;

      if (response === null) {
        return res.json({
          success: 0,
          error: "Unable to fetch request",
        });
      }

      await response
        .populate({
          path: "classroom",
          select: "name",
        })
        .execPopulate();

      let exam;

      if (response.status || auth) {
        exam = response;
      } else {
        exam = {
          name: response.name,
          timeLength: response.timeLength,
          status: false,
          classroom: response.classroom,
          instruction: response.instruction,
        };
      }
      console.log(exam, "exams bey");
      res.status(200).json({
        success: 1,
        exam,
      });
    } catch (error) {
      console.log(error);
      res.json(internalServerError);
    }
  },

  // 4) Update Exam
  examUpdate: async (req, res) => {
    const _id = req.params._id;
    console.log(req.body, "req.body");
    try {
      const exam = await ExamSubjective.findById(_id);

      if (!exam) {
        res.json({
          success: 0,
          error: "No Exam with that id exists! Create New Exam",
        });
      }

      const { instruction, hour, minute, name, submissionTime, editType } =
        req.body;
      console.log(instruction, "asdas");
      if (editType !== "ONLY_INSTRUCTION") {
        const timeL = hour + ":" + minute;

        exam["name"] = name;
        exam["timeLength"] = timeL;
        exam["submissionTime"] = submissionTime;
      }

      exam["instruction"] = instruction;

      if (req.file) {
        await deleteFolder( req.teacher.tokens , exam["fileId"], async (value) => {
          if (value.success === 0) {
            return res.json({
              success: 0,
              msg: value.msg,
            });
          }
        });
        await uploadFolder(req.teacher.tokens, req.file, async (value) => {
          console.log(value);

          if (value.success === 0) {
            return res.json({
              success: 0,
              msg: value.msg,
            });
          }

          exam["fileId"] = value.fileId;

          exam["questionPaper"] = value.webViewLink;

          await exam.save();

          return res.json({
            success: 1,
            exam,
          });
        });
      } else {
        await exam.save();
        console.log(exam, "examexampadasd");
        return res.json({
          success: 1,
          exam,
        });
      }
    } catch (error) {
      console.log(error, "rooo");
      res.json(internalServerError);
    }
  },

  // 5) Get Exam Room -> student
  getExamByRoom: async (req, res) => {
    try {
      const { email , scholarId } = req.query;

      const response = await ExamSubjective.findOne({ name: req.params.room });

      if (response === null) {
        return res.json({
          success: 0,
          msg: "No exam exists with that room-name",
        });
      }

      const students = await Student.find(
        { classroom: response.classroom },
        {
          email: true,
          scholarId : true
        }
      );

      const existingStudent = await students.find(
        (student) => student.email === email && student.scholarId === parseInt(scholarId)
      );

      if (!existingStudent) {
        return res.json({
          success: 0,
          msg: "You are not part of the respective classroom!",
        });
      }

      if ( response.status && new Date().getTime() - response.startTime > 600000) {
        return res.json({
          success: 0,
          msg: "Exam has already started! You are late! Entry Restricted !",
        });
      }

      await response.populate("student_sub classroom", "teacher student exam").execPopulate();

      const student = response.student_sub.find(
        (s) => JSON.stringify(s.student) === JSON.stringify(existingStudent._id)
      );

      if (student) {
        return res.json({
          success: 2,
          msg: "Already registered!",
          studentSubjective: student,
          teacher : response.classroom.teacher
        });
      }

      const studentSubjective = StudentSubjective({
        exam: mongoose.Types.ObjectId(response._id),
        student: mongoose.Types.ObjectId(existingStudent._id),
      });

      studentSubjective['trackedImages'] = []

      await studentSubjective.save();

      res.status(200).json({
        success: 1,
        studentSubjective,
        teacher : response.classroom.teacher
      });
    } catch (error) {
      res.json(internalServerError);
    }
  },

  // 6) Exam Details with student marks
  examDetails: async (req, res) => {
    try {
      const response = await ExamSubjective.findById(req.params._id, {
        name: true,
        startTime: true,
      });

      if (response === null) {
        return res.json({
          success: 0,
          error: "Unable to fetch request",
        });
      }

      await response
        .populate({
          path: "student_sub",
          select: "student marksObtained checkedStatus answerScript lateStatus",
          populate: {
            path: "student",
            select: "name email scholarId",
          },
        })
        .execPopulate();

      res.status(200).json({
        success: 1,
        exam: response,
        students: response.student_sub,
      });
    } catch (error) {
      res.json({
        success: 0,
        error: "Internal Server Error",
      });
    }
  },

  // 8) Get Student List excel
  getStudentList: async (req, res) => {
    
    try {
      const response = await ExamSubjective.findById(req.params._id, {
        name: true,
      });

      if (response === null) {
        return res.json({ error: "Unable to fetch request" });
      }

      await response
        .populate({
          path: "student_sub",
          select: "student marksObtained checkedStatus",
          populate: {
            path: "student",
            select: "name email scholarId",
          },
        })
        .execPopulate();

      const workbook = new exceljs.Workbook();
      const worksheet = workbook.addWorksheet("Students_Subjective_Exam");

      worksheet.columns = [
        // name scholarId email status marks
        { header: "name", key: "name", width: 10 },
        { header: "scholarId", key: "scholarId", width: 10 },
        { header: "email", key: "email", width: 10 },
        { header: "checkedStatus", key: "checkedStatus", width: 10 },
        { header: "marksObtained", key: "marksObtained", width: 10 },
      ];

      await response.student_sub.forEach((student) => {
        worksheet.addRow({
          name: student.student.name,
          scholarId: student.student.scholarId,
          email: student.student.email,
          checkedStatus: student.checkedStatus,
          marksObtained: student.marksObtained,
        });
      });

      worksheet.getRow(1).eachCell((cell) => {
        cell.font = { bold: true };
      });

      await workbook.xlsx.writeFile(`./uploads/students.xlsx`);
      const fileLocation = `./uploads/students.xlsx`;
      const file = "students.xlsx";

      res.download(fileLocation, file, async (error) => {
        console.log("Error : ", error);

        fs.unlink(`./uploads/students.xlsx`, (error) => {
          console.log(error);
        });
      });
    } catch (error) {
      res.json(internalServerError);
    }
  },

  // 9) Delete Exam
  deleteExam: async (req, res) => {
    try {
      const _id = req.params._id;
      const exam = await ExamSubjective.findById(_id);

      if (!exam) {
        return res.json({
          success: 0,
          error: "Invalid Id",
        });
      }

      await deleteFolder(req.teacher.tokens , exam["fileId"], (value) => {
        if (value.success === 0) {
          return res.json({
            success: 0,
            msg: value.msg,
          });
        }
      });

      await exam.remove();

      return res.status(200).json({
        success: 1,
        exam,
      });
    } catch (error) {

      console.log(error)

      res.json(internalServerError);
    }
  },
};

module.exports = subjectiveExamController;

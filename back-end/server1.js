const app = require('./app')

const socket = require('socket.io')
const https = require('https')
const fs = require("fs")
const path = require('path')

const {
    PORT,
    CLIENT_URL
 } = process.env


const options = {
    key: fs.readFileSync(path.join(__dirname,'key.pem')),
    cert: fs.readFileSync(path.join(__dirname,'cert.pem'))
};

//sockets initialized
const server = https.createServer( options , app )

const io = socket(server,{
    cors:{
        origin : CLIENT_URL
    }
}) 

// console.log = function () {};

const {
    connectUser
} = require('./utils')

const {
    addStudent,
    getStudentsToRoom,
    removeUser,
    updateUser,
    submittedAnswerScript,
    removeCheatedStudent,
    updateUserPics
 } = connectUser
 
 //socket connections
 io.on('connection',(socket)=>{
 
     console.log('Web Sockets initialized',socket.id)
 
     socket.on('joinUser',async ({name , email , examHall , student_id })=>{
 
         const { err , student } = await  addStudent({
             student_id,
             name,
             email,
             examHall
         });
 
         // console.log("joinUser",err , student)
 
         socket.join(examHall)
 
         if(err){
             
             socket.emit('errorMessage',`${err} ${name}`)
 
         }else if(student){
             socket.emit('sendMessage',`Best of Luck ${name}`)
             
         
         }
 
             const { studentsInRoom } = await getStudentsToRoom(examHall)
 
             socket.broadcast.to(examHall).emit("studentsInRoom", studentsInRoom )
     })
     // teacher would emit startExam with the examroom name on starting the exam
     socket.on('startExam', async ({ examHall })=>{
         
         socket.join(examHall)
 
         console.log(examHall,'examHall-exam started')
 
         socket.broadcast.to(examHall).emit('examStarted' , "Exam has started!")
     })
 
     socket.on('joinRoomTeacher', async ({examHall})=>{
           
          socket.join(examHall)
 
          const { err, studentsInRoom } = await getStudentsToRoom(examHall)
 
          if(err){
             socket.emit('errorMessage',`${err}`)
          }
 
          socket.emit("studentsInRoom", studentsInRoom )
     })
 
     socket.on('removeUser', async ({email , examHall})=>{
 
         // console.log("removeUser", email,examHall)
 
         const studentsInRoom = await removeUser(email,examHall)
 
         socket.broadcast.to(examHall).emit("studentsInRoom", studentsInRoom )
     })
 
     socket.on('sendNotification', async ({notification , examHall})=>{
 
         // console.log(notification , examHall)
           
         socket.broadcast.to(examHall).emit("getNotification", notification )
     })
 
     socket.on("sendPic",async({pic,examHall,email})=>{
         // send pic from send pic to teacher
             const { studentsInRoom } = await updateUserPics(email,examHall, pic)
 
             socket.broadcast.to(examHall).emit("studentsInRoom", studentsInRoom )        
     })
     
 
     socket.on("cheatDetected" , async ({ notification , email, examHall })=>{
 
         // console.log(notification ,  email, examHall)
          
         const { studentsInRoom , excessCheating } = await updateUser(email,examHall, notification)
 
         // console.log(studentsInRoom,excessCheating)
 
         if(excessCheating.cheatFlag){
              
             socket.broadcast.to(examHall).emit("cheatedStudents",{
 
                 cheatedStudents : excessCheating.cheatedStudents ,
                 students : studentsInRoom
             })
         }
 
         socket.broadcast.to(examHall).emit("studentsInRoom", studentsInRoom )
     })
 
     socket.on("submittedPaper" , async ({ email, examHall })=>{
 
          
         const { studentsInRoom  } = await submittedAnswerScript(email,examHall )
 
         console.log("successfully submitted");
 
         socket.to(examHall).emit("studentsInRoom", studentsInRoom )
 
     })
 
     socket.on("disqualifyStudent" , async ({student})=>{
 
         // console.log("disqualifyStudent",student)
 
         const  { cheatedStudents , students } = await removeCheatedStudent(student)
         
         socket.emit("cheatedStudents", 
             { cheatedStudents , students }
         )
          
         io.to(student.examHall).emit("disqualifyStudent",{
             msg : `You are disqualified. Submit your answer script within prescribed time!`,
             email : student.email
         })
     })
 
     socket.on("giveChance" , async ({student})=>{
 
         // console.log('giveChance',student)
         const  { cheatedStudents , students } = await removeCheatedStudent(student)
         
         socket.emit("cheatedStudents", 
             { cheatedStudents , students }
         )
 
         io.to(student.examHall).emit("giveChance",{
               msg : `Your invigilator gave you last warning!`,
               email: student.email
         })
    })
 
    socket.on("sendIndivisualMessage", ({ student ,  message })=>{
 
         // console.log(student,message)
         
         io.to(student.examHall).emit('getIndivisualMessage', {
             
                  msg : message , 
                  email : student.email
         })
    })
 
    socket.on('disconnect',()=>{
        console.log("A user disconnected!!")
        return
    })
 })

server.listen(PORT , ()=>{
    console.log(`Server created by Trishanku Sarma running on port ${PORT}`)
})
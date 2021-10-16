const moment =require("moment");
const studentSubjective = require("../../models/model/studentSubjective");
let students = [];
let cheatedStudents = []

let maxmCheatPermitted = 5

const addStudent = async ({student_id, name, email,examHall}) => {


  // console.log("students",students)
 
  try {
    const checkStudentExit = await students.find(
      (student) =>  student.student_id===student_id
    );

    if (!name || !examHall || !email || !student_id){
      return { err: "Student email and room code are required." };
    }

    if (checkStudentExit){
      return {
        err:null
      };
    }

    const student = { student_id, name, email, examHall, status:false , notifications:[], pics:[] }
    
    students.push(student);

    return {student} ;
  } catch (err) {

    console.log(err, "socket error");
    return {err};
  }
};


const getStudentsToRoom=async(examHall)=>{

    // console.log("students",students)

    try{
        const studentsInRoom = await students.filter(student=>student.examHall===examHall);
        return { studentsInRoom }
    }
    catch(err){
        console.log(err,"socket error")
        return { err }
    }
}

const sendMessage=async(roleName,message)=>{
    try{
        return {
            roleName,
            message,
            time:moment().format('h:mm a')
        }
    }
    catch(err){
        console.log(err,"err")
        return {err}
    }
}

const getCurrentStudent = async (student_id)=>{
    return await students.find((student)=> student.student_id === student_id)
 }
 
 //update current user 
 const updateUser = async (email,examHall, notification )=>{
      
    let cheatFlag = false

    students = await Promise.all(students.map(async (student) => {

       if( student.email===email && student.examHall===examHall) {
                          
              if((student.notifications.length +1) >= maxmCheatPermitted){
                   cheatFlag = true
                   
                   let existCheater = await cheatedStudents.filter((student)=>student.email===email && student.examHall===examHall)

                   if(existCheater.length===0){
                        cheatedStudents.push(student)
                   }
              }
              
          return { ...student , notifications : [ ...student.notifications , notification ] }
        }
        
        return student 
    }))

    const studentsInRoom = await students.filter((student)=>student.examHall===examHall)

    const cheatedStudentsInRoom =  await cheatedStudents.filter((student)=>student.examHall===examHall)

    return { 
      studentsInRoom , 
      excessCheating : {
          cheatFlag ,
          cheatedStudents : cheatedStudentsInRoom
      }
    }
 }

 // update pics of the student

const updateUserPics=async (email,examHall,pic)=>{
  
  students = await Promise.all(students.map(async (student) => {
    if( student.email===email && student.examHall===examHall) {
      return { ...student , pics : [ ...student.pics , pic ] }
    }
    return student
  }))
  
  const studentsInRoom = await students.filter((student)=>student.examHall===examHall)
  return { 
    studentsInRoom 
  }
}

  //update current user to make status=true
  const submittedAnswerScript = async (email,examHall, )=>{
        
    students = await Promise.all(students.map(student=>{

           if( student.email===email && student.examHall===examHall){
                 
                 return { ...student, status : true }
           }  
           return student 
    }))
    
    const studentsInRoom = await students.filter((student)=>student.examHall===examHall)

    return { studentsInRoom  }
 }

 // remove user
 const removeUser = async ({email , examHall})=>{

   students = await students.filter((student)=>student.email!==email && student.examHall!==examHall )

   console.log("students", students)

   return await students.filter((student)=>student.examHall===examHall)
}

 // remove cheatedStudent
 const removeCheatedStudent = async (stu)=>{

  cheatedStudents = await  cheatedStudents.filter((STUDENT)=>STUDENT.student_id!==stu.student_id)

  students = await Promise.all(students.map(async (student) => {

    if( student.email===stu.email && student.examHall===stu.examHall) {
           
       return { ...student , notifications : [] }
     }
     
     return student 
 }))

  return{
      cheatedStudents : await cheatedStudents.filter((STUDENT)=>STUDENT.examHall===stu.examHall) ,
      students : await students.filter((STUDENT)=>STUDENT.examHall===stu.examHall)
  } 
}

module.exports = {updateUserPics, addStudent, getStudentsToRoom,sendMessage ,getCurrentStudent , updateUser, submittedAnswerScript, removeUser , removeCheatedStudent };

module.exports={
    superAdminController        : require('./controller/superAdmin'),

    institutionController       : require('./controller/institution'),

    teacherController           : require('./controller/teacher'),

    classroomController         : require('./controller/classroom'),
    
    examSubjectiveController    : require('./controller/examSubjective'),
    
    examObjectiveController     : require('./controller/examObjective'),
    
    mcqController               : require('./controller/ObjectiveExam/MCQ/mcq'),

    mcqOptionsController        : require('./controller/ObjectiveExam/MCQ/mcqOptions'),
    
    fillUpController            : require('./controller/ObjectiveExam/FillUp/fillUp'),
    
    studentController           : require('./controller/student'),
    
    studentSubjectiveController : require('./controller/studentSubjective'),
    
    studentObjectiveController  : require('./controller/studentObjective')
}
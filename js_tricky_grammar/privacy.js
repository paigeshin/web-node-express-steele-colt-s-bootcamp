function classRoom() {
  var instructors = ["Colt", "Elie"];
  return {
    getInstructors: function() {
      return instructors;
    },
    addInstructors: function(instructor) {
      instructors.push(instructor);
      return instructors;
    }
  };
}

course1 = classRoom();
//자바스크립트는 신기하게 return값만 있으면 function에도 인스턴스를 만들 수 있다.
course1.getInstructors();
course1.addInstructor("Ian");

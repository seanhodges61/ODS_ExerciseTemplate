/*jshint esversion: 6 */ 'use strict';

class QuestionType {
  constructor(questionData, numQuestionsArr, answerTypesClassName)
  {
    this.questions = [ ];
    this.setup(questionData, numQuestionsArr, answerTypesClassName);

    this.currQuestion = 0;
  }

  getQuestions()
  {
    return this.questions;
  }

  size ()
  {
    return this.questions.length;
  }

  setNumQuestionRequired(n)
  {
    var temp = this.numQuestionsRequired;
    this.numQuestionsRequired = n;
    return temp;
  }

  getCurrentQuestion () { return this.questions [this.currQuestion]; }

  setCurrQuestion (curr) {
    if (curr < 0)
    {
      console.error("From inside setCurrQuestion, curr is negative.");
      return false;
    }

    if (curr >= this.questions.length)
    {
      console.error("From inside setCurrQuestion, curr is too high.")
      return false;
    }

    var temp = this.currQuestion ;
    this.currQuestion = curr;
    return temp;
  }

  //TODO
  moveToNext ()
  {
    this.currQuestion ++;
    if (this.currQuestion >= this.size()){
      this.currQuestion = 0;
      return false;
    }

    return true;
  }

  moveToPrev ()
  {
    this.currQuestion --;
    if (this.currQuestion < 0){
      this.currQuestion = this.size() - 1;
      return false;
    }

    return true;
  }

  //if you want to modify this behavior, for example to scramble question order, override this method in the subclass, copying it, except add scramble or whatever extra functionality
  setup(questionData, numQuestionsArr, answerTypesClassName)
  {
    if (!questionData) {      //param checking
      if (DEBUG) { console.error("From inside QuestionType.setup(), falsy param."); }
      return;
    }

    var thisQuestion = null;
    for (var index in questionData)
    {
        for (let i = 0; i < numQuestionsArr[index]; i++)
        {
          thisQuestion = questionData[index];
          this.questions.push(new thisQuestion.class(thisQuestion, answerTypesClassName[index]));
        }
    }

    //would scramble here if desired using scramble question order

    var x;  //used to hold prev answer

    for (let i = 0; i < this.questions.length; i++)
    {
      this.questions [i].generateModel (x);
      x = this.questions[i].generateAnswer(x);   //x gets used first, and then assigned to
    }

  }

  //randomizeOrder = null

  scrambleQuestionOrder() {
    this.questions = ODSRandom.scramble (this.questions);
  }

  containsQuestionNum(questionNumber) { return this.questions.length > questionNumber; }

  draw ()
  {
    this.getCurrentQuestion ().display ();
  }


  check (userAnswer)
  {
    var currentQuestion = this.getCurrentQuestion ();
    return currentQuestion.check (userAnswer);
  }
}

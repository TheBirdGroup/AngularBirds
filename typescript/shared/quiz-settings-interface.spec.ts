import {QuizSetting} from './quiz.settings.interface';

describe('QuizSetting', () => {

  it('has mediaTypeID', () => {
    let quizsetting: QuizSetting = {
        mediaTypeID: 1,
        quizTypeID: 1,
        areaID: 0,
        timeLimit: 30,
        numQuestions: 10,
        showAlternatives: true,
        mediaDificulity: 1,
        siteID: 1,
     };
    expect(quizsetting.mediaTypeID).toEqual(1);
  });

  it('has quizTypeID', () => {
    let quizsetting: QuizSetting = {
        mediaTypeID: 1,
        quizTypeID: 1,
        areaID: 0,
        timeLimit: 30,
        numQuestions: 10,
        showAlternatives: true,
        mediaDificulity: 1,
        siteID: 1,
     };
    expect(quizsetting.quizTypeID).toEqual(1);
  });

  it('has areaID', () => {
    let quizsetting: QuizSetting = {
        mediaTypeID: 1,
        quizTypeID: 1,
        areaID: 0,
        timeLimit: 30,
        numQuestions: 10,
        showAlternatives: true,
        mediaDificulity: 1,
        siteID: 1,
     };
    expect(quizsetting.areaID).toEqual(0);
  });

  it('has timeLimit', () => {
    let quizsetting: QuizSetting = {
        mediaTypeID: 1,
        quizTypeID: 1,
        areaID: 0,
        timeLimit: 0,
        numQuestions: 10,
        showAlternatives: true,
        mediaDificulity: 1,
        siteID: 1,
     };
    expect(quizsetting.timeLimit).toEqual(0);
  });

  it('has numQuestions', () => {
    let quizsetting: QuizSetting = {
        mediaTypeID: 1,
        quizTypeID: 1,
        areaID: 0,
        timeLimit: 0,
        numQuestions: 10,
        showAlternatives: true,
        mediaDificulity: 1,
        siteID: 1,
     };
    expect(quizsetting.numQuestions).toEqual(10);
  });

  it('has showAlternatives', () => {
    let quizsetting: QuizSetting = {
        mediaTypeID: 1,
        quizTypeID: 1,
        areaID: 0,
        timeLimit: 0,
        numQuestions: 10,
        showAlternatives: true,
        mediaDificulity: 1,
        siteID: 1,
     };
    expect(quizsetting.showAlternatives).toEqual(true);
  });

  it('has mediaDificulity', () => {
    let quizsetting: QuizSetting = {
        mediaTypeID: 1,
        quizTypeID: 1,
        areaID: 0,
        timeLimit: 0,
        numQuestions: 10,
        showAlternatives: true,
        mediaDificulity: 1,
        siteID: 1,
     };
    expect(quizsetting.mediaDificulity).toEqual(1);
  });

  it('has siteID', () => {
    let quizsetting: QuizSetting = {
        mediaTypeID: 1,
        quizTypeID: 1,
        areaID: 0,
        timeLimit: 0,
        numQuestions: 10,
        showAlternatives: true,
        mediaDificulity: 1,
        siteID: 1,
     };
    expect(quizsetting.siteID).toEqual(1);
  });




});

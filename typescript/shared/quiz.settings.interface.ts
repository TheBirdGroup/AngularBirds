export interface QuizSetting {
  mediaTypeID: number;
  severalSoundQuiz: boolean;
  beginnerQuiz: boolean;
  formalTestQuiz: boolean;
  areaID: number;
  timeLimit: number;
  numQuestions: number;
  showAlternatives: boolean;
  mediaDificulity: number;
  formalTestAccessCode:string;
  competitionGroupID: number;
  competitionGroupCode: string;
  siteID: number;
  langID: number;
  authenticationToken: string;
}

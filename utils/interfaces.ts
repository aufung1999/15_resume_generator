export interface Stage_3_interface {
  match_index_1st: string;
  match_index_2nd: string;
  match_sentence: string;
}

export interface Stage_3_skill extends Stage_3_interface {
  technique: string;
}

export interface Stage_3_work extends Stage_3_interface {
  user_data: string;
}

export interface Stage_3_project extends Stage_3_interface {
  user_data?: string;
  technique?: string;
}

//==================================================================================
export interface Skill_interface {
  skillIndex: string;
  skill: string;
}

export interface Job_Description_interface {
  rowIndex: string;
  Row?: string;
}

export interface Project_Description_interface {
  rowIndex: string;
  Row?: string;
}

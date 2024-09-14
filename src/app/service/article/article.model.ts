export interface Article {
  id: number;
  user: User;
  titre: string;
  img: string;
  contenu: string;
  estPublic: boolean;
  allowComments: boolean;
  likeCount: number;
  viewCount: number;
  dateCreation: string;
  dateMiseAJour?: string | null;
}

export interface User {
  id: number;
  nomComplete: string;
  profile: string | null;
  userNom: string;
  email: string;
  password: string;
  articles: any[];
  commentaires: any[];
  amities: any[];
}
  
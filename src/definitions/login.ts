export type login_family_account = {
  idLogin: number
  id: number
  uid: string
  identifiant: string
  typeCompte: "1" | "2"
  codeOgec: string
  main: boolean
  /** @example "2024-12-12 17:21" */
  lastConnexion: string
  civilite: string
  prenom: string
  particule: string
  nom: string
  email: string
  nomEtablissement: string
  logoEtablissement: string
  couleurAgendaEtablissement: string
  dicoEnLigneLeRobert: boolean
  accessToken: string
  socketToken: string
  modules: unknown[] // TODO
  parametresIndividuels: unknown // TODO
  profile: login_family_profile
};

export type login_family_profile = {
  email: string
  telPortable: string
  telPortableConjoint: string
  eleves: Array<{
    id: number
    prenom: string
    nom: string
    sexe: string
    infoEDT: string
    photo: string
    nomEtablissement: string
    idEtablissement: string
    idReelEtab: string
    modules: unknown[] // TODO
    classe?: {
      id: number
      code: string
      libelle: string
      estNote: number // NOTE: probably 0 | 1
    }
  }>
};

export type login_student_account = {
  idLogin: number
  id: number
  uid: string
  identifiant: string
  typeCompte: "E"
  codeOgec: string
  main: boolean
  /** @example "2024-12-12 17:21" */
  lastConnexion: string
  civilite: string
  prenom: string
  particule: string
  nom: string
  email: string
  nomEtablissement: string
  logoEtablissement: string
  couleurAgendaEtablissement: string
  dicoEnLigneLeRobert: boolean
  accessToken: string
  socketToken: string
  modules: unknown[] // TODO
  parametresIndividuels: unknown // TODO
  profile: login_student_profile
};

export type login_student_profile = {
  sexe: string
  infoEDT: string
  nomEtablissement: string
  idEtablissement: string
  rneEtablissement: string
  telPortable: string
  idReelEtab: string
  photo: string
  classe?: {
    id: number
    code: string
    libelle: string
    estNote: number // NOTE: probably 0 | 1
  }
};

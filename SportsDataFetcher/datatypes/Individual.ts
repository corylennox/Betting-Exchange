import Id from "./Id";

class Individual {
  id: Id;
  displayName: string;
  abbreviatedName: string;
  dateOfBirth: Date;

  constructor(data: any) {
    this.id = data.id;
    this.displayName = data.name;
    this.abbreviatedName = data.abbr_name;
    this.dateOfBirth = data.birth_date;
  }
}

export default Individual;

import { Id } from "../../bettingexchangecommon/datatypes/Id";

/**
 * An Individual object that contains the necessary data to insert the Individual into the database
 */
export class Individual {
  vendorId: Id;
  displayName: string;
  abbreviatedName: string;
  dateOfBirth: Date;

  constructor(data: any) {
    this.vendorId = data.id;
    this.displayName = data.name;
    this.abbreviatedName = data.abbr_name;
    this.dateOfBirth = data.birth_date;
  }
}

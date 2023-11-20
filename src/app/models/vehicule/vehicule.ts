export class Vehicule {
  anneeModel: number;
  imageVehicule: string;
  prix:number;

  constructor(anneeModel: number,
    imageVehicule: string,
    prix:number) {
    this.anneeModel = anneeModel;
    this.imageVehicule = imageVehicule;
    this.prix = prix;
  }
}

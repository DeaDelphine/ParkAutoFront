export class Vehicule {
  anneeModel: number;
  imageVehicule: string;
  prix: number;
  descriptif: string;

  constructor(anneeModel: number,
    imageVehicule: string,
    prix:number, descriptif: string) {
    this.anneeModel = anneeModel;
    this.imageVehicule = imageVehicule;
    this.prix = prix;
    this.descriptif = descriptif;
  }
}

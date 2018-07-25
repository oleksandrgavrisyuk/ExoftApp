export class CreateDishRequestModel {
  name: string;
  description: string;
  photoPath: string;
}

export class UpdateDishRequestModel {
  id: number;
  name: string;
  description: string;
  photoPath: string;
}

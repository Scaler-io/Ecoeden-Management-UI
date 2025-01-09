import {Unit, UnitFormModel, UpsertUnitRequest} from '../models/unit';

export class UnitMapper {
  public static mapUnitFormToUnitRequest(form: UnitFormModel, id?: string): UpsertUnitRequest {
    return id
      ? {
          id: id,
          name: form.unitName,
          status: form.status
        }
      : {
          name: form.unitName,
          status: form.status
        };
  }

  public static mapUnitDataToFormModel(data: Unit): UnitFormModel {
    return {
      unitName: data.name,
      status: data.status
    };
  }
}

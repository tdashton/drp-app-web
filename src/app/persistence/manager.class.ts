import { EventEmitter } from "@angular/core";
import { ModelId } from "../models/model-id";
import { StorageAdapter } from "./storage-adapter.class";
import { TmplAstContent } from "@angular/compiler";

export interface HasId {
  id: ModelId;
}

export class Manager<TModel extends HasId> {

  protected models: TModel[] = [];
  protected modelsLoaded = false;

  public modelUpdated: EventEmitter<TModel> = new EventEmitter<TModel>;

  public constructor(
    protected storageAdapter: StorageAdapter,
    protected storageKey: string,
    protected factoryMethod: (object: Partial<TModel>) => TModel,
  ) {
    let data = this.storageAdapter.getItem(this.storageKey);

    let modelsData = [];

    if (data) {
      modelsData = JSON.parse(data);
    }

    if (!Array.isArray(modelsData)) {
      throw new Error('Models data is not an array');
    }

    this.models = modelsData.map(this.factoryMethod);
  }

  public getAll(): TModel[] {
    return this.models;
  }

  public insert(model: TModel) {
    const nextId = this.models
      .map((current: TModel): number => Number.parseInt(current.id))
      .reduce((previous: number, current: number) => {
        if (current > previous) {
          return current;
        }
        return previous;
      }, 0) + 1;

    console.log(`nextId: ${nextId}`);

    model.id = nextId.toString();

    this.models.push(model);
    this.modelUpdated.emit(model);
    this.persist();
  }

  public modify(id: string, model: TModel): void {
    const index = this.getIndexById(id);

    if (index === -1) {
      console.error('nothing found');
    }

    model.id = id;

    this.models[index] = model;
    this.modelUpdated.emit(model);
    this.persist();
  }

  public getById(id: String): TModel {
    const index = this.getIndexById(id);

    if (index === -1) {
      console.error('DB Object with given id not found', id, typeof id);
      console.log(this.storageKey, this.models);
    }

    return this.models[index];
  }

  public remove(id: ModelId): void {
    const index = this.getIndexById(id);

    if (index === -1) {
      console.error('DB Object with given id not found', id, typeof id);
      console.log(this.storageKey, this.models);
    }

    this.models.splice(index, 1);
    this.persist();
  }

  protected persist(): void {
    this.storageAdapter.setItem(this.storageKey, JSON.stringify(this.models));
    console.log(this.models);
  }

  protected getIndexById(id: String): number {
    return this.models.findIndex((value: TModel) => {
      return value.id === id;
    });
  }
}

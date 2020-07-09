export interface IController<Model, Input> {
    find(): Promise<Model[]>
    findOne(id: string): Promise<Model>
    create(input: Input): Object
}

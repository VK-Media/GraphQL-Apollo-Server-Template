export interface IController<Model, Input> {
    find(): Promise<Model[]>
    findOne(id: string): Promise<Model>
    create(input: Input): Object
}

export interface IParams {
    request: {
        headers: {
            authorization
        }
    }
    authRequired: boolean
}

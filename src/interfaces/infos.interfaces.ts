interface Infos{
    id: number
    developerSince: Date
    preferredOS: string
}

type TInfosRequest = Omit<Infos, "id">
type TInfosUpdate = Partial<TInfosRequest>

export  { Infos, TInfosRequest, TInfosUpdate }
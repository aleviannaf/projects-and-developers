interface Infos{
    id: number
    developerSince: Date 
    preferredOS: string
}

type TInfosRequest = Omit<Infos, "id">
type TInfosUpdate = Partial<TInfosRequest>
type TInfosRequiredKeyes = "developerSince" | "preferredOS"

export  { Infos, TInfosRequest, TInfosUpdate, TInfosRequiredKeyes }
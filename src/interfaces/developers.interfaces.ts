interface IDeveloper{
    id: number
    name: string
    email: string
    developerInfoId: number | null | undefined
}

type TDevelorRequest = Omit<IDeveloper, "id">
type TDeveloperUpdate = Partial<TDevelorRequest>

export  { IDeveloper, TDeveloperUpdate, TDevelorRequest }
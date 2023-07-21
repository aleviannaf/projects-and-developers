interface IDeveloper{
    id: number
    name: string
    email: string
    developerInfoId: number | null | undefined 
}

type TDevelorRequest = Omit<IDeveloper, "id">
type TDeveloperUpdate = Partial<TDevelorRequest>
type TDeveloperRequiredKeyes = "name" | "email"

export  { IDeveloper, TDeveloperUpdate, TDevelorRequest, TDeveloperRequiredKeyes }
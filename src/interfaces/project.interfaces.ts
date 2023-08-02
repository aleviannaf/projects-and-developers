interface IProject {
    id: number
    name: string
    description: string
    estimatedTime: string
    repository: string
    startDate: Date
    endDate?: Date | null 
    developerId: string
}

type TProjectRequest = Omit<IProject, "id">
type TProjectRequiredKeyes = "name" | "description" | "estimatedTime" | "repository" | "startDate"| "endDate" | "developerId"

export  { IProject, TProjectRequest, TProjectRequiredKeyes}
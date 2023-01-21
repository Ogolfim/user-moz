declare module 'tools' {
  export interface ToolsUserEntity {
    _id: any
    userId: string
    downloads: number
    active: boolean
    createdAt: string
    updateAt: string
  }

  export interface ToolsUser {
    id: string
    userId: string
    downloads: number
    active: boolean
    createdAt: string
    updateAt: string
  }
}

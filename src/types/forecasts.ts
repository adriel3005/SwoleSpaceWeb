export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      forecasts: {
        Row: {
          Date: string
          Summary: string | null
          TemperatureC: number | null
          TemperatureF: number | null
        }
        Insert: {
          Date?: string
          Summary?: string | null
          TemperatureC?: number | null
          TemperatureF?: number | null
        }
        Update: {
          Date?: string
          Summary?: string | null
          TemperatureC?: number | null
          TemperatureF?: number | null
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

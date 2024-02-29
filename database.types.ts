export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      campus: {
        Row: {
          campus_key: string
          city: string
          colony: string
          created_at: string
          id: number
          name: string
          phone: string
          postal_code: string
          rfc: string
          state: string
          street: string
          street_number: string
        }
        Insert: {
          campus_key: string
          city: string
          colony: string
          created_at?: string
          id?: number
          name: string
          phone: string
          postal_code: string
          rfc: string
          state: string
          street: string
          street_number: string
        }
        Update: {
          campus_key?: string
          city?: string
          colony?: string
          created_at?: string
          id?: number
          name?: string
          phone?: string
          postal_code?: string
          rfc?: string
          state?: string
          street?: string
          street_number?: string
        }
        Relationships: []
      }
      carreras: {
        Row: {
          campues: number
          created_at: string
          id: number
          is_active: boolean
          name: string
          rvoe: string
        }
        Insert: {
          campues: number
          created_at?: string
          id?: number
          is_active?: boolean
          name: string
          rvoe: string
        }
        Update: {
          campues?: number
          created_at?: string
          id?: number
          is_active?: boolean
          name?: string
          rvoe?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_carreras_campues_fkey"
            columns: ["campues"]
            isOneToOne: false
            referencedRelation: "campus"
            referencedColumns: ["id"]
          }
        ]
      }
      education_plans: {
        Row: {
          created_at: string
          id: number
          semester_quantity: number
        }
        Insert: {
          created_at?: string
          id?: number
          semester_quantity: number
        }
        Update: {
          created_at?: string
          id?: number
          semester_quantity?: number
        }
        Relationships: []
      }
      materias: {
        Row: {
          created_at: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      roles: {
        Row: {
          created_at: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          name: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      student_config: {
        Row: {
          created_at: string
          id: number
          owner: string
        }
        Insert: {
          created_at?: string
          id?: number
          owner: string
        }
        Update: {
          created_at?: string
          id?: number
          owner?: string
        }
        Relationships: [
          {
            foreignKeyName: "public_student_config_owner_fkey"
            columns: ["owner"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      user_data: {
        Row: {
          birthdate: string | null
          created_at: string
          email: string
          first_name: string
          id: number
          last_name: string
          owner: string | null
          phone: string
          role: number
        }
        Insert: {
          birthdate?: string | null
          created_at?: string
          email: string
          first_name: string
          id?: number
          last_name: string
          owner?: string | null
          phone: string
          role: number
        }
        Update: {
          birthdate?: string | null
          created_at?: string
          email?: string
          first_name?: string
          id?: number
          last_name?: string
          owner?: string | null
          phone?: string
          role?: number
        }
        Relationships: [
          {
            foreignKeyName: "public_user_data_owner_fkey"
            columns: ["owner"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "public_user_data_role_fkey"
            columns: ["role"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          }
        ]
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

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.15"
  }
  public: {
    Tables: {
      babies: {
        Row: {
          allergies: string
          birth_time: string
          birth_weight: number | null
          blood_group: string
          bmi: number | null
          created_at: string
          dob: string
          gender: string
          head_circumference: number | null
          height: number | null
          id: string
          name: string
          notes: string
          photo: string
          status: string
          updated_at: string
          user_id: string
          water_ml: number
          weight: number | null
        }
        Insert: {
          allergies?: string
          birth_time?: string
          birth_weight?: number | null
          blood_group?: string
          bmi?: number | null
          created_at?: string
          dob: string
          gender?: string
          head_circumference?: number | null
          height?: number | null
          id?: string
          name: string
          notes?: string
          photo?: string
          status?: string
          updated_at?: string
          user_id: string
          water_ml?: number
          weight?: number | null
        }
        Update: {
          allergies?: string
          birth_time?: string
          birth_weight?: number | null
          blood_group?: string
          bmi?: number | null
          created_at?: string
          dob?: string
          gender?: string
          head_circumference?: number | null
          height?: number | null
          id?: string
          name?: string
          notes?: string
          photo?: string
          status?: string
          updated_at?: string
          user_id?: string
          water_ml?: number
          weight?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "babies_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      favorite_recipes: {
        Row: {
          baby_id: string
          created_at: string
          id: string
          recipe_id: string
        }
        Insert: {
          baby_id: string
          created_at?: string
          id?: string
          recipe_id: string
        }
        Update: {
          baby_id?: string
          created_at?: string
          id?: string
          recipe_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "favorite_recipes_baby_id_fkey"
            columns: ["baby_id"]
            isOneToOne: false
            referencedRelation: "babies"
            referencedColumns: ["id"]
          },
        ]
      }
      growth_entries: {
        Row: {
          baby_id: string
          bmi: number | null
          created_at: string
          entry_date: string
          head_circ: number | null
          height: number
          id: string
          weight: number
        }
        Insert: {
          baby_id: string
          bmi?: number | null
          created_at?: string
          entry_date?: string
          head_circ?: number | null
          height: number
          id?: string
          weight: number
        }
        Update: {
          baby_id?: string
          bmi?: number | null
          created_at?: string
          entry_date?: string
          head_circ?: number | null
          height?: number
          id?: string
          weight?: number
        }
        Relationships: [
          {
            foreignKeyName: "growth_entries_baby_id_fkey"
            columns: ["baby_id"]
            isOneToOne: false
            referencedRelation: "babies"
            referencedColumns: ["id"]
          },
        ]
      }
      meals: {
        Row: {
          baby_id: string
          completed: boolean
          created_at: string
          favorite: boolean
          id: string
          recipe_id: string
          scheduled_date: string
          skipped: boolean
          slot: string
          time: string
        }
        Insert: {
          baby_id: string
          completed?: boolean
          created_at?: string
          favorite?: boolean
          id?: string
          recipe_id: string
          scheduled_date?: string
          skipped?: boolean
          slot: string
          time?: string
        }
        Update: {
          baby_id?: string
          completed?: boolean
          created_at?: string
          favorite?: boolean
          id?: string
          recipe_id?: string
          scheduled_date?: string
          skipped?: boolean
          slot?: string
          time?: string
        }
        Relationships: [
          {
            foreignKeyName: "meals_baby_id_fkey"
            columns: ["baby_id"]
            isOneToOne: false
            referencedRelation: "babies"
            referencedColumns: ["id"]
          },
        ]
      }
      milestones: {
        Row: {
          age_label: string
          baby_id: string
          created_at: string
          done: boolean
          emoji: string
          id: string
          sort: number
          title: string
          updated_at: string
        }
        Insert: {
          age_label?: string
          baby_id: string
          created_at?: string
          done?: boolean
          emoji?: string
          id?: string
          sort?: number
          title: string
          updated_at?: string
        }
        Update: {
          age_label?: string
          baby_id?: string
          created_at?: string
          done?: boolean
          emoji?: string
          id?: string
          sort?: number
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "milestones_baby_id_fkey"
            columns: ["baby_id"]
            isOneToOne: false
            referencedRelation: "babies"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          active_baby_id: string | null
          address: string
          age: number | null
          created_at: string
          email: string
          id: string
          mobile: string
          name: string
          occupation: string
          photo: string
          relationship: string
          role: string
          updated_at: string
        }
        Insert: {
          active_baby_id?: string | null
          address?: string
          age?: number | null
          created_at?: string
          email?: string
          id: string
          mobile?: string
          name?: string
          occupation?: string
          photo?: string
          relationship?: string
          role?: string
          updated_at?: string
        }
        Update: {
          active_baby_id?: string | null
          address?: string
          age?: number | null
          created_at?: string
          email?: string
          id?: string
          mobile?: string
          name?: string
          occupation?: string
          photo?: string
          relationship?: string
          role?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_active_baby_fk"
            columns: ["active_baby_id"]
            isOneToOne: false
            referencedRelation: "babies"
            referencedColumns: ["id"]
          },
        ]
      }
      vaccines: {
        Row: {
          age_label: string
          age_months: number
          baby_id: string
          completed: boolean
          completed_date: string | null
          created_at: string
          dose: string
          due_date: string | null
          id: string
          name: string
          protects: string
          sort: number
        }
        Insert: {
          age_label?: string
          age_months?: number
          baby_id: string
          completed?: boolean
          completed_date?: string | null
          created_at?: string
          dose?: string
          due_date?: string | null
          id?: string
          name: string
          protects?: string
          sort?: number
        }
        Update: {
          age_label?: string
          age_months?: number
          baby_id?: string
          completed?: boolean
          completed_date?: string | null
          created_at?: string
          dose?: string
          due_date?: string | null
          id?: string
          name?: string
          protects?: string
          sort?: number
        }
        Relationships: [
          {
            foreignKeyName: "vaccines_baby_id_fkey"
            columns: ["baby_id"]
            isOneToOne: false
            referencedRelation: "babies"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_baby_access: {
        Args: { _baby_id: string; _user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

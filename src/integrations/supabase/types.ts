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
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      admin_allowlist: {
        Row: {
          created_at: string
          created_by: string | null
          email: string
          id: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          email: string
          id?: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          email?: string
          id?: string
        }
        Relationships: []
      }
      articles: {
        Row: {
          created_at: string
          excerpt: string
          excerpt_en: string | null
          id: string
          image_url: string | null
          is_published: boolean
          slug: string
          title: string
          title_en: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          excerpt: string
          excerpt_en?: string | null
          id?: string
          image_url?: string | null
          is_published?: boolean
          slug: string
          title: string
          title_en?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          excerpt?: string
          excerpt_en?: string | null
          id?: string
          image_url?: string | null
          is_published?: boolean
          slug?: string
          title?: string
          title_en?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      cafes: {
        Row: {
          created_at: string | null
          created_by: string | null
          fee_payer: string | null
          fee_type: Database["public"]["Enums"]["fee_type"] | null
          fee_value: number | null
          id: string
          min_payout: number | null
          name: string
          payout_interval: string | null
          slug: string
          subscription: Database["public"]["Enums"]["subscription_plan"] | null
          updated_at: string | null
          updated_by: string | null
          whatsapp_number: string
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          fee_payer?: string | null
          fee_type?: Database["public"]["Enums"]["fee_type"] | null
          fee_value?: number | null
          id?: string
          min_payout?: number | null
          name: string
          payout_interval?: string | null
          slug: string
          subscription?: Database["public"]["Enums"]["subscription_plan"] | null
          updated_at?: string | null
          updated_by?: string | null
          whatsapp_number: string
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          fee_payer?: string | null
          fee_type?: Database["public"]["Enums"]["fee_type"] | null
          fee_value?: number | null
          id?: string
          min_payout?: number | null
          name?: string
          payout_interval?: string | null
          slug?: string
          subscription?: Database["public"]["Enums"]["subscription_plan"] | null
          updated_at?: string | null
          updated_by?: string | null
          whatsapp_number?: string
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          created_at: string
          email: string
          id: string
          is_read: boolean
          message: string
          name: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          is_read?: boolean
          message: string
          name: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          is_read?: boolean
          message?: string
          name?: string
        }
        Relationships: []
      }
      features: {
        Row: {
          created_at: string
          description: string
          description_en: string | null
          icon_name: string
          id: string
          is_active: boolean
          order_index: number
          title: string
          title_en: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          description_en?: string | null
          icon_name: string
          id?: string
          is_active?: boolean
          order_index?: number
          title: string
          title_en?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          description_en?: string | null
          icon_name?: string
          id?: string
          is_active?: boolean
          order_index?: number
          title?: string
          title_en?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      hijaiyah_letters: {
        Row: {
          audio_url: string | null
          created_at: string
          id: string
          letter: string
          name_en: string | null
          name_id: string
          order_index: number
          updated_at: string
        }
        Insert: {
          audio_url?: string | null
          created_at?: string
          id?: string
          letter: string
          name_en?: string | null
          name_id: string
          order_index: number
          updated_at?: string
        }
        Update: {
          audio_url?: string | null
          created_at?: string
          id?: string
          letter?: string
          name_en?: string | null
          name_id?: string
          order_index?: number
          updated_at?: string
        }
        Relationships: []
      }
      metrics: {
        Row: {
          created_at: string
          id: string
          key: string
          updated_at: string
          value: number
        }
        Insert: {
          created_at?: string
          id?: string
          key: string
          updated_at?: string
          value?: number
        }
        Update: {
          created_at?: string
          id?: string
          key?: string
          updated_at?: string
          value?: number
        }
        Relationships: []
      }
      modules: {
        Row: {
          created_at: string
          description: string
          description_en: string | null
          icon_name: string
          id: string
          is_active: boolean
          order_index: number
          title: string
          title_en: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          description_en?: string | null
          icon_name: string
          id?: string
          is_active?: boolean
          order_index?: number
          title: string
          title_en?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          description_en?: string | null
          icon_name?: string
          id?: string
          is_active?: boolean
          order_index?: number
          title?: string
          title_en?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      order_items: {
        Row: {
          created_by: string | null
          id: string
          order_id: string
          price: number
          product_id: string
          quantity: number
          updated_by: string | null
        }
        Insert: {
          created_by?: string | null
          id?: string
          order_id: string
          price: number
          product_id: string
          quantity: number
          updated_by?: string | null
        }
        Update: {
          created_by?: string | null
          id?: string
          order_id?: string
          price?: number
          product_id?: string
          quantity?: number
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "order_items_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      orders: {
        Row: {
          cafe_id: string
          code: string
          created_at: string | null
          created_by: string | null
          customer_name: string | null
          customer_note: string | null
          fee_amount: number
          fee_payer_snapshot: string
          fee_rate_snapshot: number
          fee_type_snapshot: string
          fee_wallet_tx_id: string | null
          final_amount: number
          id: string
          status: Database["public"]["Enums"]["order_status"] | null
          total_amount: number
          updated_at: string | null
          updated_by: string | null
          user_phone: string
        }
        Insert: {
          cafe_id: string
          code: string
          created_at?: string | null
          created_by?: string | null
          customer_name?: string | null
          customer_note?: string | null
          fee_amount: number
          fee_payer_snapshot: string
          fee_rate_snapshot: number
          fee_type_snapshot: string
          fee_wallet_tx_id?: string | null
          final_amount: number
          id?: string
          status?: Database["public"]["Enums"]["order_status"] | null
          total_amount: number
          updated_at?: string | null
          updated_by?: string | null
          user_phone: string
        }
        Update: {
          cafe_id?: string
          code?: string
          created_at?: string | null
          created_by?: string | null
          customer_name?: string | null
          customer_note?: string | null
          fee_amount?: number
          fee_payer_snapshot?: string
          fee_rate_snapshot?: number
          fee_type_snapshot?: string
          fee_wallet_tx_id?: string | null
          final_amount?: number
          id?: string
          status?: Database["public"]["Enums"]["order_status"] | null
          total_amount?: number
          updated_at?: string | null
          updated_by?: string | null
          user_phone?: string
        }
        Relationships: [
          {
            foreignKeyName: "orders_cafe_id_fkey"
            columns: ["cafe_id"]
            isOneToOne: false
            referencedRelation: "cafes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "orders_fee_wallet_tx_id_fkey"
            columns: ["fee_wallet_tx_id"]
            isOneToOne: false
            referencedRelation: "wallet_transactions"
            referencedColumns: ["id"]
          },
        ]
      }
      payments: {
        Row: {
          created_at: string | null
          created_by: string | null
          id: string
          method: string | null
          order_id: string
          paid_at: string | null
          qr_url: string | null
          snap_token: string | null
          snap_url: string | null
          status: Database["public"]["Enums"]["payment_status"] | null
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          method?: string | null
          order_id: string
          paid_at?: string | null
          qr_url?: string | null
          snap_token?: string | null
          snap_url?: string | null
          status?: Database["public"]["Enums"]["payment_status"] | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          id?: string
          method?: string | null
          order_id?: string
          paid_at?: string | null
          qr_url?: string | null
          snap_token?: string | null
          snap_url?: string | null
          status?: Database["public"]["Enums"]["payment_status"] | null
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payments_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "orders"
            referencedColumns: ["id"]
          },
        ]
      }
      payouts: {
        Row: {
          cafe_id: string
          created_by: string | null
          id: string
          paid_at: string | null
          period: string
          requested_at: string | null
          status: Database["public"]["Enums"]["payout_status"] | null
          total_fee: number
          total_order: number
          total_payout: number
          updated_by: string | null
        }
        Insert: {
          cafe_id: string
          created_by?: string | null
          id?: string
          paid_at?: string | null
          period: string
          requested_at?: string | null
          status?: Database["public"]["Enums"]["payout_status"] | null
          total_fee: number
          total_order: number
          total_payout: number
          updated_by?: string | null
        }
        Update: {
          cafe_id?: string
          created_by?: string | null
          id?: string
          paid_at?: string | null
          period?: string
          requested_at?: string | null
          status?: Database["public"]["Enums"]["payout_status"] | null
          total_fee?: number
          total_order?: number
          total_payout?: number
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "payouts_cafe_id_fkey"
            columns: ["cafe_id"]
            isOneToOne: false
            referencedRelation: "cafes"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          cafe_id: string
          created_at: string | null
          created_by: string | null
          id: string
          image_url: string | null
          is_active: boolean | null
          name: string
          price: number
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          cafe_id: string
          created_at?: string | null
          created_by?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name: string
          price: number
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          cafe_id?: string
          created_at?: string | null
          created_by?: string | null
          id?: string
          image_url?: string | null
          is_active?: boolean | null
          name?: string
          price?: number
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "products_cafe_id_fkey"
            columns: ["cafe_id"]
            isOneToOne: false
            referencedRelation: "cafes"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          cafe_id: string | null
          created_at: string | null
          email: string
          id: string
          name: string
          phone: string | null
          role: Database["public"]["Enums"]["role"] | null
          updated_at: string | null
        }
        Insert: {
          cafe_id?: string | null
          created_at?: string | null
          email: string
          id: string
          name: string
          phone?: string | null
          role?: Database["public"]["Enums"]["role"] | null
          updated_at?: string | null
        }
        Update: {
          cafe_id?: string | null
          created_at?: string | null
          email?: string
          id?: string
          name?: string
          phone?: string | null
          role?: Database["public"]["Enums"]["role"] | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_cafe_id_fkey"
            columns: ["cafe_id"]
            isOneToOne: false
            referencedRelation: "cafes"
            referencedColumns: ["id"]
          },
        ]
      }
      settings: {
        Row: {
          add_staff_fee_coins: number
          coin_value_idr: number
          created_at: string
          created_by: string | null
          flat_fee_max: number
          flat_fee_min: number
          id: string
          new_user_bonus_coins: number
          percent_fee_max: number
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          add_staff_fee_coins?: number
          coin_value_idr?: number
          created_at?: string
          created_by?: string | null
          flat_fee_max?: number
          flat_fee_min?: number
          id?: string
          new_user_bonus_coins?: number
          percent_fee_max?: number
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          add_staff_fee_coins?: number
          coin_value_idr?: number
          created_at?: string
          created_by?: string | null
          flat_fee_max?: number
          flat_fee_min?: number
          id?: string
          new_user_bonus_coins?: number
          percent_fee_max?: number
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: []
      }
      subscribers: {
        Row: {
          created_at: string
          email: string
          id: string
          is_active: boolean
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          is_active?: boolean
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          is_active?: boolean
        }
        Relationships: []
      }
      tajwid_rules: {
        Row: {
          created_at: string
          description: string
          description_en: string | null
          example_arabic: string | null
          example_transliteration: string | null
          id: string
          name: string
          name_en: string | null
          order_index: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          description_en?: string | null
          example_arabic?: string | null
          example_transliteration?: string | null
          id?: string
          name: string
          name_en?: string | null
          order_index?: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          description_en?: string | null
          example_arabic?: string | null
          example_transliteration?: string | null
          id?: string
          name?: string
          name_en?: string | null
          order_index?: number
          updated_at?: string
        }
        Relationships: []
      }
      transaction_logs: {
        Row: {
          action: string
          actor: string
          created_at: string | null
          data: Json
          id: string
          model: string
        }
        Insert: {
          action: string
          actor: string
          created_at?: string | null
          data: Json
          id?: string
          model: string
        }
        Update: {
          action?: string
          actor?: string
          created_at?: string | null
          data?: Json
          id?: string
          model?: string
        }
        Relationships: []
      }
      value_pillars: {
        Row: {
          created_at: string
          description: string
          description_en: string | null
          id: string
          number: string
          order_index: number
          title: string
          title_en: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description: string
          description_en?: string | null
          id?: string
          number: string
          order_index?: number
          title: string
          title_en?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string
          description_en?: string | null
          id?: string
          number?: string
          order_index?: number
          title?: string
          title_en?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      wallet_transactions: {
        Row: {
          amount_coins: number
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          ref_id: string | null
          ref_type: Database["public"]["Enums"]["wallet_transaction_ref_type"]
          transaction_type: Database["public"]["Enums"]["wallet_transaction_type"]
          wallet_id: string
        }
        Insert: {
          amount_coins: number
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          ref_id?: string | null
          ref_type: Database["public"]["Enums"]["wallet_transaction_ref_type"]
          transaction_type: Database["public"]["Enums"]["wallet_transaction_type"]
          wallet_id: string
        }
        Update: {
          amount_coins?: number
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          ref_id?: string | null
          ref_type?: Database["public"]["Enums"]["wallet_transaction_ref_type"]
          transaction_type?: Database["public"]["Enums"]["wallet_transaction_type"]
          wallet_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "wallet_transactions_wallet_id_fkey"
            columns: ["wallet_id"]
            isOneToOne: false
            referencedRelation: "wallets"
            referencedColumns: ["id"]
          },
        ]
      }
      wallets: {
        Row: {
          balance_coins: number
          created_at: string
          created_by: string | null
          id: string
          owner_cafe_id: string | null
          owner_type: Database["public"]["Enums"]["wallet_owner_type"]
          owner_user_id: string | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          balance_coins?: number
          created_at?: string
          created_by?: string | null
          id?: string
          owner_cafe_id?: string | null
          owner_type: Database["public"]["Enums"]["wallet_owner_type"]
          owner_user_id?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          balance_coins?: number
          created_at?: string
          created_by?: string | null
          id?: string
          owner_cafe_id?: string | null
          owner_type?: Database["public"]["Enums"]["wallet_owner_type"]
          owner_user_id?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "wallets_owner_cafe_id_fkey"
            columns: ["owner_cafe_id"]
            isOneToOne: false
            referencedRelation: "cafes"
            referencedColumns: ["id"]
          },
        ]
      }
      webhook_logs: {
        Row: {
          created_at: string | null
          id: string
          payload: Json
          type: Database["public"]["Enums"]["webhook_type"]
        }
        Insert: {
          created_at?: string | null
          id?: string
          payload: Json
          type: Database["public"]["Enums"]["webhook_type"]
        }
        Update: {
          created_at?: string | null
          id?: string
          payload?: Json
          type?: Database["public"]["Enums"]["webhook_type"]
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_admin_create_cafe: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
      can_assign_user_to_cafe: {
        Args: {
          target_cafe_id: string
          target_role: string
          target_user_id: string
        }
        Returns: boolean
      }
      get_current_user_cafe_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_current_user_role: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      is_admin_of_cafe: {
        Args: { target_cafe_id: string }
        Returns: boolean
      }
      is_admin_user: {
        Args: { email_to_check: string }
        Returns: boolean
      }
      is_superadmin: {
        Args: Record<PropertyKey, never>
        Returns: boolean
      }
    }
    Enums: {
      fee_type: "FLAT" | "PERCENT"
      order_status: "PENDING" | "PAID" | "CANCELLED" | "DONE"
      payment_status: "PENDING" | "PAID" | "FAILED"
      payout_status: "PENDING" | "COMPLETED" | "FAILED"
      role: "SUPERADMIN" | "ADMIN" | "CASHIER" | "USER"
      subscription_plan: "FREE" | "PREMIUM" | "PRO"
      wallet_owner_type: "USER" | "CAFE"
      wallet_transaction_ref_type:
        | "SIGNUP_BONUS"
        | "STAFF_ADD_FEE"
        | "ORDER_FEE"
        | "REFUND_ORDER"
        | "TOPUP"
      wallet_transaction_type: "CREDIT" | "DEBIT" | "REFUND"
      webhook_type: "WHATSAPP" | "MIDTRANS"
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
    Enums: {
      fee_type: ["FLAT", "PERCENT"],
      order_status: ["PENDING", "PAID", "CANCELLED", "DONE"],
      payment_status: ["PENDING", "PAID", "FAILED"],
      payout_status: ["PENDING", "COMPLETED", "FAILED"],
      role: ["SUPERADMIN", "ADMIN", "CASHIER", "USER"],
      subscription_plan: ["FREE", "PREMIUM", "PRO"],
      wallet_owner_type: ["USER", "CAFE"],
      wallet_transaction_ref_type: [
        "SIGNUP_BONUS",
        "STAFF_ADD_FEE",
        "ORDER_FEE",
        "REFUND_ORDER",
        "TOPUP",
      ],
      wallet_transaction_type: ["CREDIT", "DEBIT", "REFUND"],
      webhook_type: ["WHATSAPP", "MIDTRANS"],
    },
  },
} as const

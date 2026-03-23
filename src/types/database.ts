export type Database = {
  public: {
    Tables: {
      properties: {
        Row: {
          id: string;
          slug: string;
          address: string;
          city: string;
          state: string;
          zip: string;
          neighborhood: string;
          price: number;
          beds: number;
          baths: number;
          sqft: number;
          lot_sqft: number;
          year_built: number | null;
          status: string;
          property_type: string;
          images: string[];
          description: string;
          features_interior: string[];
          features_exterior: string[];
          features_community: string[];
          listing_agent_id: string | null;
          lat: number | null;
          lng: number | null;
          open_house: string | null;
          video_url: string | null;
          virtual_tour_url: string | null;
          hoa_fee: number | null;
          hoa_frequency: string | null;
          has_hoa: boolean | null;
          featured: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          address: string;
          city?: string;
          state?: string;
          zip: string;
          neighborhood: string;
          price: number;
          beds: number;
          baths: number;
          sqft: number;
          lot_sqft?: number;
          year_built?: number | null;
          status?: string;
          property_type: string;
          images?: string[];
          description: string;
          features_interior?: string[];
          features_exterior?: string[];
          features_community?: string[];
          listing_agent_id?: string | null;
          lat?: number | null;
          lng?: number | null;
          open_house?: string | null;
          video_url?: string | null;
          virtual_tour_url?: string | null;
          hoa_fee?: number | null;
          hoa_frequency?: string | null;
          has_hoa?: boolean | null;
          featured?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          address?: string;
          city?: string;
          state?: string;
          zip?: string;
          neighborhood?: string;
          price?: number;
          beds?: number;
          baths?: number;
          sqft?: number;
          lot_sqft?: number;
          year_built?: number | null;
          status?: string;
          property_type?: string;
          images?: string[];
          description?: string;
          features_interior?: string[];
          features_exterior?: string[];
          features_community?: string[];
          listing_agent_id?: string | null;
          lat?: number | null;
          lng?: number | null;
          open_house?: string | null;
          video_url?: string | null;
          virtual_tour_url?: string | null;
          hoa_fee?: number | null;
          hoa_frequency?: string | null;
          has_hoa?: boolean | null;
          featured?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "properties_listing_agent_id_fkey";
            columns: ["listing_agent_id"];
            isOneToOne: false;
            referencedRelation: "agents";
            referencedColumns: ["id"];
          },
        ];
      };
      agents: {
        Row: {
          id: string;
          slug: string;
          first_name: string;
          last_name: string;
          full_name: string;
          title: string;
          email: string;
          phone: string;
          photo: string | null;
          bio: string | null;
          short_bio: string | null;
          specialties: string[];
          neighborhoods: string[];
          stats: Record<string, unknown>;
          awards: Record<string, unknown>[];
          video_intro_url: string | null;
          social: Record<string, unknown>;
          languages: string[];
          license_number: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          first_name: string;
          last_name: string;
          title: string;
          email: string;
          phone: string;
          photo?: string | null;
          bio?: string | null;
          short_bio?: string | null;
          specialties?: string[];
          neighborhoods?: string[];
          stats?: Record<string, unknown>;
          awards?: Record<string, unknown>[];
          video_intro_url?: string | null;
          social?: Record<string, unknown>;
          languages?: string[];
          license_number?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          first_name?: string;
          last_name?: string;
          title?: string;
          email?: string;
          phone?: string;
          photo?: string | null;
          bio?: string | null;
          short_bio?: string | null;
          specialties?: string[];
          neighborhoods?: string[];
          stats?: Record<string, unknown>;
          awards?: Record<string, unknown>[];
          video_intro_url?: string | null;
          social?: Record<string, unknown>;
          languages?: string[];
          license_number?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      neighborhoods: {
        Row: {
          id: string;
          slug: string;
          name: string;
          tagline: string | null;
          description: string | null;
          selling_points: string[];
          lifestyle: Record<string, unknown>;
          stats: Record<string, unknown>;
          image: string | null;
          card_image: string | null;
          map_center: Record<string, unknown> | null;
          property_filter: string | null;
          featured: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          slug: string;
          name: string;
          tagline?: string | null;
          description?: string | null;
          selling_points?: string[];
          lifestyle?: Record<string, unknown>;
          stats?: Record<string, unknown>;
          image?: string | null;
          card_image?: string | null;
          map_center?: Record<string, unknown> | null;
          property_filter?: string | null;
          featured?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          slug?: string;
          name?: string;
          tagline?: string | null;
          description?: string | null;
          selling_points?: string[];
          lifestyle?: Record<string, unknown>;
          stats?: Record<string, unknown>;
          image?: string | null;
          card_image?: string | null;
          map_center?: Record<string, unknown> | null;
          property_filter?: string | null;
          featured?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      leads: {
        Row: {
          id: string;
          type: string;
          first_name: string;
          last_name: string;
          email: string;
          phone: string;
          message: string | null;
          property_id: string | null;
          agent_id: string | null;
          status: string;
          metadata: Record<string, unknown>;
          ghl_synced: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          type: string;
          first_name: string;
          last_name: string;
          email: string;
          phone: string;
          message?: string | null;
          property_id?: string | null;
          agent_id?: string | null;
          status?: string;
          metadata?: Record<string, unknown>;
          ghl_synced?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          type?: string;
          first_name?: string;
          last_name?: string;
          email?: string;
          phone?: string;
          message?: string | null;
          property_id?: string | null;
          agent_id?: string | null;
          status?: string;
          metadata?: Record<string, unknown>;
          ghl_synced?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "leads_property_id_fkey";
            columns: ["property_id"];
            isOneToOne: false;
            referencedRelation: "properties";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "leads_agent_id_fkey";
            columns: ["agent_id"];
            isOneToOne: false;
            referencedRelation: "agents";
            referencedColumns: ["id"];
          },
        ];
      };
      testimonials: {
        Row: {
          id: string;
          quote: string;
          name: string;
          role: string | null;
          rating: number;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          quote: string;
          name: string;
          role?: string | null;
          rating?: number;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          quote?: string;
          name?: string;
          role?: string | null;
          rating?: number;
          sort_order?: number;
          created_at?: string;
        };
        Relationships: [];
      };
      faq: {
        Row: {
          id: string;
          question: string;
          answer: string;
          category: string;
          sort_order: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          question: string;
          answer: string;
          category?: string;
          sort_order?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          question?: string;
          answer?: string;
          category?: string;
          sort_order?: number;
          created_at?: string;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string;
          role: Database["public"]["Enums"]["user_role"];
          agent_id: string | null;
          avatar_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name: string;
          role?: Database["public"]["Enums"]["user_role"];
          agent_id?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string;
          role?: Database["public"]["Enums"]["user_role"];
          agent_id?: string | null;
          avatar_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "profiles_agent_id_fkey";
            columns: ["agent_id"];
            isOneToOne: true;
            referencedRelation: "agents";
            referencedColumns: ["id"];
          },
        ];
      };
      newsletter_subscribers: {
        Row: {
          id: string;
          email: string;
          first_name: string | null;
          interests: string[] | null;
          source: string | null;
          confirmed: boolean;
          confirmed_at: string | null;
          confirm_token: string | null;
          unsubscribe_token: string;
          unsubscribed_at: string | null;
          ghl_synced: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          first_name?: string | null;
          interests?: string[] | null;
          source?: string | null;
          confirmed?: boolean;
          confirmed_at?: string | null;
          confirm_token?: string | null;
          unsubscribe_token?: string;
          unsubscribed_at?: string | null;
          ghl_synced?: boolean;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          first_name?: string | null;
          interests?: string[] | null;
          source?: string | null;
          confirmed?: boolean;
          confirmed_at?: string | null;
          confirm_token?: string | null;
          unsubscribe_token?: string;
          unsubscribed_at?: string | null;
          ghl_synced?: boolean;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      user_role: "admin" | "agent" | "viewer";
    };
    CompositeTypes: Record<string, never>;
  };
};

export type PropertyRow = Database["public"]["Tables"]["properties"]["Row"];
export type AgentRow = Database["public"]["Tables"]["agents"]["Row"];
export type NeighborhoodRow = Database["public"]["Tables"]["neighborhoods"]["Row"];
export type LeadRow = Database["public"]["Tables"]["leads"]["Row"];
export type TestimonialRow = Database["public"]["Tables"]["testimonials"]["Row"];
export type FaqRow = Database["public"]["Tables"]["faq"]["Row"];
export type ProfileRow = Database["public"]["Tables"]["profiles"]["Row"];
export type UserRole = Database["public"]["Enums"]["user_role"];

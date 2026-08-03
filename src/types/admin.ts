export interface AdminProfile {
  user_id: string;
  display_name: string;
}

export interface RSVPResponse {
  id: string;
  full_name: string;
  phone: string;
  email: string | null;
  guest_count: number;
  dietary_restrictions: string | null;
  message: string | null;
  message_public: boolean;
  message_approved: boolean;
  created_at: string;
}

export type AdminView = "overview" | "confirmations" | "messages";

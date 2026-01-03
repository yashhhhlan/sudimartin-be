/**
 * User Type Definition
 */
export interface User {
  id: string;
  namaDepan: string;
  namaBelakang: string;
  gender: "Pria" | "Wanita";
  wafat: boolean;
  photoUrl?: string;
  tanggalLahir?: string; // DD-MM-YYYY
  tanggalMenikah?: string; // DD-MM-YYYY
  tanggalWafat?: string; // DD-MM-YYYY
  isRoot?: boolean;
  menikah: boolean;
  alamat?: string;
  tempatLahir?: string;
  pekerjaan?: string;
  pasanganId?: string;
  ayahId?: string;
  ibuId?: string;
  anak: string[]; // Array of user IDs
  umur?: number;
  generasi?: number;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * User Relasi (Relations)
 */
export interface UserRelasi {
  ayah?: User;
  ibu?: User;
  pasangan?: User;
  anak: User[];
  saudara: User[];
}

/**
 * API Response Format
 */
export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: Array<{
    field: string;
    message: string;
  }>;
}

/**
 * Form Data untuk create/update user
 */
export interface UserFormData {
  namaDepan: string;
  namaBelakang?: string;
  gender?: "Pria" | "Wanita";
  wafat?: boolean;
  photoUrl?: string;
  tanggalLahir?: string;
  tanggalMenikah?: string;
  tanggalWafat?: string;
  isRoot?: boolean;
  menikah?: boolean;
  alamat?: string;
  tempatLahir?: string;
  pekerjaan?: string;
  pasanganId?: string;
  ayahId?: string;
  ibuId?: string;
  anak?: string[];
}

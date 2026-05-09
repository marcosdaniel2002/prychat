export {};

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        nombres: string;
        apellidos: string;
        email: string;
        username: string;
        password: string;
        imagen: string | null;
        estado_user: 'online' | 'offline' | 'away' | 'busy';
        biografia: string | null;
        createdAt: Date;
        updatedAt: Date | null;
        status: boolean;
      };
      currentFiles?: Record<string, string | null>;
      fileResult?: Record<string, string | null>;
    }
  }
}

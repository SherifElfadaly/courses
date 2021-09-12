import { registerAs } from "@nestjs/config";

export default registerAs('auth', () => ({
    secret: process.env.AUTH_SECRET || '',
    signOptions: {
        expiresIn: process.env.AUTH_EXPIRES_IN + 's' || '60s',
    }
}))
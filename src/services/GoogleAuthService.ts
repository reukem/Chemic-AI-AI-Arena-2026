export interface GoogleUserProfile {
    name: string;
    email: string;
    picture: string;
    sub?: string;
    isGoogleConnected: boolean;
    connectedAt?: string;
    workspaceTier?: 'Free Student' | 'Google Scholar' | 'AI Riser Builder';
}

const STORAGE_KEY = 'chemic_ai_google_user';

export class GoogleAuthService {
    public static getUser(): GoogleUserProfile {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            if (saved) {
                return JSON.parse(saved);
            }
        } catch (e) {
            console.warn('Failed to load saved Google user:', e);
        }

        // Default Guest Student Profile
        return {
            name: 'Guest Scholar',
            email: 'student@google.airiser.vn',
            picture: 'https://api.dicebear.com/7.x/bottts/svg?seed=ChemicAI',
            isGoogleConnected: false,
            workspaceTier: 'Free Student'
        };
    }

    public static saveUser(user: GoogleUserProfile): void {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
        } catch (e) {
            console.warn('Failed to save Google user:', e);
        }
    }

    public static signInWithGoogleMock(customName?: string, customEmail?: string): GoogleUserProfile {
        const user: GoogleUserProfile = {
            name: customName || 'Google AI Builder',
            email: customEmail || 'developer@google.workspace.com',
            picture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=GoogleScholar&accessories=kurt&clothingColor=26a69a',
            isGoogleConnected: true,
            connectedAt: new Date().toISOString(),
            workspaceTier: 'Google Scholar'
        };
        this.saveUser(user);
        return user;
    }

    public static signOut(): GoogleUserProfile {
        localStorage.removeItem(STORAGE_KEY);
        return this.getUser();
    }
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAtomValue, useSetAtom } from "jotai";
import { authAtom, clearToken } from "@/stores/authAtom";
import { extractInviteToken } from "@/lib/invite";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LogOut, Video } from "lucide-react";

export default function CandidateHomePage() {
    const { email } = useAtomValue(authAtom);
    const setAuth = useSetAtom(authAtom);
    const navigate = useNavigate();
    const [invite, setInvite] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleOpen = (e: React.FormEvent) => {
        e.preventDefault();
        const token = extractInviteToken(invite);
        if (!token) {
            setError("Paste your interview link to continue.");
            return;
        }
        setError(null);
        navigate(`/interview/${token}`);
    };

    const handleLogout = () => {
        clearToken();
        setAuth({ token: null, role: null, email: null });
        navigate("/login");
    };

    return (
        <div className="flex-1 flex items-start justify-center px-4 py-12">
            <div className="w-full max-w-md space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Video className="h-5 w-5 text-primary" />
                        <h1 className="text-lg font-semibold">Your interview</h1>
                    </div>
                    <Button variant="ghost" size="sm" onClick={handleLogout}>
                        <LogOut className="h-4 w-4 mr-1.5" />
                        Logout
                    </Button>
                </div>

                <p className="text-sm text-muted-foreground">
                    Open the interview link from your invitation email to start. You can paste
                    the whole link here, or just the code at the end of it.
                </p>

                <form onSubmit={handleOpen} className="space-y-4">
                    <div className="space-y-1.5">
                        <Label htmlFor="invite">Interview link</Label>
                        <Input
                            id="invite"
                            placeholder="…/interview/abc123"
                            value={invite}
                            onChange={(e) => setInvite(e.target.value)}
                            required
                        />
                    </div>

                    {error && <p className="text-sm text-destructive">{error}</p>}

                    <Button type="submit" className="w-full">
                        Open interview
                    </Button>
                </form>

                {email && (
                    <p className="text-xs text-muted-foreground text-center">
                        Signed in as {email}
                    </p>
                )}
            </div>
        </div>
    );
}

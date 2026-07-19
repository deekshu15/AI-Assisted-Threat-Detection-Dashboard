import { FormEvent, useEffect, useState } from "react";
import { Alert, Box, Button, CircularProgress, Stack, TextField, Typography } from "@mui/material";

import { authService } from "../auth/authService";
import GlassSurface from "../components/ui/GlassSurface";
import { PageHeader } from "../components/ui/PageHeader";

type Profile = {
  name: string;
  email: string;
};

const emptyProfile: Profile = { name: "", email: "" };

function ProfilePage() {
  const [profile, setProfile] = useState<Profile>(emptyProfile);
  const [savedProfile, setSavedProfile] = useState<Profile>(emptyProfile);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [awaitingEmailVerification, setAwaitingEmailVerification] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    authService.getProfile()
      .then((currentProfile) => {
        setProfile(currentProfile);
        setSavedProfile(currentProfile);
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Unable to load your profile."))
      .finally(() => setLoading(false));
  }, []);

  const handleSave = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    setSaving(true);

    try {
      const updatedProfile = { name: profile.name.trim(), email: profile.email.trim() };
      const result = await authService.updateProfile(updatedProfile.name, updatedProfile.email);
      setProfile(updatedProfile);

      if (result.emailUpdateRequired) {
        setAwaitingEmailVerification(true);
        setSuccess("We sent a verification code to your new email address.");
      } else {
        setSavedProfile(updatedProfile);
        window.dispatchEvent(new Event("profile-updated"));
        setSuccess("Your profile has been saved.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to save your profile.");
    } finally {
      setSaving(false);
    }
  };

  const handleConfirmEmail = async (event: FormEvent) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    setSaving(true);

    try {
      await authService.confirmEmailUpdate(verificationCode.trim());
      const confirmedProfile = await authService.getProfile();
      setProfile(confirmedProfile);
      setSavedProfile(confirmedProfile);
      setAwaitingEmailVerification(false);
      setVerificationCode("");
      window.dispatchEvent(new Event("profile-updated"));
      setSuccess("Your new email address has been verified and saved.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "The verification code could not be confirmed.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Box sx={{ display: "grid", placeItems: "center", minHeight: 240 }}><CircularProgress /></Box>;
  }

  const hasChanges = profile.name.trim() !== savedProfile.name || profile.email.trim() !== savedProfile.email;

  return (
    <Box sx={{ width: "100%", maxWidth: 640, mx: "auto", pb: { xs: 3, md: 5 } }}>
      <PageHeader title="Profile" subtitle="Update the details associated with your account." />

      <GlassSurface sx={{ p: { xs: 2.5, md: 4 }, borderRadius: 4, background: "rgba(8, 14, 28, 0.72)" }}>
        <Stack component="form" spacing={2.5} onSubmit={handleSave}>
          {error && <Alert severity="error">{error}</Alert>}
          {success && <Alert severity="success">{success}</Alert>}

          <TextField
            label="Full name"
            value={profile.name}
            onChange={(event) => setProfile((current) => ({ ...current, name: event.target.value }))}
            required
            fullWidth
            disabled={awaitingEmailVerification || saving}
          />
          <TextField
            label="Email"
            type="email"
            value={profile.email}
            onChange={(event) => setProfile((current) => ({ ...current, email: event.target.value }))}
            required
            fullWidth
            disabled={awaitingEmailVerification || saving}
          />

          <Button type="submit" variant="contained" disabled={!hasChanges || awaitingEmailVerification || saving} sx={{ alignSelf: "flex-start" }}>
            {saving ? "Saving..." : "Save changes"}
          </Button>
        </Stack>

        {awaitingEmailVerification && (
          <Stack component="form" spacing={2} onSubmit={handleConfirmEmail} sx={{ mt: 3, pt: 3, borderTop: "1px solid", borderColor: "divider" }}>
            <Typography fontWeight={700}>Verify your new email</Typography>
            <TextField
              label="Verification code"
              value={verificationCode}
              onChange={(event) => setVerificationCode(event.target.value)}
              required
              fullWidth
            />
            <Button type="submit" variant="contained" disabled={saving || !verificationCode.trim()} sx={{ alignSelf: "flex-start" }}>
              Verify email
            </Button>
          </Stack>
        )}
      </GlassSurface>
    </Box>
  );
}

export default ProfilePage;

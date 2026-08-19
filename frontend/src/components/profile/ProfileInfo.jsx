import { useEffect, useState } from 'react';
import './ProfileInfo.css';
import { toast } from 'react-hot-toast';
import { getProfile, updateProfile } from '../../services/api';

function ProfileInfo() {
    const [profile, setProfile] = useState({
        username: '',
        email: '',
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getProfile();
                setProfile({
                    username: data.username || '',
                    email: data.email || '',
                });
            } catch (error) {
                console.error('Error fetching profile:', error);
                toast.error('Could not load profile');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleSave = async () => {
        setSaving(true);
        try {
            const data = await updateProfile({
                username: profile.username,
                email: profile.email,
            });
            setProfile({ username: data.username, email: data.email });
            toast.success('Profile updated');
        } catch (error) {
            toast.error(error.message || 'Failed to update profile');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <div className="profile-card">Loading profile...</div>;
    }

    return (
        <div className="profile-card">
            <h2 className="profile-title">Profile Information</h2>

            <div className="profile-form-grid">
                <div>
                    <label className="profile-label">
                        Username
                    </label>
                    <input
                        type="text"
                        value={profile.username}
                        onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                        className="profile-input"
                    />
                </div>

                <div>
                    <label className="profile-label">
                        Email ID
                    </label>
                    <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        className="profile-input"
                    />
                </div>
            </div>

            <div className="profile-button-row">
                <button
                    type="button"
                    className="profile-save-button"
                    onClick={handleSave}
                    disabled={saving}
                >
                    {saving ? 'Saving...' : 'Save Changes'}
                </button>
            </div>
        </div>
    );
}

export default ProfileInfo;

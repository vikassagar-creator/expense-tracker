import { useEffect, useState } from 'react';
import './ProfileInfo.css';

function ProfileInfo() {
    const [profile, setProfile] = useState({
        username: '',
        email: '',
        personalInfo: ''
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/profile');

                if (!response.ok) {
                    throw new Error('Failed to fetch profile data');
                }

                const data = await response.json();
                setProfile({
                    username: data.username || '',
                    email: data.email || '',
                    personalInfo: data.personalInfo || ''
                });
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchProfile();
    }, []);

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

                <div>
                    <label className="profile-label">
                        Personal Info
                    </label>
                    <textarea
                        rows="5"
                        value={profile.personalInfo}
                        onChange={(e) => setProfile({ ...profile, personalInfo: e.target.value })}
                        className="profile-textarea"
                    />
                </div>
            </div>

            <div className="profile-button-row">
                <button type="button" className="profile-save-button">
                    Save Changes
                </button>
            </div>
        </div>
    );
}

export default ProfileInfo;
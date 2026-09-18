import ProfileInfo from "../components/profile/ProfileInfo";
import ChangePassword from "../components/profile/ChangePassword";

// TopBar (via PageConfig) already renders the "Profile" title and
// subtitle for this route, so ProfileHeader was removed — it added
// nothing beyond duplicating that same text.
function Profile() {
  return (
    <div>
      <ProfileInfo />

      <ChangePassword />
    </div>
  );
}

export default Profile;

import ProfileHeader from "../components/profile/ProfileHeader";
import ProfileInfo from "../components/profile/ProfileInfo";
import ChangePassword from "../components/profile/ChangePassword";
function Profile() {
  return (
    <div>
      <ProfileHeader />
      
      <ProfileInfo />

      <ChangePassword />
    </div>
  );
}

export default Profile;

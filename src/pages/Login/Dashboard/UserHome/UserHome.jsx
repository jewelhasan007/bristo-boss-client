
import userHook from '../../../../hooks/userHook'

const UserHome = () => {
    const {user} = userHook();
    return (
        <div>
              {
                user?.displayName ? user.displayName : 'Back'
            }
        </div>
    );
};

export default UserHome;
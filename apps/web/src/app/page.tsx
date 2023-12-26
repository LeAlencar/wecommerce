
import Menu from "../components/Menu";
import { logOut } from "./(auth)/actions/logoutAction";

export default function Page(): JSX.Element {
  return (
    <Menu signOut={logOut} />
  );
}
